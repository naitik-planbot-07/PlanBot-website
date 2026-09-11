import type { Metadata } from 'next';
import { createMetadata, createWebPageSchema, createBreadcrumbSchema } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';

// GSC Fix (August 2026): noindex on thin legal pages — prevents "Crawled - currently not indexed" waste
export const metadata: Metadata = {
  ...createMetadata({
    title: 'Refund Policy — PlanBot',
    description: 'Refund Policy for PlanBot. Learn about Google Play refund rules and how to request a refund.',
    path: '/refund-policy',
  }),
  };

export default function RefundPolicyPage() {
  return (
    <>
      <StructuredData data={createWebPageSchema(
        'Refund Policy — PlanBot',
        'Refund Policy for PlanBot',
        'https://planbotai.app/refund-policy'
      )} />
      <StructuredData data={createBreadcrumbSchema([
        { name: 'Home', item: 'https://planbotai.app' },
        { name: 'Refund Policy', item: 'https://planbotai.app/refund-policy' }
      ])} />

      <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-center">
            <span className="text-gradient">Refund</span> Policy
          </h1>
          <p className="text-text-secondary text-center mb-12">Last Updated: December 21, 2025</p>

          <div className="glass-card p-8 md:p-12 prose-planbot">
            <div className="aeo-answer mb-8">
              <p><strong>Important:</strong> All purchases in PlanBot are processed through Google Play. Refunds are subject to Google Play&apos;s refund policy and terms.</p>
            </div>

            <h2>1. Google Play Refund Policy</h2>
            <p>Since all PlanBot subscriptions are purchased through Google Play, refund requests must be made through Google Play, not directly to us.</p>

            <h3>1.1 Google Play&apos;s 48-Hour Window</h3>
            <p>Google Play offers a 48-hour refund window for most purchases:</p>
            <ul>
                <li>Refunds requested within 48 hours of purchase are typically approved automatically</li>
                <li>After 48 hours, refunds are at Google&apos;s discretion</li>
                <li>You can request a refund directly from the Google Play Store app or website</li>
            </ul>

            <h2>2. How to Request a Refund</h2>
            
            <h3>Method 1: Through Google Play App</h3>
            <ol>
                <li>Open the <strong>Google Play Store</strong> app on your device</li>
                <li>Tap the <strong>Menu</strong> icon (☰) → <strong>Subscriptions</strong></li>
                <li>Find <strong>PlanBot</strong> in your subscriptions list</li>
                <li>Tap <strong>Manage</strong></li>
                <li>Select <strong>Cancel subscription</strong> or follow the prompts for a refund</li>
            </ol>

            <h3>Method 2: Through Web Browser</h3>
            <ol>
                <li>Go to <a href="https://play.google.com/store/account" target="_blank" rel="noopener noreferrer">play.google.com/store/account</a></li>
                <li>Click on <strong>Order History</strong></li>
                <li>Find the PlanBot order you want to return</li>
                <li>Select <strong>Request a refund</strong> or <strong>Report a problem</strong></li>
                <li>Choose the option that describes your situation</li>
                <li>Complete the form and note that you would like a refund</li>
            </ol>

            <h2>3. Subscription Cancellations</h2>
            <ul>
                <li>Uninstalling the app will NOT cancel your subscription</li>
                <li>You must cancel your subscription through Google Play to stop future billing</li>
                <li>If you cancel, you will still have access to premium features until the end of your current billing period</li>
            </ul>

            <h2>4. Need Help?</h2>
            <p>If you&apos;re having trouble with the Google Play refund process, or if you believe there was a billing error, please contact us at: <a href="mailto:plannexttech@gmail.com">plannexttech@gmail.com</a></p>
            <p className="text-sm text-text-secondary mt-2">Note: While we can help troubleshoot, we cannot directly process refunds as all transactions are handled by Google.</p>
          </div>
        </div>
      </section>
    </>
  );
}
