const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '..', 'src', 'content', 'blog');
const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));

let updated = 0;
for (const file of files) {
  const filePath = path.join(BLOG_DIR, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  if (content.includes('/blog/ai-planner-guide')) {
    continue;
  }

  const linkBlock = `\n\n---\n\n*📖 Part of the **[Complete Guide to AI Planning in 2026](/blog/ai-planner-guide)***\n`;
  content += linkBlock;
  
  fs.writeFileSync(filePath, content, 'utf-8');
  updated++;
}

console.log(`Injected pillar page link into ${updated} posts.`);
