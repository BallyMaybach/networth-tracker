# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

- **Projekt:** Networth Tracker
- **Was es tut:** iOS PWA zum Tracken des eigenen Nettovermögens (Assets, Schulden, Verlauf)
- **Stand:** MVP. Reine localStorage-App (kein Backend, kein Login), PWA installierbar.
- **Deployment:** Vercel — wird automatisch von main deployt
- **Design-Richtung:** Dark Mode (`--bg: #1a1a1a`, Accent `--accent: #7FB069` — kein Orange, nur Grün)
- **Farbregel:** Kein Orange (#D97757) im UI. Nur Dark Mode + Grün (#7FB069) als Akzentfarbe.

---

## Befehle

```bash
node _serve.js          # Dev-Server → http://localhost:8765
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

**Backend: localStorage (kein Server, kein Login)**
- Alle Einträge liegen unter dem Key `nw_entries` (JSON-Array). Offener Entwurf unter `nw_draft`.
- `loadAll()` / `saveEntry()` / `deleteEntryById()` lesen/schreiben direkt localStorage. `normalizeEntry()` säubert Felder.
- Boot ist instant: `state.entries = loadAll()` → `applyStartView()` → `render()`. Kein Spinner, kein Netzwerk.
- Datenaustausch zwischen Geräten nur per Export/Import (JSON-Datei) auf dem Home-Screen.

**Entry-Modell:** ein Eintrag pro Datum: `portfolio {total, profit}`, `myInvest`, `liquid {account, cash, paypal}`, `other [{name,value}]`.

**App-State:**
```js
state = { entries, view, draft, editingId, chartMode }
```
- `state.view`: `'home'` / `'entry'`
- `state.entries` ist chronologisch sortiert (älteste zuerst), Chart und Delta-Berechnung setzen das voraus

**Render-Muster:** Imperatives Re-Render via `render()` → setzt `$('#app').innerHTML` komplett neu, dann werden Events neu gebunden. Kein Framework, kein Virtual DOM.

**Berechnungslogik:**
- `computeBreakdown(data)` berechnet `myPortfolio`, `liquid`, `other`, `total` aus den Rohdaten
- `computeMyPortfolio(total, profit, myInvest)` ermittelt den eigenen Portfolioanteil = `myInvest / Einstandswert × total`, gedeckelt auf 100 %.
- **Wichtig:** `myInvest` wird **pro Eintrag** gespeichert (Snapshot), nicht global. So ändert ein neuer/bearbeiteter Investment-Wert niemals rückwirkend alte Einträge. Neue Einträge werden mit dem `myInvest` des letzten Eintrags vorbelegt (`freshDraft()`).

**Chart:** SVG-basiert, inline gerendert in `renderChart()`. Drei Modi: `total`, `portfolio`, `liquid`.

---

## Wichtiges

- **Alles inline in index.html** — kein separates style.css oder script.js
- Vor jeder Änderung Datei lesen (sie ist groß — gezielt mit offset/limit lesen)
- Daten: localStorage (`nw_entries`). Kein Backend, kein Login. Supabase wurde Juni 2026 wieder entfernt (Reload-Spinner + Overkill).
- Icons neu generieren: `node gen-icons.js` (nur nötig wenn ICONios.png sich ändert)
- Dev-Server: `node _serve.js` (läuft auf Port 8765)

## AIOS

Ballys AI Operating System liegt unter:
`C:\Users\Bally\OneDrive\Desktop\BUSINESS\Bally Ordner\AI-OS-Bally`

Dort liegen Skills, Connections, Context und alle Automatisierungen.
