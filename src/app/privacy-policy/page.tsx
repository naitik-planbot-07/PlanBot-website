import type { Metadata } from 'next';
import { createMetadata, createWebPageSchema, createBreadcrumbSchema } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';

// GSC Fix (August 2026): noindex on thin legal pages — prevents "Crawled - currently not indexed" waste
export const metadata: Metadata = {
  ...createMetadata({
    title: 'Privacy Policy — PlanBot',
    description: 'Privacy Policy for PlanBot. Learn how PlanBot collects, uses, and protects your personal information.',
    path: '/privacy-policy',
  }),
  };

export default function PrivacyPolicyPage() {
  return (
    <>
      <StructuredData data={createWebPageSchema(
        'Privacy Policy — PlanBot',
        'Privacy Policy for PlanBot',
        'https://planbotai.app/privacy-policy'
      )} />
      <StructuredData data={createBreadcrumbSchema([
        { name: 'Home', item: 'https://planbotai.app' },
        { name: 'Privacy Policy', item: 'https://planbotai.app/privacy-policy' }
      ])} />

      <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-center">
            <span className="text-gradient">Privacy</span> Policy
          </h1>
          <p className="text-text-secondary text-center mb-12">Last Updated: September 7, 2026</p>

          <div className="glass-card p-8 md:p-12 prose-planbot">
            <div className="aeo-answer mb-8">
              <p><strong>Your Privacy Matters:</strong> This Privacy Policy explains how PlanBot collects, uses, and protects your personal information across our website and Android mobile application.</p>
            </div>

            <h2>1. Information We Collect</h2>
            
            <h3>1.1 Information You Provide</h3>
            <ul>
              <li><strong>Account Information:</strong> Name, email address, profile picture (if provided)</li>
              <li><strong>Study Data:</strong> Study plans, tasks, schedules, progress tracking</li>
              <li><strong>Messages:</strong> Chat messages with AI assistant</li>
              <li><strong>Preferences:</strong> App settings, notification preferences</li>
            </ul>

            <h3>1.2 Automatically Collected Information</h3>
            {/* Privacy Compliance Update (September 2026): Explicitly disclosed Advertising ID, Firebase Analytics, and Firebase Crashlytics for app improvement and ad delivery */}
            <p className="mb-4">
              We collect anonymized diagnostic and usage data to ensure application stability, troubleshoot crashes, optimize user experience, and deliver advertising. This data does NOT include any personal content such as your private study plans, chat prompts, or task notes.
            </p>
            <ul>
              <li><strong>Google Advertising ID (GAID / AAID):</strong> A unique, user-resettable device identifier provided by Google Play Services. This identifier is used to display relevant advertisements, prevent fraudulent ad clicks, cap ad frequency, and measure advertising campaign performance. You can reset or opt-out of personalized advertising at any time through your Android device settings (<em>Settings &gt; Google &gt; Ads</em>).</li>
              <li><strong>Firebase Analytics &amp; Google Analytics:</strong> Aggregated, non-personally identifiable behavioral metrics including screen views, session duration, feature interactions, and button taps. These insights help us understand how users navigate PlanBot and guide feature improvements.</li>
              <li><strong>Firebase Crashlytics:</strong> Automated crash logs, stack traces, system diagnostics, and device state indicators (e.g., OS version, device model, free RAM/storage at time of crash). Crashlytics data is utilized solely to identify application crashes, fix bugs promptly, and ensure overall stability across different Android devices.</li>
              <li><strong>Device &amp; Network Information:</strong> Device model, operating system version, app version, network connection type, and general geographic location (country/city level, non-precise).</li>
              <li><strong>Authentication Tokens:</strong> Secure tokens managed via Firebase Authentication for account validation.</li>
            </ul>

            <h3>1.3 Payment Information</h3>
            <p>Payment processing is handled by Google Play. We do NOT store your credit card or payment details. We only receive:</p>
            <ul>
              <li>Purchase confirmation</li>
              <li>Subscription status</li>
              <li>Transaction ID (for verification)</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul>
              <li>To provide, maintain, and improve the functionality, speed, and reliability of the App</li>
              <li>To diagnose technical bugs, prevent crashes, and monitor app health via Firebase Crashlytics</li>
              <li>To understand feature adoption and optimize user workflows via Firebase Analytics and Google Analytics</li>
              <li>To serve contextual and personalized advertisements on free-tier accounts and measure advertising performance via Google Advertising ID</li>
              <li>To personalize your experience and generate AI-powered plans</li>
              <li>To communicate with you about critical updates, security notices, and customer support</li>
              <li>To protect against, identify, and prevent fraud and other illegal activity</li>
            </ul>

            <h2>3. Third-Party Service Providers &amp; Advertising</h2>
            <p>We do not sell your personal data. We partner with reputable third-party service providers to power specific app functions and advertising:</p>
            <ul>
              <li><strong>Google Play Services &amp; Google AdMob:</strong> For advertising delivery, ad attribution, and in-app purchase verification.</li>
              <li><strong>Firebase (Google LLC):</strong> For backend infrastructure, secure authentication, Firebase Analytics, and Firebase Crashlytics error monitoring.</li>
              <li><strong>Google Analytics &amp; Microsoft Clarity:</strong> For anonymized web and mobile session analytics to improve user interfaces.</li>
              <li><strong>AI Engine Infrastructure:</strong> For processing scheduling prompts into structured daily time blocks.</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>We implement reasonable security measures to protect your information. However, no method of transmission over the internet or electronic storage is 100% secure.</p>

            <h2>5. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. You can manage your data through the App settings or contact us directly.</p>

            <h2>6. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

            <h2>7. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:plannexttech@gmail.com">plannexttech@gmail.com</a></p>
          </div>
        </div>
      </section>
    </>
  );
}
