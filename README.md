# IDEAxAI — Turn Ideas Into Startups

> AI-powered startup blueprint generator that transforms your idea into a comprehensive business plan in seconds.

![IDEAxAI](https://img.shields.io/badge/Powered%20by-Google%20Gemini-4285F4?style=flat-square&logo=google)
![Stack](https://img.shields.io/badge/Stack-React%20%2B%20TypeScript-61DAFB?style=flat-square&logo=react)

---

## What It Does

IDEAxAI takes your raw startup idea — as brief as *"AI fitness coaching app"* — and generates a complete startup blueprint covering 11 key areas:

| Section | Description |
|---|---|
| 🔆 Startup Overview | High-level summary of the concept |
| ⚠️ Problem Statement | The pain point your startup solves |
| 👥 Target Audience | Who you're building for |
| 🧱 MVP Features | The core features to build first |
| 💻 Tech Stack | Recommended technologies |
| 💰 Revenue Model | How you'll make money |
| 📣 Marketing Strategy | How to acquire users |
| 🏆 Competitor Analysis | Who you're up against |
| ⭐ Unique Value Proposition | What makes you different |
| ✅ Validation Strategy | How to test before you build |
| 🗺️ Development Roadmap | Step-by-step path to launch |

---

## Tech Stack

**Frontend**
- React + TypeScript (Vite)
- Tailwind CSS
- Framer Motion (animations)
- React Router v6
- Lucide React (icons)

**Fonts**
- Manrope (body)
- Space Grotesk (display/headings)

**Backend / AI**
- Node.js API (`/api/generate-blueprint`)
- Google Gemini AI (blueprint generation)

---

## Project Structure

```
src/
├── react-app/
│   ├── pages/
│   │   ├── Landing.tsx        # Home page
│   │   ├── Generator.tsx      # Blueprint generator (main feature)
│   │   ├── HowItWorks.tsx     # 3-step explanation page
│   │   └── About.tsx          # Mission, vision, team
│   └── components/
│       ├── Navbar.tsx
│       ├── HeroSection.tsx
│       ├── FeaturesSection.tsx
│       ├── CTASection.tsx
│       └── Footer.tsx
├── shared/
│   └── types.ts               # StartupBlueprint type definition
└── App.tsx                    # Routes
```

---

## Routes

| Path | Page |
|---|---|
| `/` | Landing page |
| `/generator` | Blueprint generator |
| `/how-it-works` | How it works (3 steps) |
| `/about` | About the project |

---

## Getting Started

### Prerequisites
- Node.js 18+
- A Google Gemini API key

### Installation

```bash
git clone https://github.com/your-repo/ideaxai.git
cd ideaxai
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:3000   # or leave blank for same-origin
GEMINI_API_KEY=your_gemini_api_key
```

### Run Locally

```bash
# Start frontend
npm run dev

# Start backend (in a separate terminal)
npm run server
```

---

## How It Works

1. **Describe your idea** — Enter a short description in the generator
2. **AI analyzes & plans** — Gemini researches your market, competitors, and use case
3. **Get your blueprint** — A full 11-section plan is generated, each section copyable

---

## Created By

Made with ❤️ by [Ankita Singh](https://www.linkedin.com/in/ankitaa-singh/) & [Priyanshu Vishwakarma](https://www.linkedin.com/in/priyanshu-vishwakarmaa/)