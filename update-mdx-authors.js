const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'src', 'content', 'blog');
if (!fs.existsSync(contentDir)) {
  console.log('No blog directory found.');
  process.exit(0);
}

const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx'));

for (const file of files) {
  const filePath = path.join(contentDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace author: "something" with the structured yaml
  content = content.replace(/^author:\s*".*?"/m, `author:
  name: "Naitik Baldaniya"
  role: "Founder of PlanBot"
  expertise: "AI productivity systems and task automation"`);
  
  fs.writeFileSync(filePath, content);
}
console.log(`Updated ${files.length} MDX files with structured author data.`);
