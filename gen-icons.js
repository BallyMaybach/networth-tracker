const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const OUT = path.join(__dirname, 'icons');
const SRC = path.join(__dirname, 'icons', 'ICONios.png');
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const sizes = [
    { file: 'icon-light-180.png',  size: 180 },
    { file: 'icon-dark-180.png',   size: 180 },
    { file: 'icon-tinted-180.png', size: 180 },
    { file: 'icon-light-192.png',  size: 192 },
    { file: 'icon-dark-192.png',   size: 192 },
    { file: 'icon-tinted-192.png', size: 192 },
    { file: 'icon-light-512.png',  size: 512 },
    { file: 'icon-dark-512.png',   size: 512 },
    { file: 'icon-tinted-512.png', size: 512 },
    { file: 'favicon-64.png',      size: 64  },
    { file: 'favicon-32.png',      size: 32  },
  ];

  for (const { file, size } of sizes) {
    const out = path.join(OUT, file);
    await sharp(SRC).resize(size, size).png().toFile(out);
    console.log('wrote', out);
  }
  console.log('done');
})().catch(err => { console.error(err); process.exit(1); });
