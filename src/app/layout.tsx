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
    default: `${SITE_NAME} — AI Daily Planner for Students, Pros & Athletes`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'PlanBot is an AI daily planner app for Android that builds custom smart schedules for students, professionals, athletes, and entrepreneurs in seconds.',
  keywords: [
    'AI daily planner app',
    'AI schedule generator',
    'smart planner app',
    'AI productivity app',
    'automatic daily planner',
    'AI routine planner',
    'planbot app',
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
    images: [{ url: '/logo.jpg', width: 1200, height: 630, alt: `${SITE_NAME} AI Planner` }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — AI Daily Planner App`,
    description:
      'Create your perfect personalized daily plan in seconds using advanced AI.',
  },
  // SEO Fix (August 2026 GSC Fix):
  // Removed global alternates block from RootLayout metadata. 
  // Each individual page now defines its own canonical and hreflang tags via createMetadata(),
  // preventing subpages and client tools from inheriting the homepage URL as canonical.
  other: {
    'msvalidate.01': 'E3DBF400C81A3D855B242EBA78D63F37', // Phase 3 Fix #18: Bing Webmaster verification
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
      { url: '/favicon-16x16.jpg', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.jpg', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.jpg', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.jpg', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.jpg', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.jpg',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.jpg',
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
        {/* Performance Optimization (August 2026): Speculation Rules API for instant sub-50ms prerendering & prefetching on high-intent user routes */}
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prerender: [
                {
                  source: 'list',
                  urls: [
                    '/pricing',
                    '/features',
                    '/tools/daily-schedule-generator',
                    '/tools/exam-revision-calculator',
                    '/tools/pomodoro-focus-calculator',
                    '/tools/weather-forecast',
                    '/compare/planbot-vs-motion',
                    '/blog',
                  ],
                  eagerness: 'moderate',
                },
              ],
              prefetch: [
                {
                  source: 'document',
                  where: {
                    and: [
                      { href_matches: '/*' },
                      { not: { href_matches: '/api/*' } },
                      { not: { href_matches: '/*\\?*' } },
                    ],
                  },
                  eagerness: 'conservative',
                },
              ],
            }),
          }}
        />
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

        {/* Facebook Pixel Code */}


        {/* Microsoft Clarity Analytics: Updated tag ID to x7grrxn17q for active PlanBot behavioral session recordings & heatmaps */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "x7grrxn17q");
          `}
        </Script>

        {/* Removed Noupe AI Chatbot per user request to remove chatbot from website */}
      </body>
    </html>
  );
}
