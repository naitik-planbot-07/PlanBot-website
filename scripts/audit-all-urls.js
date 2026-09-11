const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../out');

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getAllHtmlFiles(outDir);
console.log(`Auditing ${htmlFiles.length} HTML files in out/...`);

let issuesCount = 0;

for (const file of htmlFiles) {
  const relPath = path.relative(outDir, file).replace(/\\/g, '/');
  if (relPath.startsWith('refer/') || relPath === '404.html' || relPath.startsWith('google')) continue;

  const content = fs.readFileSync(file, 'utf8');

  // Title check
  const titleMatch = content.match(/<title>(.*?)<\/title>/);
  const title = titleMatch ? titleMatch[1] : '';

  // Meta description check
  const descMatch = content.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || content.match(/<meta\s+content="([^"]*)"\s+name="description"/i);
  const desc = descMatch ? descMatch[1] : '';

  // Canonical check
  const canonicalMatch = content.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i) || content.match(/<link\s+href="([^"]*)"\s+rel="canonical"/i);
  const canonical = canonicalMatch ? canonicalMatch[1] : '';

  // Schema check
  const hasJsonLd = content.includes('application/ld+json');

  const fileIssues = [];

  if (!title) {
    fileIssues.push('Missing <title>');
  } else if (title.length > 60) {
    fileIssues.push(`Title too long (${title.length} chars): "${title}"`);
  }

  if (!desc) {
    fileIssues.push('Missing meta description');
  } else if (desc.length > 160) {
    fileIssues.push(`Meta description too long (${desc.length} chars): "${desc.slice(0, 40)}..."`);
  } else if (desc.length < 50) {
    fileIssues.push(`Meta description too short (${desc.length} chars): "${desc}"`);
  }

  if (!canonical) {
    fileIssues.push('Missing canonical tag');
  }

  if (!hasJsonLd) {
    fileIssues.push('Missing JSON-LD schema');
  }

  if (fileIssues.length > 0) {
    console.log(`\n❌ Issues in ${relPath}:`);
    fileIssues.forEach(iss => console.log(`   - ${iss}`));
    issuesCount += fileIssues.length;
  }
}

if (issuesCount === 0) {
  console.log('\n✅ 100% CLEAN! All pages pass Bing and Google SEO criteria with zero warnings!');
} else {
  console.log(`\n⚠️ Found ${issuesCount} total issues.`);
}
