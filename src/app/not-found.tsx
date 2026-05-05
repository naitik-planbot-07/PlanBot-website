import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl md:text-8xl font-bold text-gradient mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Page Not Found</h2>
      <p className="text-text-secondary mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist. Maybe you were looking for the app?
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/" className="btn-primary">Go Home</Link>
        <a
          href="https://play.google.com/store/apps/details?id=cpm.planbot"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          Download App
        </a>
      </div>
    </div>
  );
}
