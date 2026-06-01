# CLAUDE.md

- **Projekt:** Networth Tracker
- **Was es tut:** iOS PWA zum Tracken des eigenen Nettovermögens (Assets, Schulden, Verlauf)
- **Stand:** Grundstruktur fertig, Icons generiert, PWA installierbar
- **Jetzt:** Feature-Entwicklung
- **Deployment:** Vercel — wird automatisch von main deployt
- **Design-Richtung:** Dark Mode (`--bg: #1a1a1a`, Accent `--accent: #7FB069` — kein Orange, nur Grün)
- **Farbregel:** Kein Orange (#D97757) im UI. Nur Dark Mode + Grün (#7FB069) als Akzentfarbe.

---

## Struktur

```
networth-tracker/
├── index.html          ← App (HTML + CSS + JS alles inline, Single-File PWA)
├── manifest.webmanifest
├── icons/              ← PWA-Icons (Light / Dark / Tinted, 180/192/512px + Favicons)
│   └── ICONios.png     ← Quell-Icon für gen-icons.js
├── gen-icons.js        ← Einmaliges Build-Tool: generiert alle icons/ aus ICONios.png
├── _serve.js           ← Lokaler Dev-Server (node _serve.js)
├── package.json        ← Nur sharp als Dependency (für gen-icons.js)
└── node_modules/       ← gitignored, nur lokal für Icon-Generierung nötig
```

> `dist/` ist gitignored und wird nicht deployed — alle App-Dateien liegen im Root.

---

## Wichtiges

- **Alles inline in index.html** — kein separates style.css oder script.js
- Daten: `localStorage` (kein Backend)
- Icons neu generieren: `node gen-icons.js` (nur nötig wenn ICONios.png sich ändert)
- Dev-Server: `node _serve.js` → http://localhost:3000
