import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center mt-20">
      <h1 className="text-6xl md:text-8xl font-bold text-gradient mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Page Not Found</h2>
      <p className="text-text-secondary mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist, or it may have been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Link href="/" className="btn-primary">Return Home</Link>
        <a
          href="https://play.google.com/store/apps/details?id=cpm.planbot"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          Download App
        </a>
      </div>
      
      <div className="flex gap-6 text-sm text-accent">
        <Link href="/blog" className="hover:underline">Read the Blog</Link>
        <Link href="/features" className="hover:underline">Explore Features</Link>
        <Link href="/tools" className="hover:underline">Free Tools</Link>
      </div>
    </div>
  );
}
