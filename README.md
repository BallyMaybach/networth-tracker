# Networth Tracker

A single-file iOS PWA for weekly personal net-worth tracking. Dark mode, Claude-desktop-inspired styling, smooth chart, localStorage backed.

## Files

- `index.html` — the entire app (HTML/CSS/JS inline)
- `manifest.webmanifest` — PWA manifest
- `icons/` — light/dark/tinted iOS app icons (180/192/512) + favicons
- `gen-icons.js` — regenerates the icons via [`sharp`](https://sharp.pixelplumbing.com/) (only needed if you want to tweak the icon design)
- `_serve.js` — tiny static server for local testing

## Run locally

```bash
node _serve.js
# open http://127.0.0.1:8765
```

## Deploy to Netlify

The whole repo is a static site — connect this repo to Netlify, set:

- **Build command:** _(leave empty)_
- **Publish directory:** `.`

Netlify will serve `index.html` directly. PWA install works after the first HTTPS visit on iOS Safari → Share → Add to Home Screen.

## Regenerate icons

```bash
npm install
node gen-icons.js
```

Edits the SVG inside `gen-icons.js`, then re-renders all PNG variants.

## Tech notes

- `MY_INVEST = 7000` is hard-coded in `index.html` — change there if your share base changes.
- All entries live under `localStorage` keys with the `nw:` prefix.
- iOS 18+ uses `apple-touch-icon` media queries to pick the light/dark/tinted variant.
