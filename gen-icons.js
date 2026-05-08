const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const OUT = path.join(__dirname, 'icons');
fs.mkdirSync(OUT, { recursive: true });

function makeSvg({ withBg = true, fg = '#FFFFFF', bg = '#1a1a1a' }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
    ${withBg ? `<rect width="180" height="180" fill="${bg}"/>` : ''}
    <g fill="${fg}">
      <rect x="32"  y="125" width="13" height="30" rx="2.5"/>
      <rect x="52"  y="110" width="13" height="45" rx="2.5"/>
      <rect x="72"  y="118" width="13" height="37" rx="2.5"/>
      <rect x="92"  y="95"  width="13" height="60" rx="2.5"/>
      <rect x="112" y="105" width="13" height="50" rx="2.5"/>
      <rect x="132" y="80"  width="13" height="75" rx="2.5"/>
    </g>
    <g stroke="${fg}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M 30 70 L 75 45 L 110 55 L 145 25"/>
      <path d="M 132 25 L 145 25 L 145 38"/>
    </g>
  </svg>`;
}

const sizes = [180, 192, 512];
const variants = [
  { name: 'light',  svg: makeSvg({ withBg: true,  bg: '#1a1a1a', fg: '#FFFFFF' }) },
  { name: 'dark',   svg: makeSvg({ withBg: false, fg: '#FFFFFF' }) },
  { name: 'tinted', svg: makeSvg({ withBg: false, fg: '#FFFFFF' }) },
];

(async () => {
  for (const v of variants) {
    for (const s of sizes) {
      const out = path.join(OUT, `icon-${v.name}-${s}.png`);
      await sharp(Buffer.from(v.svg)).resize(s, s).png().toFile(out);
      console.log('wrote', out);
    }
  }
  await sharp(Buffer.from(variants[0].svg)).resize(64, 64).png().toFile(path.join(OUT, 'favicon-64.png'));
  await sharp(Buffer.from(variants[0].svg)).resize(32, 32).png().toFile(path.join(OUT, 'favicon-32.png'));
  console.log('done');
})().catch(err => { console.error(err); process.exit(1); });
