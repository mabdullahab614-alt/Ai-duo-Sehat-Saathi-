# Sehat Saathi (`صحت ساتھی`)

**Urdu-First AI Health Navigator for SDG 3: Good Health and Well-Being**

> **Tagline:** *Sehat Saathi turns prescriptions and lab reports into simple Urdu/Roman-Urdu voice explanations, daily medication schedules, safety alerts, and next-step care navigation.*

---

## Problem Statement

Millions of patients and caregivers receive prescriptions, lab reports, and medical instructions written in English, clinical jargon, or dense formatting. Low-literacy patients, elderly users, rural and first-time digital users, and busy family caregivers often struggle to understand:

- What each medicine is for and how/when to take it (before or after meals, morning vs. night)
- Whether lab test results need attention or discussion with a doctor
- Which warning signs require **immediate emergency care** rather than waiting

This comprehension gap causes medication errors, missed doses, anxiety, delayed care, and unsafe reliance on informal advice.

---

## Target Users

| User Group | Primary Need | How Sehat Saathi Helps |
|---|---|---|
| **Patients** | Understand prescriptions, lab reports, and next steps | Plain Urdu & Roman Urdu cards + voice readout |
| **Family Caregivers** | Manage medicines for parents or children safely | Daily schedule, missed-dose alerts, consent-based summary |
| **Elderly Users** | Low-text, large-tap, audio-friendly experience | High contrast, large text toggle, Web Speech API playback |
| **Rural / First-Time Digital Users** | Simple visual actions without medical jargon | Icon-supported Urdu-first navigation, compressed uploads |
| **Clinics & Pharmacies (B2B)** | Improve patient comprehension and adherence | Branded comprehension & adherence portal |

---

## Key Features

1. **Document Upload & OCR Comprehension**: Supports JPG, PNG, WebP, and PDF uploads (with client-side image compression/resizing) plus typed prescription/report text. Uses Gemini Vision OCR with Tesseract.js fallback.
2. **Structured Medical Extraction & User Confirmation**: Extracts medicines, strengths, doses, frequencies, durations, food instructions, lab values, reference ranges, cautions, and missing details with strict JSON Schema + Zod validation. Low-confidence or incomplete extractions require explicit user confirmation on the Review screen.
3. **Plain Urdu, Roman Urdu & English Explanations**: Short, jargon-free medicine and lab-value cards with conservative lab status indicators (`Normal`, `Needs Attention`, `Discuss with Doctor`, `Unknown`).
4. **Voice-First Accessibility**: Browser Web Speech API playback (play, pause, replay, speed control), large text mode (`A+`), high-contrast mode, keyboard navigation, and large touch targets.
5. **Visual Daily Medication Schedule**: Organizes extracted instructions into Morning, Afternoon, Night, and As Needed blocks with with-food indicators, dose-taken checkboxes, and conservative missed-dose guidance.
6. **Deterministic Emergency Safety Engine**: Rule-based red-flag detection (chest pain, severe breathing difficulty, fainting/unconsciousness, severe allergic reaction, uncontrolled bleeding, self-harm thoughts, sudden weakness/facial drooping/speech difficulty) runs before and independently of AI output to trigger immediate emergency escalation.
7. **Lahore Care Navigation (Demo Dataset)**: Filterable informational directory of Lahore clinics, hospitals, pharmacies, and telehealth options by area, service type, affordability, and language.
8. **Caregiver Mode (MVP)**: Simplified care summary, shared medication schedule, missed-dose alerts, and consent-based sharing with one-tap local data deletion.
9. **Mera Khandaan — Family Health Tree (`/family`)**: Browser-local (`sehat_family_v1`) multi-generation schedule tracker (up to 3 generations, 8 members), `"Aaj poore khandaan ki dawaein"` daily timeline with `"Li"` ticks, member-scoped prescription uploads (`/upload?memberId=...`), JSON export/import, print-ready chart (`window.print()`), and live Gemini WhatsApp summary (`POST /api/family-summary`).
10. **Ammi Mode (`/ammi`) & Pictogram Dawa Cards**: Zero-literacy single-medicine card mode with giant fonts, sunrise/sun/moon/meal pictograms, and one-touch Urdu playback.
11. **Interactive Safety & Verification Lab (`/explain`, `/review`, `/eval`)**: Side-by-side **AI Ka Yaqeen** review panel with amber unverified field highlights, **"Samajh Gaye?"** Teach-Back comprehension check (`/api/teach-back`), **"Dawa Se Poochho"** Q&A (`/api/ask-medicine`), **"Dawa-Match Check"** strip comparison (`/api/medicine-match`), Browser Dose Reminders, **Live Accuracy Scorecard** across 5 synthetic Rx (`/api/eval`), and **"Judge, Aap Koshish Karein"** safety challenge (`/api/safety-challenge`).

---

## AI Architecture

```text
User uploads prescription/report image, PDF, or typed text
  │
  ▼ (Client-side image resize & compression + instant red-flag check)
OCR Extraction (/lib/ai/ocr.ts)
  ├── Primary: Gemini Vision OCR (when GEMINI_API_KEY is configured)
  └── Fallback: Tesseract.js OCR
  │
  ▼
Rule-Based Emergency Safety Engine (/lib/safety/redFlags.ts)
  ├── Red flag detected ──► Immediate Emergency Screen (/emergency) — bypasses AI wait
  └── Clear ──► Continue
  │
  ▼
Gemini Multimodal Structured Extraction (/lib/ai/gemini.ts + /lib/ai/prompts.ts)
  ├── Strict JSON Schema (responseMimeType: "application/json", responseSchema)
  └── Runtime Zod Validation (/lib/ai/schemas.ts + /lib/utils/validate.ts, retry once on failure)
  │
  ▼
Plain-Language Urdu / Roman Urdu / English UI
  ├── Side-by-Side AI Ka Yaqeen Review (/review)
  ├── Explanation, Pictograms, Teach-Back, Q&A & Strip Match (/explain)
  ├── Zero-Literacy Single-Card Ammi Mode (/ammi)
  ├── Visual Medication Schedule & Browser Reminders (/schedule)
  ├── Multi-Generation Family Health Tree & Print/WhatsApp Summary (/family)
  ├── Live Synthetic Accuracy Scorecard & Judge Safety Challenge (/eval)
  ├── Care Navigation — Lahore Demo Dataset (/care)
  └── Consent-Based Caregiver Summary (/caregiver)
```

---

## Tech Stack

- **Framework:** Next.js App Router + TypeScript (strict mode)
- **Styling:** Tailwind CSS (`#05070A` dark-first canvas, `#0047FF` cobalt primary, `#C8FF00` lime highlights, `#F7F8FA` high-readability cards, `#FF3B30` emergency red)
- **Motion:** Framer Motion (tactile button springs, hero stagger, scan beam, animated SVG check/cross, sliding toolkit indicator, reduced-motion support)
- **AI & Structured Output:** Google GenAI SDK (`@google/genai`) + strict `responseSchema`
- **Validation:** Zod
- **OCR:** Gemini Vision + `tesseract.js` fallback
- **Voice:** Browser Web Speech API (`window.speechSynthesis`)
- **Cloud Persistence (Optional Demo):** Modular Firebase Web SDK (`Auth`, `Firestore`, `Storage`) with consent-gated rules (`firestore.rules`, `storage.rules`)
- **Icons:** `lucide-react`

---

## Local Setup Instructions

### Prerequisites

- Node.js 20+ (tested on Node v22)
- npm 10+
- A Google Gemini API key from [Google AI Studio](https://aistudio.google.com/)

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables
cp .env.example .env.local
# Edit .env.local and set GEMINI_API_KEY=your_actual_key

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build Check

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

---

## Environment Variables

See [`.env.example`](.env.example):

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Yes (for live Gemini OCR & extraction) | Server-side Google Gemini API key. Never exposed to the browser. |
| `GEMINI_MODEL` | Optional | Override default Gemini model (`gemini-3.8-flash`). |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Optional (Firebase Auth/Firestore/Storage) | Firebase Web App API key. App runs in local demo mode if omitted. |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Optional | Firebase Auth domain (`your_project.firebaseapp.com`). |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Optional | Firebase Project ID. |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Optional | Firebase Cloud Storage bucket for consent-gated demo uploads. |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Optional | Firebase Cloud Messaging sender ID. |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Optional | Firebase Web App ID. |

---

## Safety and Privacy Policy

- **Non-Diagnostic Tool:** Sehat Saathi does **not** diagnose diseases, prescribe medications, or recommend treatment changes.
- **Persistent Disclaimer:** Every explanation and safety screen displays:
  > *"Yeh medical diagnosis nahi hai; emergency ya serious symptoms mein foran qualified healthcare professional se rabta karein."*
- **No Fabricated Medical Facts:** Extraction is source-bound to the uploaded document/text. Unclear or low-confidence fields require explicit user confirmation before proceeding.
- **Emergency Override:** Mandatory red-flag symptoms bypass AI generation and immediately display emergency escalation guidance.
- **Privacy by Default:** No server-side patient database is used. Uploaded files are processed in memory for the current request and are not saved to disk or committed to Git. Local session state in the browser can be cleared anytime via one-tap deletion, and caregiver sharing requires explicit user consent.
- **Demo Data Policy:** Use only synthetic or user-authorized non-sensitive test documents. Never commit `.env.local`, API keys, or real patient records.

---

## Startup & Business Model

- **B2B SaaS for Clinics, Hospitals & Pharmacies:** Monthly subscription for a white-labeled Urdu/regional-language patient comprehension and discharge-instruction portal.
- **Pharmacy Adherence Partnerships:** Medication-counseling and refill/adherence tools integrated with pharmacy workflows.
- **Telehealth Referrals:** Qualified care-navigation handoffs to verified partner telehealth platforms.
- **Employer, Insurer & NGO Health-Literacy Programs:** Sponsored community health-comprehension access for underserved populations.
- **Document Comprehension API:** Usage-based structured extraction & vernacular simplification API for digital-health apps.

---

## 3-Minute Demo Script (End-to-End Walkthrough)

Using synthetic **Demo data** documents and optional local Firebase emulator seed (`FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 node scripts/seed-demo.mjs`):

1. **0:00 — Landing Hero & Command Bar (`/`):** English is selected by default; change to **Urdu / Roman Urdu** in the settings submenu, press `⌘/Ctrl + K` for the quick navigation palette, or open the **Dashboard (`/dashboard`)**.
2. **0:40 — Upload & Scan (`/upload?demo=rx-1`):** Click **"Demo Try Karein"** (or pick any sample from the **Demo data** tray). Submit to run client compression, Tesseract/Gemini OCR (`aria-live`), deterministic red-flag safety checks, and Zod-validated structured extraction.
3. **1:20 — Review & AI Ka Yaqeen (`/review`):** Inspect extracted fields side-by-side against the original image with amber verification highlights, edit if needed, and confirm.
4. **1:45 — Urdu Explanation & Voice (`/explain`, `/ammi`):** Listen to Urdu voice playback, inspect pictogram dosage cards, open **Source Document** and confirm the **"Discuss with your doctor"** anchor, test **Teach-Back**, **Ask Medicine**, and **Strip Match**, or switch to **Ammi Mode (`/ammi`)**.
5. **2:15 — Medication Schedule & Family Tree (`/schedule`, `/family`):** Check off a dose (`TickCross`), enable **Browser Dose Reminders**, then open **`/family`** to load **Sample Family (Demo Data)**, toggle `"Aaj poore khandaan ki dawaein"`, or export/print.
6. **2:45 — Instant Emergency Escalation (`/emergency`):** From **any** screen, press **`Shift+E`** (or tap **`1122`** / dock **`7`**) or enter `"chest pain"` to verify instant zero-delay escalation (`tel:1122`, `tel:115`, caregiver location share, offline support).

---

## Future Roadmap

- Regional Pakistani language expansion (Punjabi, Sindhi, Pashto, Balochi, Saraiki) with neural Urdu voice synthesis
- Handwriting-specialized pharmacy verification workflows and pharmacist review handoff
- Longitudinal chronic-care adherence trends with opt-in encrypted caregiver sync
- Offline-friendly Progressive Web App (PWA) caching for low-connectivity clinics
- Integration with verified national clinic/pharmacy registries and HL7/FHIR lab exports
