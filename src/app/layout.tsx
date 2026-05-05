import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import DownloadBanner from '@/components/DownloadBanner';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://planbot.com'),
  title: {
    default: 'PlanBot — AI Daily Planner App for Students, Professionals & Athletes',
    template: '%s | PlanBot',
  },
  description:
    'PlanBot is an AI-powered daily planner app for Android that creates personalized plans for students, professionals, athletes, and entrepreneurs using advanced AI technology.',
  keywords: [
    'ai planner app india',
    'ai study planner',
    'daily planner app android india',
    'planbot app',
    'ai goal planner',
    'productivity app india',
    'ai schedule maker',
  ],
  verification: {
    google: [
      'ZePgWuKAsrKeaI7IyGZGXOoYv7SV1RFci-pSZhxl0_M',
      'JKeP6Qlm2S-tSD3hcRpEBTZ5rxl2FTwttgJxhOJ1trw'
    ],
  },
  openGraph: {
    title: 'PlanBot — AI Daily Planner App',
    description:
      'Create your perfect personalized daily plan in seconds using advanced AI. Students, Professionals, Athletes — any goal, any plan.',
    url: 'https://planbot-n07.web.app',
    siteName: 'PlanBot',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'PlanBot AI Planner' }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PlanBot — AI Daily Planner App',
    description:
      'Create your perfect personalized daily plan in seconds using advanced AI.',
  },
  alternates: {
    canonical: 'https://planbot-n07.web.app',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-deep-space text-white font-sans antialiased">
        <Nav />
        <DownloadBanner />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
