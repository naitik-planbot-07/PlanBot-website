import type { Metadata } from 'next';
import { createMetadata, createWebPageSchema, createBreadcrumbSchema, createFAQSchema, SITE_URL } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = createMetadata({
  title: 'PlanBot Pricing — Simple & Transparent',
  // PRD Branding Fix: Removed specific AI model names (Grok/Gemini) to comply with branding constraints.
  description: 'Start free. Upgrade to Pro, Elite, or God tier when you are ready. Unlock up to 100 AI plans, chat messages, and advanced AI models.',
  path: '/pricing',
  image: '/og/pricing.jpg',
});

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={createWebPageSchema(
        'PlanBot Pricing — Simple & Transparent',
        'Start free. Upgrade to Pro, Elite, or God tier when you are ready. Unlock up to 100 AI plans, chat messages, and advanced AI models.',
        `${SITE_URL}/pricing`
      )} />
      <StructuredData data={createBreadcrumbSchema([
        { name: 'Home', item: SITE_URL },
        { name: 'Pricing', item: `${SITE_URL}/pricing` },
      ])} />
      <StructuredData data={createFAQSchema([
        { question: 'How does the tier progression work?', answer: 'Each tier level permanently upgrades your planning history limit (from 3 plans on Free up to 100 plans on God tier), expands your analytics scope (from Today focus up to Diurnal peak study time & Heatmap), and unlocks active goal slots and advanced AI features.' },
        { question: 'How does the God Trial work?', answer: 'You get 3 days of full God tier features (100-plan history, Diurnal distribution, Peer Benchmarks, Study Pattern AI, unlimited goals) completely free. No credit card needed. Download the app to activate.' },
        { question: 'How much do the paid tiers cost in INR?', answer: 'PlanBot Pro is ₹99/month. Elite is ₹129/month. God tier is ₹249/month. You can also save 30% by choosing yearly billing.' },
        { question: 'Can I cancel anytime?', answer: 'Yes. Manage your subscription through Google Play at any time with zero cancellation fees.' },
        { question: 'Can I use PlanBot on iPhone?', answer: 'PlanBot is currently Android only. iOS support is planned for the future.' },
        { question: 'Is there a refund policy?', answer: 'Yes. All Google Play standard refund policies apply. View our full refund policy page for details.' },
      ])} />
      {children}
    </>
  );
}
