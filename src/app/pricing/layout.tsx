import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'PlanBot Pricing — Simple & Transparent',
  description: 'Start free. Upgrade to Pro, Elite, or God tier when you are ready. Unlock unlimited AI plans, chat messages, and advanced Grok/Gemini models.',
  path: '/pricing',
  image: '/og/pricing.png',
});

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
