<div align="center">

<!-- Animated Banner — clickable -->
<a href="https://YOUR_LIVE_DEMO_URL">
<img src="banner.svg" width="100%" alt="Sehat Saathi — Urdu-First AI Health Navigator"/>
</a>

<br/>

<!-- Animated typing subtitle -->
<a href="https://YOUR_LIVE_DEMO_URL">
<img src="https://readme-typing-svg.demolab.com?font=Outfit&weight=700&size=18&pause=800&color=34D399&center=true&vCenter=true&width=760&lines=%F0%9F%93%B7+Upload+a+Prescription+or+Lab+Report;%F0%9F%A4%96+Gemini+Vision+OCR+%2B+Structured+Extraction;%F0%9F%97%A3%EF%B8%8F+Explained+in+Urdu%2C+Roman+Urdu+%26+Voice;%F0%9F%92%8A+Auto-Built+Daily+Medicine+Schedule;%F0%9F%9A%A8+Deterministic+Emergency+Safety+Engine;%F0%9F%91%A8%E2%80%8D%F0%9F%91%A9%E2%80%8D%F0%9F%91%A7+Family+Health+Tree+%26+Ammi+Mode;%F0%9F%8C%8D+Built+for+SDG+3%3A+Good+Health+and+Well-Being" alt="Features"/>
</a>

<br/><br/>

<!-- Play button -->
<a href="https://YOUR_LIVE_DEMO_URL">
<img src="https://img.shields.io/badge/▶%20%20T R Y %20 L I V E %20 D E M O-10b981?style=for-the-badge&logo=googlechrome&logoColor=white&labelColor=022c22" height="55" alt="Try Live Demo"/>
</a>

<br/><br/>

<!-- Badges row 1 -->
<a href="https://YOUR_LIVE_DEMO_URL"><img src="https://img.shields.io/badge/UN%20SDG-3%20Good%20Health-4C9F38?style=for-the-badge&labelColor=0f172a"/></a>
&nbsp;
<a href="https://YOUR_LIVE_DEMO_URL"><img src="https://img.shields.io/badge/Urdu-First-10B981?style=for-the-badge&labelColor=0f172a"/></a>
&nbsp;
<a href="https://YOUR_LIVE_DEMO_URL"><img src="https://img.shields.io/badge/Voice-First-06B6D4?style=for-the-badge&labelColor=0f172a"/></a>
&nbsp;
<a href="https://YOUR_LIVE_DEMO_URL"><img src="https://img.shields.io/badge/AI-Gemini%20%2B%20Zod-8B5CF6?style=for-the-badge&labelColor=0f172a"/></a>

<br/><br/>

<!-- Badges row 2 -->
<img src="https://img.shields.io/badge/Not%20a-Diagnostic%20Tool-F59E0B?style=for-the-badge&labelColor=0f172a"/>
&nbsp;
<img src="https://img.shields.io/badge/Data-Synthetic%20Only-3B82F6?style=for-the-badge&labelColor=0f172a"/>
&nbsp;
<img src="https://img.shields.io/badge/Next.js-App%20Router-000000?style=for-the-badge&logo=nextdotjs&labelColor=0f172a"/>
&nbsp;
<a href="#-license"><img src="https://img.shields.io/badge/License-All%20Rights%20Reserved-DC2626?style=for-the-badge&labelColor=0f172a"/></a>

<br/><br/>

<!-- Hackathon badge -->
<img src="https://img.shields.io/badge/STCS%20AI%20Hackathon%202026-Minhaj%20University%20Lahore-EC4899?style=for-the-badge&labelColor=0f172a"/>

</div>

---

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%"/>

## 🎯 The Problem

> **Low-literacy and Urdu-speaking patients cannot reliably understand prescriptions, lab reports, and medical instructions, which leads to medication errors, delayed care, and poor health outcomes.**

Prescriptions and lab reports are usually written in English, in clinical jargon, or in dense formatting. Patients and caregivers are left asking:

| ❓ Question nobody answers | 😟 What happens |
|---|---|
| *"Which medicine is for what?"* | Wrong medicine at the wrong time |
| *"How much, and before or after meals?"* | Missed or doubled doses |
| *"Is this lab value normal?"* | Anxiety, or ignored warning signs |
| *"Which symptoms mean I need help now?"* | Delayed emergency care |
| *"Where can I go for affordable care?"* | Dependence on informal advice |

## 💡 The Solution

**Sehat Saathi** (`صحت ساتھی`, "Health Companion") turns a photo of a prescription or lab report into something a patient can **read, hear, and act on**, in their own language.

```
 📷 Upload ──► 🔍 OCR ──► 🛡️ Safety Check ──► 🧠 Structured Extraction ──► ✅ Confirm ──► 🗣️ Urdu + Voice ──► 💊 Schedule
```

> ⚠️ Sehat Saathi **does not diagnose**, prescribe, or replace a doctor. It helps people *understand* what their clinician already told them.

---

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%"/>

<div align="center">

## 🤖 AI PIPELINE ARCHITECTURE

```
╔══════════════════════════════════════════════════════════════════╗
║                    SEHAT SAATHI AI PIPELINE                      ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║   INPUT: Prescription / Lab Report (JPG, PNG, WebP, PDF, text)   ║
║      │                                                           ║
║      ▼                                                           ║
║   ┌─────────────────────────────────────────┐                    ║
║   │  Client-side resize + compression       │                    ║
║   │  + instant red-flag check               │                    ║
║   └─────────────────────────────────────────┘                    ║
║      │                                                           ║
║      ▼                                                           ║
║   ┌─────────────────────────────────────────┐                    ║
║   │  OCR  (/lib/ai/ocr.ts)                  │                    ║
║   │  Primary : Gemini Vision                │                    ║
║   │  Fallback: Tesseract.js                 │                    ║
║   └─────────────────────────────────────────┘                    ║
║      │                                                           ║
║      ▼                                                           ║
║   ┌─────────────────────────────────────────┐                    ║
║   │  🛡️ SAFETY RULE ENGINE                  │                    ║
║   │  (/lib/safety/redFlags.ts)              │                    ║
║   │  Deterministic. Runs BEFORE and         │                    ║
║   │  independently of the AI.               │                    ║
║   │  Red flag ──► instant /emergency screen │                    ║
║   └─────────────────────────────────────────┘                    ║
║      │ clear                                                     ║
║      ▼                                                           ║
║   ┌─────────────────────────────────────────┐                    ║
║   │  GEMINI STRUCTURED EXTRACTION           │                    ║
║   │  (/lib/ai/gemini.ts + prompts.ts)       │                    ║
║   │  • JSON responseSchema                  │                    ║
║   │  • Zod runtime validation (retry once)  │                    ║
║   │  • Medicines, dose, frequency, duration │                    ║
║   │  • Lab values + reference ranges        │                    ║
║   │  • Missing / ambiguous fields flagged   │                    ║
║   └─────────────────────────────────────────┘                    ║
║      │                                                           ║
║      ▼                                                           ║
║   ┌─────────────────────────────────────────┐                    ║
║   │  ✅ USER CONFIRMATION  (/review)        │                    ║
║   │  Low confidence ──► user must confirm   │                    ║
║   └─────────────────────────────────────────┘                    ║
║      │                                                           ║
║      ▼                                                           ║
║   OUTPUT: Urdu · Roman Urdu · English  +  🗣️ Voice               ║
║           💊 Schedule  +  👨‍👩‍👧 Family  +  🏥 Care Navigation       ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

</div>

---

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%"/>

## ✨ Features

<table>
<tr>
<td width="50%">

### 🧠 Intelligence
- ✅ **Upload JPG, PNG, WebP, PDF** or paste typed text
- ✅ **Gemini Vision OCR** with **Tesseract.js fallback**
- ✅ **Structured extraction**: medicines, strengths, doses, frequency, duration, food instructions
- ✅ **Lab values + reference ranges** with conservative status: `Normal` · `Needs Attention` · `Discuss with Doctor` · `Unknown`
- ✅ **JSON Schema + Zod** validation, retry once on failure
- ✅ **Low-confidence fields** require explicit user confirmation
- ✅ **Never invents** medicines, doses or ranges

### 🛡️ Safety
- ✅ **Deterministic red-flag engine**, independent of AI
- ✅ Detects chest pain, severe breathing difficulty, fainting, severe allergic reaction, uncontrolled bleeding, self-harm thoughts, stroke signs
- ✅ **Instant emergency screen**, never blocked by AI latency
- ✅ **`Shift+E`** or **`1122`** from any screen
- ✅ **No diagnosis**, ever

</td>
<td width="50%">

### 🗣️ Accessibility
- ✅ **Urdu script + Roman Urdu + English**
- ✅ **Voice playback** (play, pause, replay, speed control)
- ✅ **Large text mode** (`A+`) and **high-contrast mode**
- ✅ **Keyboard navigation**, large touch targets
- ✅ **Ammi Mode**: one medicine per card, giant fonts, pictograms

### 👨‍👩‍👧 Care
- ✅ **Visual daily schedule**: Morning / Afternoon / Night / As Needed, with-food indicators, dose checkboxes
- ✅ **Mera Khandaan**: family health tree, up to 3 generations and 8 members
- ✅ **Caregiver mode** with consent-based sharing and one-tap local deletion
- ✅ **Lahore care navigation** (demo dataset): clinics, hospitals, pharmacies, telehealth
- ✅ **Privacy by design**: no server-side patient database

</td>
</tr>
</table>

### 🧪 Verification Lab

| Feature | Route | What it does |
|---|---|---|
| 🔎 **AI Ka Yaqeen** | `/review` | Side-by-side view of the original image and extracted fields, with amber highlights on unverified fields |
| 🧠 **Samajh Gaye?** | `/api/teach-back` | Teach-back comprehension check |
| 💬 **Dawa Se Poochho** | `/api/ask-medicine` | Q&A about a specific medicine |
| 💊 **Dawa-Match Check** | `/api/medicine-match` | Compare a medicine strip against the extracted prescription |
| 📊 **Live Accuracy Scorecard** | `/eval`, `/api/eval` | Accuracy across 5 synthetic prescriptions |
| 🏆 **Judge, Aap Koshish Karein** | `/api/safety-challenge` | Interactive safety challenge for judges |

---

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%"/>

## 📸 Screenshots

> 📝 *Add 3 to 4 real screenshots or a short demo GIF here before submission. Example layout:*

<div align="center">

| Upload & Review | Urdu Explanation | Ammi Mode | Emergency Screen |
|:---:|:---:|:---:|:---:|
| `docs/shot-review.png` | `docs/shot-explain.png` | `docs/shot-ammi.png` | `docs/shot-emergency.png` |

</div>

---

## 👥 Who It's For

| User | Need | What they get |
|---|---|---|
| 🧑 **Patient** | Understand a prescription or report | Plain Urdu and Roman Urdu cards, voice readout |
| 👨‍👩‍👧 **Family caregiver** | Manage medicine for parents or children | Daily schedule, missed-dose alerts, consent-based summary |
| 👴 **Elderly user** | Low-text, audio-friendly interface | High contrast, large text, speech playback |
| 🌾 **Rural / first-time digital user** | Simple visual actions | Icon-supported Urdu-first navigation, compressed uploads |
| 🏥 **Clinic / pharmacy** | Better comprehension and adherence | Branded patient-communication portal |

---

## 🎬 User Journeys

<details open>
<summary><b>💊 Journey 1: Understand a prescription</b></summary>

1. Upload a photo (or paste text)
2. Review and confirm the extracted medicines on `/review`
3. Read or **listen** to the Urdu / Roman Urdu explanation on `/explain`
4. Get a visual daily schedule on `/schedule`
5. See warnings and a "discuss with your doctor" anchor

> *"Yeh antibiotic infection ke liye di gayi hai. Din mein 2 dafa, khane ke baad leni hai. 5 din tak leni hai. Agar rash ya saans ki takleef ho to foran doctor se rabta karein."*

</details>

<details>
<summary><b>🧪 Journey 2: Understand a lab report</b></summary>

1. Upload the report
2. Each test and value is identified
3. Each value is labelled **Normal / Needs Attention / Discuss with Doctor / Unknown**
4. The app never says "you have disease X"

</details>

<details>
<summary><b>👵 Journey 3: Ammi Mode (zero literacy)</b></summary>

1. Open `/ammi`
2. See one medicine at a time with sunrise / sun / moon / meal pictograms
3. Tap once to hear the Urdu instruction

</details>

<details>
<summary><b>🚨 Journey 4: Emergency safety check</b></summary>

1. User types a symptom such as "chest pain", or presses `Shift+E`
2. The **rule engine** flags it instantly, with no AI wait
3. A full-screen emergency page appears (`tel:1122`, `tel:115`)
4. The user is told to seek immediate in-person help

</details>

---

## 🛠 Tech Stack

<div align="center">

|  | Technology | Purpose |
|--|-----------|---------|
| ⚛️ | **Next.js App Router + TypeScript (strict)** | Web app framework |
| 🎨 | **Tailwind CSS** | Dark-first, high-readability UI |
| 🎞️ | **Framer Motion** | Springs, scan beam, animated check/cross, reduced-motion support |
| 🧠 | **Google GenAI SDK (`@google/genai`)** | Gemini Vision OCR + structured extraction |
| ✅ | **Zod** | Runtime validation of AI output |
| 🔍 | **Tesseract.js** | OCR fallback |
| 🔊 | **Web Speech API** | Urdu voice playback |
| ☁️ | **Firebase (optional)** | Auth, Firestore, Storage with consent-gated rules |
| 🖼️ | **lucide-react** | Icons |

</div>

---

## ⚡ Run Locally

**Prerequisites:** Node.js 20+ (tested on v22), npm 10+, and a [Google Gemini API key](https://aistudio.google.com/).

```bash
# 1. Clone
git clone https://github.com/mabdullahab614-alt/sehat-saathi.git
cd sehat-saathi

# 2. Install
npm install

# 3. Configure environment
cp .env.example .env.local
# → open .env.local and set GEMINI_API_KEY=your_actual_key

# 4. Run
npm run dev
# → http://localhost:3000
```

**Production build check:**

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

### 🔐 Environment variables

See [`.env.example`](.env.example):

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Yes (for live OCR and extraction) | Server-side Gemini key. Never exposed to the browser. |
| `GEMINI_MODEL` | Optional | Override the default Gemini model. |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Optional | Firebase Web App API key. App runs in local demo mode if omitted. |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Optional | Firebase Auth domain. |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Optional | Firebase project ID. |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Optional | Storage bucket for consent-gated demo uploads. |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Optional | Firebase Cloud Messaging sender ID. |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Optional | Firebase Web App ID. |

> 🚫 Never commit `.env.local` or real API keys.

---

## 🗂 Project Structure

> 📝 *Adjust to match your actual folders.*

```
sehat-saathi/
├── app/
│   ├── page.tsx          # Landing + command bar
│   ├── dashboard/        # Dashboard
│   ├── upload/           # Upload + OCR
│   ├── review/           # AI Ka Yaqeen review
│   ├── explain/          # Explanation, voice, teach-back, Q&A, strip match
│   ├── ammi/             # Zero-literacy Ammi Mode
│   ├── schedule/         # Medicine schedule + reminders
│   ├── family/           # Mera Khandaan family health tree
│   ├── eval/             # Live accuracy scorecard + safety challenge
│   ├── care/             # Lahore care navigation
│   ├── caregiver/        # Caregiver summary
│   ├── emergency/        # Red-flag screen
│   └── api/              # teach-back, ask-medicine, medicine-match,
│                         # family-summary, eval, safety-challenge
├── lib/
│   ├── ai/               # ocr.ts, gemini.ts, prompts.ts, schemas.ts
│   ├── safety/           # redFlags.ts (deterministic engine)
│   └── utils/            # validate.ts
├── firestore.rules
├── storage.rules
├── banner.svg
├── .env.example
└── README.md
```

---

## 🛡️ Safety, Ethics & Privacy

| Principle | How we apply it |
|---|---|
| **Not a diagnostic tool** | No diagnosis, prescribing, or treatment changes |
| **Safety overrides AI** | Red-flag symptoms bypass AI generation and go straight to emergency guidance |
| **No fabricated facts** | Extraction is source-bound; unclear fields require user confirmation |
| **Human confirmation** | User reviews extracted data before explanations are shown |
| **Persistent disclaimer** | Every explanation and safety screen carries the notice below |
| **Privacy by default** | No server-side patient database; files are processed in memory and never saved to disk |
| **User control** | Local state can be deleted in one tap; caregiver sharing needs explicit consent |
| **Synthetic data only** | Demo uses synthetic or user-authorized non-sensitive documents |

> *"Yeh medical diagnosis nahi hai; emergency ya serious symptoms mein foran qualified healthcare professional se rabta karein."*

---

## 💰 Startup & Business Model

**Value proposition:** close the gap between *receiving* medical information and *understanding* it, improving confidence, adherence, and access to appropriate care.

| Revenue stream | Customer | Model |
|---|---|---|
| 🏥 **B2B SaaS** | Clinics, hospitals, pharmacies | Monthly subscription, white-labeled Urdu / regional-language portal |
| 💊 **Pharmacy adherence** | Pharmacies | Counseling and refill / adherence tools |
| 📞 **Telehealth referrals** | Telehealth platforms | Qualified care-navigation handoffs |
| 🤝 **Community health** | Employers, insurers, NGOs | Sponsored health-literacy programs |
| 🔌 **API licensing** | Digital-health apps | Usage-based document-comprehension API |

---

## 🧪 3-Minute Demo Script

<details>
<summary><b>▶ Click to expand the full walkthrough</b></summary>

Uses synthetic demo documents. Optional Firebase emulator seed:
`FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 node scripts/seed-demo.mjs`

| Time | Screen | What to do |
|---|---|---|
| **0:00** | Landing (`/`) | Show the language switch, press `⌘/Ctrl + K` for the command palette |
| **0:40** | Upload (`/upload?demo=rx-1`) | Click **"Demo Try Karein"** and watch OCR, red-flag check, and extraction |
| **1:20** | Review (`/review`) | Inspect amber-highlighted fields against the original image, then confirm |
| **1:45** | Explain (`/explain`, `/ammi`) | Play Urdu voice, try Teach-Back, Ask Medicine, Strip Match, then Ammi Mode |
| **2:15** | Schedule & Family (`/schedule`, `/family`) | Tick a dose, enable reminders, load the sample family, export or print |
| **2:45** | Emergency (`/emergency`) | Press `Shift+E` or type "chest pain" to show instant escalation |

</details>

---

## 🗺 Roadmap

- [ ] Regional languages (Punjabi, Sindhi, Pashto, Balochi, Saraiki) with neural Urdu voice
- [ ] Handwriting-specialized pharmacy verification and pharmacist review handoff
- [ ] Longitudinal chronic-care adherence trends with opt-in encrypted caregiver sync
- [ ] Offline-friendly PWA caching for low-connectivity clinics
- [ ] Integration with verified clinic / pharmacy registries and HL7/FHIR lab exports

---

## 👨‍💻 Team

| Name | Role | GitHub |
|---|---|---|
| **Abdullah Javid** | `YOUR_ROLE` | [@mabdullahab614-alt](https://github.com/mabdullahab614-alt) |
| `TEAM_MEMBER_2` | `ROLE` | [@username](https://github.com/username) |
| `TEAM_MEMBER_3` | `ROLE` | [@username](https://github.com/username) |

**Hackathon:** AI Hackathon & Startup Pitch, STCS, Minhaj University Lahore (17 November 2026)
**Niche:** AI for Accessible Healthcare & Well-Being | **UN SDG 3**

---

## ⚠️ Medical Disclaimer

Sehat Saathi is an **informational and educational tool**. It is **not** a medical device, does **not** provide diagnosis or treatment, and is **not** clinically validated. Always confirm medicines and doses with a pharmacist or doctor. **In an emergency, call 1122 or go to the nearest hospital immediately.**

---

## 📜 License

**All Rights Reserved © 2026 Abdullah Javid and team**

This repository is publicly visible **for portfolio and demonstration purposes only**. No part of it may be copied, modified, distributed, or used, for personal, educational, or commercial purposes, without explicit prior written permission from the authors. Forking or cloning does **not** grant any rights.

📧 **Email:** mabdullah.ab614@gmail.com

---

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%"/>

<div align="center">

<a href="https://YOUR_LIVE_DEMO_URL">
<img src="https://readme-typing-svg.demolab.com?font=Outfit&weight=700&size=20&pause=1000&color=34D399&center=true&vCenter=true&width=700&lines=Every+patient+deserves+to+understand+their+own+health.;Healthcare+in+the+language+you+speak+%F0%9F%92%9A;Star+%E2%AD%90+if+this+made+you+smile!" alt="Footer"/>
</a>

<br/><br/>

<a href="https://github.com/mabdullahab614-alt"><img src="https://img.shields.io/badge/GitHub-mabdullahab614--alt-181717?style=for-the-badge&logo=github"/></a>
&nbsp;
<a href="mailto:mabdullah.ab614@gmail.com"><img src="https://img.shields.io/badge/Email-mabdullah.ab614%40gmail.com-ff2d2d?style=for-the-badge&logo=gmail&logoColor=white"/></a>
&nbsp;
<a href="https://www.linkedin.com/in/abdullah-javid-b217a2384/"><img src="https://img.shields.io/badge/LinkedIn-Abdullah%20Javid-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"/></a>
&nbsp;
<a href="https://YOUR_LIVE_DEMO_URL"><img src="https://img.shields.io/badge/%F0%9F%8C%90%20Try%20Sehat%20Saathi-10b981?style=for-the-badge"/></a>

<br/>

**⭐ Star this repo if you believe healthcare should speak your language!**

</div>
