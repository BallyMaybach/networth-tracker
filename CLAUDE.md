# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

- **Projekt:** Networth Tracker
- **Was es tut:** iOS PWA zum Tracken des eigenen Nettovermögens (Assets, Schulden, Verlauf)
- **Stand:** Supabase-Backend integriert (Auth + DB), PWA installierbar, Feature-Entwicklung läuft
- **Deployment:** Vercel — wird automatisch von main deployt
- **Design-Richtung:** Dark Mode (`--bg: #1a1a1a`, Accent `--accent: #7FB069` — kein Orange, nur Grün)
- **Farbregel:** Kein Orange (#D97757) im UI. Nur Dark Mode + Grün (#7FB069) als Akzentfarbe.

---

## Befehle

```bash
node _serve.js          # Dev-Server → http://localhost:3000
node gen-icons.js       # Icons neu generieren (nur wenn ICONios.png sich ändert)
```

---

## Struktur

```
networth-tracker/
├── index.html          ← App (HTML + CSS + JS alles inline, Single-File PWA)
├── manifest.webmanifest
├── icons/              ← PWA-Icons (Light / Dark / Tinted, 180/192/512px + Favicons)
│   └── ICONios.png     ← Quell-Icon für gen-icons.js
├── gen-icons.js        ← Einmaliges Build-Tool: generiert alle icons/ aus ICONios.png
├── _serve.js           ← Lokaler Dev-Server
├── package.json        ← Nur sharp als Dependency (für gen-icons.js)
└── node_modules/       ← gitignored, nur lokal für Icon-Generierung nötig
```

> `dist/` ist gitignored und wird nicht deployed — alle App-Dateien liegen im Root.

---

## Architektur (index.html)

Die gesamte App (~1560 Zeilen) ist eine einzige HTML-Datei mit inline CSS und JS.

**Backend: Supabase**
- Client-Init ganz oben im `<script>`-Block mit hardcoded URL + anon key
- Auth über `sb.auth` (E-Mail/Passwort), Session wird von Supabase automatisch gehalten
- Supabase-JS wird über CDN geladen: `cdn.jsdelivr.net/npm/@supabase/supabase-js@2`

**Datenbank-Tabellen:**
- `nw_entries` — ein Eintrag pro Datum: `portfolio_total`, `portfolio_profit`, `liquid_account`, `liquid_cash`, `liquid_paypal`, `other_assets` (JSONB-Array)
- `nw_profiles` — pro User: `my_invest` (eigener Portfolioanteil in €)

**App-State:**
```js
state = { entries, view, draft, editingId, settingsDraft, chartMode, authMode }
```
- `state.view` steuert welcher Screen gerendert wird: `'loading'` → `'auth'` → `'home'` / `'entry'` / `'settings'`
- `state.entries` ist chronologisch sortiert (älteste zuerst), Chart und Delta-Berechnung setzen das voraus

**Render-Muster:** Imperatives Re-Render via `render()` → setzt `$('#app').innerHTML` komplett neu, dann werden Events neu gebunden. Kein Framework, kein Virtual DOM.

**Berechnungslogik:**
- `computeBreakdown(data)` berechnet `myPortfolio`, `liquid`, `other`, `total` aus den Rohdaten
- `computeMyPortfolio(total, profit)` ermittelt den eigenen Anteil am Portfolio anhand von `MY_INVEST` (€-Betrag des eigenen Einsatzes)
- `MY_INVEST` ist eine globale Variable, wird aus `nw_profiles` geladen

**DB-Mapping:** `dbToEntry(row)` / `entryToDb(entry)` konvertieren zwischen DB-Spalten und internem Entry-Objekt.

**Chart:** SVG-basiert, inline gerendert in `renderChart()`. Drei Modi: `total`, `portfolio`, `liquid`.

---

## Wichtiges

- **Alles inline in index.html** — kein separates style.css oder script.js
- Vor jeder Änderung Datei lesen (sie ist groß — gezielt mit offset/limit lesen)
- Daten: Supabase (nachhilfe-tracker, ID: yyxnhwkdwcgpqajeknfe, Tabellen: nw_entries + nw_profiles)
- Icons neu generieren: `node gen-icons.js` (nur nötig wenn ICONios.png sich ändert)
- Dev-Server: `node _serve.js` → http://localhost:3000

## AIOS

Ballys AI Operating System liegt unter:
`C:\Users\Bally\OneDrive\Desktop\BUSINESS\Bally Ordner\AI-OS-Bally`

Dort liegen Skills, Connections, Context und alle Automatisierungen.
