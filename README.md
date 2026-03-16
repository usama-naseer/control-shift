# Control Shift — AI-Powered Relocation Platform

A responsive React SPA for Control Shift's AI-powered moving concierge. Select your rooms, scan your inventory via video, schedule your move, and get a live price quote — all in one page.

## Quick Start

```bash
cd control-shift
npm install
npm run dev
```

Runs at `http://localhost:5173`

## Deploy to GitHub Pages

```bash
npm run deploy
```

Live at: `https://<your-username>.github.io/control-shift/`

> Make sure the `base` in `vite.config.js` matches your repo name before deploying.

## Tech Stack

- React 19 + Vite 7
- Tailwind CSS 4
- Framer Motion 12
- CSS Custom Properties (design tokens)
- Material Symbols (icons)
- Plus Jakarta Sans / Inter (fonts)

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Sticky nav with mobile hamburger menu
│   ├── RoomCard.jsx        # Increment/decrement room counter cards
│   ├── TruckVisual.jsx     # Real-time truck load visualizer
│   ├── Footer.jsx
│   └── SectionWrapper.jsx
├── sections/
│   ├── HeroSection.jsx     # Room selector + truck visual
│   ├── UploadSection.jsx   # 4-state video upload + AI inventory sim
│   └── SchedulerSection.jsx # Calendar, time slots, live cost quote
├── hooks/
│   └── useRoomCounter.js   # Room state + load calculation logic
├── utils/
│   ├── truckLogic.js       # Load formula and tier logic
│   └── motion.js           # Shared animation configs
├── styles/
│   ├── tokens.css          # Design tokens (colors, spacing, type)
│   └── responsive.css      # Global layout helpers
└── data/
    └── mockData.js
```

## Features

**Hero — Room Selector**
- Bedroom, Bathroom, Home Office counters with live truck fill animation
- Load formula: `(bedrooms × 1.0) + (bathrooms × 0.3) + (homeOffice × 0.8)`
- Real-time fill percent (0–95%), no-load edge case handled
- Summary sentence updates dynamically below the room grid

**Upload — Smart Video Inventory**
- 4-state machine: IDLE → UPLOADING → PROCESSING → RESULTS
- Fake upload progress bar (2s), 2s AI processing pause, staggered badge reveal
- Editable results: rename items inline, delete items, add missed items manually
- Scrollable grid handles any number of detected items
- Confirm List locks the inventory and updates the scanned count

**Scheduler — Calendar & Quotation**
- Real calendar built from current date, past days disabled
- Past time slots disabled when today is selected, auto-selects first available
- Editable distance field — updates cost instantly
- Live cost formula: `(rooms × $120) + (items × $8) + (distance × $3.50) + weekend surcharge $75 + 8% insurance`
- Lock-in button requires: rooms selected + video analysed + inventory confirmed

## Lock-in Gate (3 steps required)

The "Lock-in This Price" button is blocked until all three conditions are met, with a contextual hint that updates at each step:

1. No rooms selected → "Select your rooms in the section above first."
2. No video analysed → "Upload and analyse a video to enable price lock."
3. Inventory not confirmed → "Confirm your detected items in the section above first."

## Scripts

```bash
npm run dev        # Dev server
npm run build      # Production build
npm run preview    # Preview build locally
npm run deploy     # Build + push to gh-pages branch
```
