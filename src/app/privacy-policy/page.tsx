import type { Metadata } from 'next';
import { createMetadata, createWebPageSchema, createBreadcrumbSchema } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = createMetadata({
  title: 'Privacy Policy — PlanBot',
  description: 'Privacy Policy for PlanBot. Learn how PlanBot collects, uses, and protects your personal information.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <StructuredData data={createWebPageSchema(
        'Privacy Policy — PlanBot',
        'Privacy Policy for PlanBot',
        'https://planbotai.app/privacy-policy'
      )} />
      <StructuredData data={createBreadcrumbSchema([
        { name: 'Home', item: 'https://planbotai.app/' },
        { name: 'Privacy Policy', item: 'https://planbotai.app/privacy-policy' }
      ])} />

      <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-center">
            <span className="text-gradient">Privacy</span> Policy
          </h1>
          <p className="text-text-secondary text-center mb-12">Last Updated: December 21, 2025</p>

          <div className="glass-card p-8 md:p-12 prose-planbot">
            <div className="aeo-answer mb-8">
              <p><strong>Your Privacy Matters:</strong> This Privacy Policy explains how PlanBot collects, uses, and protects your personal information.</p>
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
            <ul>
              <li><strong>Device Information:</strong> Device type, operating system, app version</li>
              <li><strong>Usage Data:</strong> Features used, time spent, interaction patterns</li>
              <li><strong>Analytics:</strong> App performance, crash reports (via Firebase Analytics)</li>
              <li><strong>Authentication:</strong> Firebase Authentication tokens</li>
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
              <li>To provide, maintain, and improve the App</li>
              <li>To personalize your experience and generate AI-powered plans</li>
              <li>To communicate with you about updates, offers, and support</li>
              <li>To monitor and analyze usage and trends</li>
              <li>To protect against, identify, and prevent fraud and other illegal activity</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>We do not sell your personal information. We may share information with:</p>
            <ul>
              <li><strong>Service Providers:</strong> Third-party vendors who help us operate the App (e.g., Firebase, AI models)</li>
              <li><strong>Legal Compliance:</strong> When required by law or to protect our rights</li>
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
