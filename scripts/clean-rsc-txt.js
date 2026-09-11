/**
 * Post-build cleanup script: Remove RSC (React Server Component) .txt payload files
 * from the static export output directory.
 * 
 * WHY: Next.js static export (output: 'export') generates .txt RSC payload files
 * alongside every .html file (e.g., about.txt, blog/ai-planner-guide.txt).
 * Firebase Hosting with cleanUrls serves these at URLs like /about.txt (HTTP 200),
 * causing Google to crawl them as duplicate content. This creates "Page with redirect"
 * and "Duplicate canonical" issues in Google Search Console.
 * 
 * FIX: Delete all RSC .txt files after build, KEEPING legitimate .txt files like
 * robots.txt, llms.txt, llm.txt, llms-full.txt, app-ads.txt, and the IndexNow key.
 * 
 * Added: 2026-08-31 — Fix for 42 "Page with redirect" GSC errors
 */

const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'out');

// Legitimate .txt files that should NOT be deleted
const KEEP_FILES = new Set([
  'robots.txt',
  'llms.txt',
  'llm.txt',
  'llms-full.txt',
  'app-ads.txt',
  'ads.txt',
  'd3b07384d113edec49eaa6238ad5ff00.txt', // IndexNow verification key
]);

let deletedCount = 0;
let keptCount = 0;

function cleanTxtFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Skip _next directory — internal Next.js assets
      if (entry.name === '_next') continue;
      cleanTxtFiles(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.txt')) {
      if (KEEP_FILES.has(entry.name)) {
        keptCount++;
        console.log(`  KEEP: ${path.relative(OUT_DIR, fullPath)}`);
      } else {
        fs.unlinkSync(fullPath);
        deletedCount++;
      }
    }
  }
}

console.log('\\n🧹 Cleaning RSC .txt payload files from out/ ...');
console.log(`   Directory: ${OUT_DIR}\\n`);

if (!fs.existsSync(OUT_DIR)) {
  console.error('❌ Output directory not found. Run "npm run build" first.');
  process.exit(1);
}

cleanTxtFiles(OUT_DIR);

console.log(`\\n✅ Cleanup complete: ${deletedCount} RSC .txt files deleted, ${keptCount} legitimate .txt files kept.`);
console.log('   Google will no longer crawl duplicate RSC payload URLs.\\n');
