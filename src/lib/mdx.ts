import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'blog');

export interface Author {
  name: string;
  role: string;
  expertise: string;
  url?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: string;
  tags: string[];
  author: Author;
  readTime: string;
  content: string;
  howToSteps?: Array<{ name: string; text: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  heroImage?: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'));
  
  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const filePath = path.join(CONTENT_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      updated: data.updated || undefined,
      category: data.category || 'General',
      tags: data.tags || [],
      author: typeof data.author === 'object' ? data.author : { name: data.author || 'PlanBot Team', role: 'Editor', expertise: 'General Productivity' },
      readTime: data.readTime || '5 min read',
      howToSteps: data.howToSteps || undefined,
      faqs: data.faqs || undefined,
      heroImage: data.heroImage || undefined,
      content,
    };
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    updated: data.updated || undefined,
    category: data.category || 'General',
    tags: data.tags || [],
    author: typeof data.author === 'object' ? data.author : { name: data.author || 'PlanBot Team', role: 'Editor', expertise: 'General Productivity' },
    readTime: data.readTime || '5 min read',
    howToSteps: data.howToSteps || undefined,
    faqs: data.faqs || undefined,
    heroImage: data.heroImage || undefined,
    content,
  };
}

export function getPostsByCategory(category: string): BlogPost[] {
  const allPosts = getAllPosts();
  if (category === 'All') return allPosts;
  return allPosts.filter((p) => p.category === category);
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const cats = new Set(posts.map((p) => p.category));
  return ['All', ...Array.from(cats)];
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs.readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export function getRelatedPosts(currentSlug: string, tags: string[], category: string, limit: number = 3): BlogPost[] {
  const allPosts = getAllPosts().filter((p) => p.slug !== currentSlug);
  
  // Score posts based on matching tags and category
  const scoredPosts = allPosts.map((post) => {
    let score = 0;
    if (post.category === category) score += 2;
    const matchingTags = post.tags.filter((tag) => tags.includes(tag));
    score += matchingTags.length;
    return { post, score };
  });

  // Sort by score descending, then by date descending
  scoredPosts.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
  });

  return scoredPosts.slice(0, limit).map((s) => s.post);
}
