import type { Metadata } from 'next';
import PricingCard from '@/components/PricingCard';
import StructuredData from '@/components/StructuredData';
import { createMetadata, createFAQSchema } from '@/lib/seo';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=cpm.planbot';

export const metadata: Metadata = createMetadata({
  title: 'PlanBot Pricing — Start Free, Upgrade Anytime',
  description: 'PlanBot pricing: Free, Pro ₹99/mo, Elite ₹129/mo, God ₹249/mo. AI daily planner with streak system, weekly reports, and advanced AI. Start free on Android.',
  path: '/pricing',
});

const faqs = [
  { question: 'Can I use PlanBot on iPhone?', answer: 'PlanBot is currently Android only. iOS coming soon.' },
  { question: 'How does the God Trial work?', answer: '3 days free, full God features, no credit card needed. Download app to activate.' },
  { question: 'Can I cancel anytime?', answer: 'Yes. Manage subscriptions through Google Play.' },
  { question: 'Is there a refund policy?', answer: 'Yes. See our refund policy page for details.' },
  { question: 'What payment methods are accepted?', answer: 'All payments are processed through Google Play. UPI, cards, and net banking supported.' },
];

export default function PricingPage() {
  return (
    <>
      <StructuredData data={createFAQSchema(faqs)} />

      <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-4 sm:px-6 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Simple, Transparent <span className="text-gradient">Pricing</span>
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">Start free. Upgrade when you&apos;re ready. All plans available in the PlanBot Android app.</p>
      </section>

      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <PricingCard tier="Free" price="Free" features={['2 AI plans/day', '1 message/day', 'Basic AI', 'Ads supported', 'Streak system']} />
          <PricingCard tier="Pro" price="₹99" yearlyPrice="₹999" features={['4 AI plans/day', '4 messages/day', 'Standard AI', 'No ads', 'Everything in Free']} />
          <PricingCard tier="Elite" price="₹129" yearlyPrice="₹1,299" features={['5 AI plans/day', '15 messages/day', 'Advanced AI', '📊 Weekly AI Report', 'No ads', 'Everything in Pro']} />
          <PricingCard tier="God" price="₹249" yearlyPrice="₹2,499" features={['Unlimited AI plans', 'Unlimited messages', 'Premium AI (Most Powerful)', 'Upload photo input', 'All features unlocked', '3-day FREE trial']} highlighted badge="MOST POWERFUL" />
        </div>
        <p className="text-center text-sm text-text-dim mt-8">All purchases made through Google Play. Download the app to subscribe.</p>
      </section>

      {/* Boost Packs */}
      <section className="py-16 px-4 sm:px-6 bg-surface/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Boost Packs</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{ name: 'Small', price: '₹10' }, { name: 'Medium', price: '₹30' }, { name: 'Large', price: '₹99' }, { name: 'Freeze Pack', price: '₹15' }].map((p) => (
              <div key={p.name} className="glass-card p-6 text-center">
                <p className="font-semibold text-white mb-1">{p.name}</p>
                <p className="text-2xl font-bold text-gradient">{p.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-heading text-center mb-12">Frequently Asked <span className="text-gradient">Questions</span></h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-text-secondary">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 text-center">
        <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-lg">Get PlanBot Free on Android →</a>
      </section>
    </>
  );
}
