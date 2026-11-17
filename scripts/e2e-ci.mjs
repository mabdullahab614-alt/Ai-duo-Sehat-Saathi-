import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright";

const PORT = 3109;
const BASE_URL = process.env.E2E_BASE_URL || `http://127.0.0.1:${PORT}`;
const SCREENSHOT_DIR = process.env.SCREENSHOT_DIR || "";

const ALL_ROUTES = [
  "/",
  "/dashboard",
  "/upload",
  "/review",
  "/explain",
  "/schedule",
  "/reports",
  "/care",
  "/emergency",
  "/caregiver",
  "/family",
  "/ammi",
  "/eval",
];

async function waitForHealth(url) {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`${url}/api/health`);
      if (res.ok) return;
    } catch {
      // Wait and retry
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`Timed out waiting for ${url}/api/health`);
}

async function launchBrowser() {
  try {
    return await chromium.launch({ channel: "chrome", headless: true });
  } catch {
    return await chromium.launch({ headless: true });
  }
}

async function runAxeAudit(page, routeLabel) {
  await page.waitForTimeout(260);
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  const severe = results.violations.filter(
    (v) => v.impact === "serious" || v.impact === "critical"
  );
  if (severe.length > 0) {
    const details = severe
      .map(
        (v) =>
          `[${v.impact}] ${v.id}: ${v.help}\n` +
          v.nodes.map((n) => `  - ${n.html}\n    ${n.failureSummary}`).join("\n")
      )
      .join("\n");
    throw new Error(`Axe serious/critical violations on ${routeLabel}:\n${details}`);
  }
}

async function maybeShot(page, name) {
  if (!SCREENSHOT_DIR) return;
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, name), fullPage: true });
}

async function main() {
  let serverProc = null;
  if (!process.env.E2E_BASE_URL) {
    serverProc = spawn("npx", ["next", "start", "--hostname", "127.0.0.1", "--port", String(PORT)], {
      stdio: "ignore",
      env: process.env,
    });
    await waitForHealth(BASE_URL);
  }

  const browser = await launchBrowser();
  const consoleErrors = [];
  const pageErrors = [];

  try {
    // 1. Desktop 1440x900 pass: all routes + axe + screenshots + keyboard/RTL/Shift+E
    const desktopCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await desktopCtx.newPage();
    page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
    page.on("pageerror", (e) => pageErrors.push(e.message));

    for (const route of ALL_ROUTES) {
      await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      assert.equal(overflow, false, `Desktop 1440 overflow on ${route}`);
      await runAxeAudit(page, `desktop:${route}`);
      await maybeShot(page, `1440-${route === "/" ? "landing" : route.slice(1)}.png`);
    }

    // 2. Scan -> Review -> Explain -> Schedule interactive pipeline (with real /api/ocr on rx-1 + synthetic test AI stub)
    await page.route("**/api/analyze", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          emergency: false,
          analysis: {
            document_type: "prescription",
            confidence: 0.94,
            needs_user_confirmation: false,
            missing_information: [],
            summary_ur: "بخار اور انفیکشن کے لیے نسخہ۔ اپنے ڈاکٹر سے مشورہ کریں۔",
            summary_roman: "Bukhar aur infection ke liye nuskha. Discuss with your doctor.",
            summary_en: "Prescription for fever and infection. Discuss with your doctor.",
            disclaimer: "Discuss with your doctor.",
            medicines: [
              {
                name: "Tab Paracetamol",
                strength: "500mg",
                dose: "1 tablet",
                frequency: "TDS",
                duration: "5 days",
                food_instruction: "After meal",
                purpose: "Fever relief",
                cautions: ["Do not exceed advised dose"],
                plain_urdu_explanation: "بخار کے لیے کھانے کے بعد 1 گولی لیں۔",
                plain_roman_urdu_explanation: "Bukhar ke liye khane ke baad 1 goli lein.",
              },
            ],
            lab_values: [],
            warnings: ["Complete advised days unless doctor stops it."],
            red_flags: [],
            questions_for_doctor: ["What if fever persists after 3 days?"],
            next_steps: ["Follow daily schedule."],
            medication_schedule: [
              {
                time_of_day: "morning",
                medicine_name: "Tab Paracetamol",
                dose: "1 tablet",
                with_food: true,
                instructions: "After breakfast",
              },
            ],
          },
        }),
      });
    });

    await page.goto(`${BASE_URL}/upload?demo=rx-1`, { waitUntil: "networkidle" });
    await page.getByAltText("Document preview").waitFor({ state: "visible" });
    await page.locator('button[type="submit"]').click();
    await page.waitForURL("**/review");
    await page.getByAltText(/side-by-side/i).waitFor({ state: "visible" });
    await runAxeAudit(page, "desktop:review-active");
    await maybeShot(page, "1440-review-active.png");

    const gateCheckbox = page.getByRole("checkbox", { name: /Confirm extracted medical fields/i });
    if (await gateCheckbox.isVisible().catch(() => false)) {
      await gateCheckbox.click();
    }
    await page.getByRole("button", { name: /Confirm/i }).click();
    await page.waitForURL("**/explain");
    await page.getByText(/Discuss with your doctor/i).first().waitFor({ state: "visible" });
    await runAxeAudit(page, "desktop:explain-active");
    await maybeShot(page, "1440-explain-active.png");

    await page.getByRole("link", { name: /Open Medication Schedule/i }).click();
    await page.waitForURL("**/schedule");
    await page.getByRole("checkbox", { name: /Mark Tab Paracetamol .*completed/i }).click();
    await page.getByText(/1\/1 Doses/i).waitFor({ state: "visible" });
    await runAxeAudit(page, "desktop:schedule-active");
    await maybeShot(page, "1440-schedule-active.png");
    await page.unroute("**/api/analyze");

    // 3. Keyboard shortcuts + Submenu + Shift+E Emergency from every key route
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await page.keyboard.press("?");
    await page.getByRole("dialog", { name: "Keyboard shortcuts" }).waitFor({ state: "visible" });
    await page.keyboard.press("Escape");
    await page.keyboard.press("Control+k");
    await page.getByRole("dialog", { name: "Quick navigation command palette" }).waitFor({ state: "visible" });
    await page.keyboard.press("Escape");

    for (const srcRoute of ["/", "/dashboard", "/upload", "/schedule", "/care", "/family"]) {
      await page.goto(`${BASE_URL}${srcRoute}`, { waitUntil: "networkidle" });
      await page.keyboard.press("Shift+E");
      await page.waitForURL("**/emergency");
      await page.locator('a[href="tel:1122"]').first().waitFor({ state: "visible" });
    }
    await runAxeAudit(page, "desktop:emergency-final");
    await desktopCtx.close();

    // 4. Mobile 390x844 pass + reduced-motion + RTL verify
    const mobileCtx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
    });
    const mPage = await mobileCtx.newPage();
    mPage.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
    mPage.on("pageerror", (e) => pageErrors.push(e.message));

    for (const route of ALL_ROUTES) {
      await mPage.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });
      const overflow = await mPage.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      assert.equal(overflow, false, `Mobile 390 overflow on ${route}`);
      await runAxeAudit(mPage, `mobile:${route}`);
      await maybeShot(mPage, `390-${route === "/" ? "landing" : route.slice(1)}.png`);
    }

    const htmlLang = await mPage.evaluate(() => document.documentElement.lang);
    assert.equal(htmlLang, "ur", "Expected root lang='ur' by default for RTL support");
    await mobileCtx.close();

    assert.equal(consoleErrors.length, 0, `Console errors: ${consoleErrors.join(" | ")}`);
    assert.equal(pageErrors.length, 0, `Page errors: ${pageErrors.join(" | ")}`);
    console.log("ALL CI E2E + AXE + RTL + REDUCED MOTION + KEYBOARD CHECKS PASSED!");
  } finally {
    await browser.close();
    serverProc?.kill("SIGTERM");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
