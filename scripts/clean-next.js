const fs = require('fs');
const path = require('path');

const nextDir = path.join(__dirname, '..', '.next');
if (fs.existsSync(nextDir)) {
  try {
    fs.rmSync(nextDir, { recursive: true, force: true });
    console.log('🧹 Cleaned .next build cache.');
  } catch (err) {
    // Ignore locked files and let Next.js overwrite
  }
}
