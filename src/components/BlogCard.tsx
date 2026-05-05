import Link from 'next/link';

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

export default function BlogCard({ slug, title, excerpt, date, readTime, category }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="block group">
      <article className="glass-card p-6 h-full flex flex-col">
        {/* Gradient thumbnail placeholder */}
        <div className="w-full h-40 rounded-xl mb-4 bg-gradient-to-br from-primary/20 via-accent/10 to-pink-accent/10 flex items-center justify-center">
          <span className="text-4xl opacity-50">📝</span>
        </div>

        {/* Category tag */}
        <span className="inline-block self-start px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 mb-3">
          {category}
        </span>

        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors duration-300 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-text-secondary line-clamp-3 flex-1 mb-4">{excerpt}</p>

        <div className="flex items-center justify-between text-xs text-text-dim">
          <span>{date}</span>
          <span>{readTime}</span>
        </div>
      </article>
    </Link>
  );
}
