import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import DownloadBanner from '@/components/DownloadBanner';
import StructuredData from '@/components/StructuredData';
import { organizationSchema, mobileAppSchema, websiteSchema, SITE_URL, SITE_NAME } from '@/lib/seo';
// SEO/AEO Fix #5 — Google Analytics 4 for traffic tracking
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: `${SITE_NAME} — AI Daily Planner App for Students, Professionals & Athletes`,
    template: `%s | ${SITE_NAME}`,
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
    title: `${SITE_NAME} — AI Daily Planner App`,
    description:
      'Create your perfect personalized daily plan in seconds using advanced AI. Students, Professionals, Athletes — any goal, any plan.',
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: `${SITE_NAME} AI Planner` }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — AI Daily Planner App`,
    description:
      'Create your perfect personalized daily plan in seconds using advanced AI.',
  },
  // SEO Fix #3 — Hreflang tags for language targeting
  // NOTE: hi-IN is commented out until a /hi route is actually created
  alternates: {
    canonical: '/',
    languages: {
      'en-IN': '/',
      'en-US': '/',
      // 'hi-IN': '/hi', // TODO: uncomment when Hindi pages are built
      'x-default': '/',
    },
  },
  other: {
    'msvalidate.01': 'BING_WEBMASTER_ID_PLACEHOLDER', // Phase 3 Fix #18: Bing Webmaster verification
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
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
  manifest: '/site.webmanifest',
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
        <StructuredData data={websiteSchema} />
        <StructuredData data={organizationSchema} />
        <StructuredData data={mobileAppSchema} />
        <Nav />
        <DownloadBanner />
        <main className="min-h-screen">{children}</main>
        <Footer />
        {/* SEO Fix #5 — GA4 tracking. */}
        <GoogleAnalytics gaId="G-0Y5H7R0D6Z" />

        {/* Phase 3 Fix #18: Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "CLARITY_PROJECT_ID_PLACEHOLDER");
          `}
        </Script>
      </body>
    </html>
  );
}
