const fs = require('fs');
const path = require('path');

// Files to copy from public/ to out/ after build
// (Next.js static export copies public/ automatically, 
//  but let's verify these critical files exist)

const filesToVerify = [
  'out/.well-known/assetlinks.json',
  'out/refer/index.html',
];

let allGood = true;
filesToVerify.forEach(file => {
  if (fs.existsSync(path.join(process.cwd(), file))) {
    console.log(`✅ ${file} — present`);
  } else {
    console.error(`❌ ${file} — MISSING! Check public/ folder.`);
    allGood = false;
  }
});

if (allGood) {
  console.log('\n✅ All critical static files present. Safe to deploy.');
} else {
  console.error('\n❌ Missing files detected. Fix before deploying.');
  process.exit(1);
}
