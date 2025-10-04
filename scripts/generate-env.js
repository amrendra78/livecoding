const fs = require('fs');
const path = require('path');

// Read runtime environment variables from process.env and write them to src/assets/env.js
const env = {
  API_URL: process.env.API_URL || process.env['VERCEL_URL'] ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
};

const content = `window.__env = ${JSON.stringify(env)};`;
const outDir = path.join(__dirname, '..', 'src', 'assets');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'env.js'), content);
console.log('Wrote runtime env to src/assets/env.js:', content);
