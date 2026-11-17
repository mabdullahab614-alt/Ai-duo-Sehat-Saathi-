#!/usr/bin/env node
/**
 * Synthetic Demo Seed Script for Sehat Saathi (Firebase Emulator / Firestore REST).
 * Contains ZERO real patient information — all records are explicitly synthetic Demo data.
 *
 * Usage (with local Firebase emulator running):
 *   FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 node scripts/seed-demo.mjs
 */

const emulatorHost = process.env.FIRESTORE_EMULATOR_HOST || "127.0.0.1:8080";
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "sehat-saathi-demo";
const baseUrl = `http://${emulatorHost}/v1/projects/${projectId}/databases/(default)/documents`;

function toFirestoreFields(obj) {
  const fields = {};
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === "string") fields[k] = { stringValue: v };
    else if (typeof v === "boolean") fields[k] = { booleanValue: v };
    else if (typeof v === "number") fields[k] = { doubleValue: v };
    else if (Array.isArray(v)) {
      fields[k] = {
        arrayValue: {
          values: v.map((item) =>
            typeof item === "string" ? { stringValue: item } : { mapValue: { fields: toFirestoreFields(item) } }
          ),
        },
      };
    }
  }
  return fields;
}

async function seed() {
  const demoUserRes = await fetch(`${baseUrl}/users/demo-patient-01`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fields: toFirestoreFields({
        displayName: "Demo Patient (Synthetic)",
        language: "en",
        largeText: false,
        userMode: "patient",
        caregiverConsent: false,
        demoLabel: "Demo data",
      }),
    }),
  });
  if (!demoUserRes.ok) {
    throw new Error(`Failed seeding demo user: HTTP ${demoUserRes.status}`);
  }
  console.log(`Seeded synthetic demo user to ${emulatorHost}`);
}

seed().catch((err) => {
  console.error("Seed skipped/failed (is Firebase Emulator running?):", err.message);
  process.exitCode = 1;
});
