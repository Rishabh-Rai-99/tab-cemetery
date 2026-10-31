# 🪦 Tab Cemetery

> **A resting place for all those tabs you'll read later.**

Tab Cemetery is a playful, atmospheric mini web application and lightweight bookmark manager designed for chronic tab hoarders. Instead of cluttering your browser with dozens of tabs you swear you will read "this weekend," you can lay them to rest in a gothic virtual cemetery.

---

## ✨ Features

### 1. 🪦 Bury a Tab
- Enter website title (with smart domain-based autofill).
- Enter and validate URL (automatic `https://` protocol prefixing and hostname validation).
- Optional personal note / broken promises ("Read 2 paragraphs at 3:15 AM").
- Humorous cause of demise presets (e.g., *"47-page PDF I downloaded with sheer ambition"*, *"Opened at 2:47 AM during a Wikipedia spiral"*, *"Tutorial for a framework I will never touch again"*), plus custom causes.
- Select from 5 distinct gravestone styles: **Classic**, **Gothic**, **Obelisk**, **Cross**, and **Weathered**.
- Categorize by plot section (*Deep Reads, Tech & Code, 3 AM Spirals, Wishlists, Watch Later, Miscellaneous*).
- Automatically timestamps the exact burial date and time.
- Solemn bell chime audio on burial (synthesized via Web Audio API, no external audio files required).

### 2. 🌙 Cemetery Grounds
- Atmospheric nighttime graveyard setting with deep charcoal palettes, subtle moonlight halo, and drifting ground fog/mist.
- Gravestones styled with chiseled borders, carved epitaph typography, site favicon, formatted burial date, and "time ago" counters.
- Visual status indicators for vigil candles 🕯️ and wilted tribute flowers 🥀.
- Interactive hover effects with ghostly ethereal glow.

### 3. 🔍 Search, Filter & Organize
- Search in real-time by title, domain, note, or cause of death.
- Sort graves by **Newest Burials**, **Oldest Residents**, **Alphabetical (A–Z)**, or **Most Honored**.
- Filter plots by section or view only active vigils.
- Toggle between **Graveyard Plots** (visual 3D-feeling tombstones) and **Crypt Archive** (compact tabular registry).

### 4. 🕯️ Gravestone Details & Vigil
- Click any gravestone to open its detailed plot registry.
- Exact burial timestamp and days entombed counter.
- **Pay Respects**: Light/extinguish a flickering vigil candle or leave wilted black roses.
- One-click copy URL with visual feedback.

### 5. ✨ Resurrect Tabs
- Brings a tab back from the afterlife and opens the original URL in a new browser tab.
- Confetti spirit particle animation and ethereal rising chime.
- Asks for confirmation before removing it from the cemetery.

### 6. 🕊️ Permanent Deletion ("Let it rest")
- Permanently erase a tab with a confirmation dialog so you can let forgotten tabs rest in peace forever.

### 7. 📜 The Cemetery Ledger (Statistics)
- Total tabs laid to rest.
- Total days entombed across all residents.
- Highlights the **Oldest Resident** (the longest neglected tab) with 1-click visit.
- Leading cause of tab demise.
- Total active vigil candles and flower tributes.
- List of recently buried tabs.

### 8. 💾 Persistence & Portability
- Persisted locally in `localStorage`.
- Includes humorous starter graves on first load.
- Export all records as a JSON backup file.
- Import backups anytime.
- Restore sample graves or clear cemetery with confirmation.

---

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Vite**
- **Tailwind CSS v4**
- **Lucide Icons**
- **Canvas-Confetti**
- **Web Audio API** (procedurally synthesized solemn bell and spirit sounds)

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Or build and preview production build
npm run build
npm run preview
```
