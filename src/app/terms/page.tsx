import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata, createWebPageSchema, createBreadcrumbSchema } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';

// GSC Fix (August 2026): noindex on thin legal pages — prevents "Crawled - currently not indexed" waste
export const metadata: Metadata = {
  ...createMetadata({
    title: 'Terms & Conditions — PlanBot',
    description: 'Terms and Conditions for PlanBot. Read the rules and guidelines for using the PlanBot app.',
    path: '/terms',
  }),
  };

export default function TermsPage() {
  return (
    <>
      <StructuredData data={createWebPageSchema(
        'Terms & Conditions — PlanBot',
        'Terms and Conditions for PlanBot',
        'https://planbotai.app/terms'
      )} />
      <StructuredData data={createBreadcrumbSchema([
        { name: 'Home', item: 'https://planbotai.app' },
        { name: 'Terms & Conditions', item: 'https://planbotai.app/terms' }
      ])} />

      <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-center">
            <span className="text-gradient">Terms</span> & Conditions
          </h1>
          <p className="text-text-secondary text-center mb-12">Last Updated: December 21, 2025</p>

          <div className="glass-card p-8 md:p-12 prose-planbot">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using PlanBot (&quot;the App&quot;), you accept and agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use the App.</p>

            <h2>2. Description of Service</h2>
            <p>PlanBot is an AI-powered study planning and productivity application that helps users organize their academic schedules, track progress, and optimize learning.</p>

            <h2>3. Subscription Plans</h2>
            <p>PlanBot offers the following subscription tiers:</p>
            <ul>
                <li><strong>Free Plan</strong>: Limited daily prompts and messages</li>
                <li><strong>Pro Plan</strong>: Enhanced limits and features</li>
                <li><strong>Elite Plan</strong>: Advanced features and higher limits</li>
                <li><strong>God Plan</strong>: Unlimited access to all features</li>
            </ul>

            <div className="aeo-answer mb-8">
              <p><strong>Important:</strong> All subscriptions are processed through Google Play Billing. Prices are displayed in your local currency at the time of purchase.</p>
            </div>

            <h2>4. Payment Terms</h2>
            <ul>
                <li>Subscriptions are billed monthly or yearly based on your selection</li>
                <li>Payment will be charged to your Google Play account at confirmation of purchase</li>
                <li>Subscriptions automatically renew unless auto-renew is turned off at least 24 hours before the end of the current period</li>
                <li>Your account will be charged for renewal within 24 hours prior to the end of the current period</li>
                <li>You can manage and cancel subscriptions in your Google Play account settings</li>
            </ul>

            <h2>5. User Responsibilities</h2>
            <p>You agree to:</p>
            <ul>
                <li>Provide accurate information when creating an account</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use the App only for lawful purposes</li>
                <li>Not attempt to reverse engineer or manipulate the App&apos;s AI systems</li>
            </ul>

            <h2>6. AI Output Disclaimer</h2>
            <p>PlanBot utilizes Artificial Intelligence to generate study plans and provide suggestions. While we strive for accuracy:</p>
            <ul>
                <li>AI-generated content should be reviewed and verified by the user</li>
                <li>We do not guarantee the completeness or accuracy of AI responses</li>
                <li>The App is a tool to assist your planning, not a replacement for personal judgment</li>
            </ul>

            <h2>7. Privacy Policy</h2>
            <p>Your use of PlanBot is also governed by our <Link href="/privacy-policy" className="text-accent hover:underline">Privacy Policy</Link>, which details how we collect and use your information.</p>

            <h2>8. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. We will notify users of significant changes. Continued use of the App after changes constitutes acceptance of the new terms.</p>

            <h2>9. Contact Information</h2>
            <p>For questions regarding these terms, please contact us at: <a href="mailto:plannexttech@gmail.com">plannexttech@gmail.com</a></p>
          </div>
        </div>
      </section>
    </>
  );
}
