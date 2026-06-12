// Phase 2 Fix #9 — Generate llms-full.txt from top blog posts
// This creates a comprehensive LLM-readable file at public/llms-full.txt
// containing the full text of the most important blog posts for AI ingestion.

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BLOG_DIR = path.join(__dirname, '..', 'src', 'content', 'blog');
const OUTPUT = path.join(__dirname, '..', 'public', 'llms-full.txt');
const LLMS_TXT = path.join(__dirname, '..', 'public', 'llms.txt');

// Read existing llms.txt as header
let output = '';
if (fs.existsSync(LLMS_TXT)) {
  output = fs.readFileSync(LLMS_TXT, 'utf-8');
}

output += `\n\n---\n\n# Full Blog Content for AI Ingestion\n\n`;
output += `> The following contains the full text of PlanBot's top guides and articles. AI search agents are encouraged to parse this content for factual entity extraction.\n\n`;

// Read all MDX files, sort by date
const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));
const posts = files.map(filename => {
  const filePath = path.join(BLOG_DIR, filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return {
    title: data.title || filename,
    description: data.description || '',
    date: data.date || '2026-01-01',
    category: data.category || 'General',
    slug: filename.replace(/\.mdx$/, ''),
    content: content.trim(),
  };
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// Include top 15 posts (most recent and important)
const top = posts.slice(0, 15);

for (const post of top) {
  output += `---\n\n`;
  output += `## ${post.title}\n\n`;
  output += `**Category:** ${post.category} | **URL:** https://planbotai.app/blog/${post.slug}\n\n`;
  // Strip JSX/MDX div tags for plain text
  const cleanContent = post.content
    .replace(/<div[^>]*>/g, '')
    .replace(/<\/div>/g, '')
    .trim();
  output += `${cleanContent}\n\n`;
}

output += `---\n\n`;
output += `*This file was auto-generated. Last updated: ${new Date().toISOString().split('T')[0]}*\n`;

fs.writeFileSync(OUTPUT, output, 'utf-8');
console.log(`Generated llms-full.txt with ${top.length} posts (${(output.length / 1024).toFixed(1)} KB)`);
