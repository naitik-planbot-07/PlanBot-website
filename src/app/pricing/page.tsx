'use client';

import { useState } from 'react';

const plans = [
  {
    name: 'Free',
    monthlyPrice: '₹0',
    yearlyPrice: '₹0',
    monthlyTotal: '',
    yearlyTotal: '',
    description: 'Get a taste of instant planning',
    topBadge: null,
    valueBadge: null,
    buttonText: 'Download Free →',
    buttonClass: 'bg-white/10 hover:bg-white/20 text-white',
    cardClass: 'border-white/10',
    stats: [
      { label: 'Prompts/day', value: '2/day' },
      { label: 'Messages/day', value: '1/day' },
      { label: 'Reschedules/month', value: '1/month' },
    ],
    features: [
      '2 Plan Generations per day',
      '1 Chat Message per day',
      'Productivity Score + 4-part breakdown',
      'Basic Progress Stats (%)',
      'No AI Suggestions (Elite+ only)',
      'Basic AI (Llama)',
      'Limited Input Length',
      'No Rescheduling',
      'Task Checklists',
      'No PDF Export',
      'No Image Analysis',
    ],
  },
  {
    name: 'Pro',
    monthlyPrice: '₹99',
    yearlyPrice: '₹83',
    monthlyTotal: '₹99/mo',
    yearlyTotal: '₹999/yr',
    description: 'For serious goal achievers',
    topBadge: null,
    valueBadge: 'Save 2+ hours/week on planning',
    buttonText: 'Get Pro →',
    buttonClass: 'bg-[#1E90FF] hover:bg-blue-600 text-white',
    cardClass: 'border-white/10',
    stats: [
      { label: 'Prompts/day', value: '4/day' },
      { label: 'Messages/day', value: '4/day' },
      { label: 'Reschedules/month', value: '3/month' },
    ],
    features: [
      '4 Plan Generations per day',
      '4 Chat Messages per day',
      '3 Reschedules per month',
      'Productivity Score + 4-part breakdown',
      'No AI Suggestions (Elite+ only)',
      'Standard AI (Gemini Flash Lite)',
      'Basic Checklists',
      'No PDF Export',
      'No Image Analysis',
    ],
  },
  {
    name: 'Elite',
    monthlyPrice: '₹129',
    yearlyPrice: '₹108',
    monthlyTotal: '₹129/mo',
    yearlyTotal: '₹1,299/yr',
    description: 'The SMART Choice. Best balance of time saved.',
    topBadge: 'MOST POPULAR',
    valueBadge: 'Save ~10 hours/month vs manual planning',
    buttonText: 'Get Elite →',
    buttonClass: 'bg-[#1E90FF] hover:bg-blue-600 text-white',
    cardClass: 'border-[#1E90FF]/50',
    stats: [
      { label: 'Prompts/day', value: '5/day' },
      { label: 'Messages/day', value: '15/day' },
      { label: 'Reschedules/month', value: '10/month' },
    ],
    features: [
      '5 Plan Generations per day',
      '15 Chat Messages per day',
      '10 Reschedules per month',
      'Productivity Score + 4-part breakdown',
      'AI Suggestions (Personalized)',
      'Advanced AI (Gemini Flash)',
      'Personalized AI Plans',
      'Full Task Lists',
      'Detailed Progress Analytics',
      'Limited PDF Export',
      'No Image Analysis',
      '2.5x more value than Pro for just ₹30 more',
    ],
  },
  {
    name: 'God',
    monthlyPrice: '₹249',
    yearlyPrice: '₹208',
    monthlyTotal: '₹249/mo',
    yearlyTotal: '₹2,499/yr',
    description: 'For heavy users managing multiple goals.',
    topBadge: 'MOST POWERFUL',
    valueBadge: '🎁 Try FREE for 3 days — No credit card needed',
    buttonText: 'Start Free Trial →',
    buttonClass: 'bg-gradient-to-r from-[#1E90FF] to-[#00C6FF] hover:opacity-90 text-white font-bold',
    cardClass: 'border-[#1E90FF]/50',
    stats: [
      { label: 'Prompts/day', value: 'Unlimited' },
      { label: 'Messages/day', value: 'Unlimited' },
      { label: 'Reschedules/month', value: 'Unlimited' },
    ],
    features: [
      'Unlimited Plan Generations',
      'Unlimited Chat Messages',
      'Unlimited Reschedules',
      'Productivity Score + 4-part breakdown',
      'AI Suggestions (Advanced)',
      'Premium AI (Grok 4.1)',
      'Personalized AI Plans',
      'Deep Analytics & Predictions',
      'Full PDF Export',
      'Image Uploads & Analysis',
      'Two-Factor Authentication (2FA)',
      'Priority Support',
    ],
  },
];

function getFeatureIcon(feature: string) {
  if (feature.startsWith('Limited ') || feature.includes('Limited ')) {
    return (
      <span className="w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 
                       flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-orange-400 text-xs font-bold leading-none">!</span>
      </span>
    );
  }
  if (feature.startsWith('No ')) {
    return (
      <span className="w-5 h-5 rounded-full bg-white/5 border border-white/15 
                       flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg className="w-2.5 h-2.5 text-white/25" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
        </svg>
      </span>
    );
  }
  return (
    <span className="w-5 h-5 rounded-full bg-[#1E90FF] flex items-center justify-center flex-shrink-0 mt-0.5">
      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

function getFeatureTextColor(feature: string) {
  if (feature.startsWith('No ')) return 'text-white/30';
  if (feature.startsWith('Limited ') || feature.includes('Limited ')) return 'text-orange-300';
  return 'text-white/80';
}

export default function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <main className="min-h-screen bg-[#0A0E23] text-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        
        <h1 className="text-4xl font-bold text-center mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-center text-[#A0AEC0] mb-8">
          Start free. Upgrade when you are ready. All plans available in the Android app.
        </p>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/5 border border-white/10 rounded-xl p-1 flex gap-1">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition ${
                billing === 'monthly'
                  ? 'bg-[#1E90FF] text-white'
                  : 'text-[#A0AEC0] hover:text-white'
              }`}>
              Monthly
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition ${
                billing === 'yearly'
                  ? 'bg-[#1E90FF] text-white'
                  : 'text-[#A0AEC0] hover:text-white'
              }`}>
              Yearly <span className="text-green-400 text-xs ml-1">Save 30%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16 items-start">
          {plans.map((plan) => (
            <div key={plan.name}
                 className={`relative bg-white/5 backdrop-blur border ${plan.cardClass} 
                             rounded-2xl p-6 flex flex-col`}>

              {/* Top Badge */}
              {plan.topBadge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 
                                bg-gradient-to-r from-[#1E90FF] to-[#00C6FF]
                                text-white text-xs font-bold px-4 py-1 
                                rounded-full whitespace-nowrap z-10">
                  {plan.topBadge}
                </div>
              )}

              {/* Plan Name */}
              <h2 className="text-2xl font-bold text-white mb-1">{plan.name}</h2>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-bold text-white">
                  {billing === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className="text-[#A0AEC0] text-sm">
                  {plan.name === 'Free' ? '' : '/mo'}
                </span>
              </div>

              {/* Yearly Price */}
              {plan.name !== 'Free' && (
                <p className="text-xs text-[#A0AEC0] mb-2">
                  {billing === 'yearly' 
                    ? `Billed as ${plan.yearlyTotal} — Save 30%`
                    : `or ${plan.yearlyTotal} — Save 30%`
                  }
                </p>
              )}

              {/* Description */}
              <p className="text-xs text-[#A0AEC0] italic mb-4">{plan.description}</p>

              {/* Value Badge */}
              {plan.valueBadge && (
                <div className={`mb-4 p-3 rounded-xl text-xs font-medium text-center leading-snug
                                ${plan.name === 'God'
                                  ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                                  : 'bg-[#1E90FF]/10 border border-[#1E90FF]/30 text-[#00C6FF]'}`}>
                  {plan.valueBadge}
                </div>
              )}

              {/* Stats */}
              <div className="space-y-2 pb-4 mb-4 border-b border-white/10">
                {plan.stats.map((stat) => (
                  <div key={stat.label} className="flex justify-between items-center">
                    <span className="text-[#A0AEC0] text-sm">{stat.label}</span>
                    <span className={`text-sm font-bold ${
                      stat.value === 'Unlimited' ? 'text-[#00C6FF]' : 'text-white'
                    }`}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="flex-1 mb-6">
                <p className="text-white font-bold text-sm mb-3">Features:</p>
                <ul className="space-y-2.5">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex gap-2.5 items-start">
                      {getFeatureIcon(feature)}
                      <span className={`text-xs leading-relaxed ${getFeatureTextColor(feature)}`}>
                        {feature.includes('2.5x more value') 
                          ? (billing === 'yearly' 
                              ? '2.5x more value than Pro for just ₹300 more per year'
                              : '2.5x more value than Pro for just ₹30 more')
                          : feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <a href="https://play.google.com/store/apps/details?id=cpm.planbot"
                 className={`block text-center text-sm py-3 px-4 
                             rounded-xl transition ${plan.buttonClass}`}>
                {plan.buttonText}
              </a>
            </div>
          ))}
        </div>

        {/* Boost Packs */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-2 text-center">One-Time Boost Packs</h2>
          <p className="text-center text-[#A0AEC0] text-sm mb-6">
            Need more today? Buy a one-time boost without changing your plan.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { name: 'Small Boost', price: '₹10', desc: '1 plan + 1 message' },
              { name: 'Medium Boost', price: '₹30', desc: '3 plans + 5 messages' },
              { name: 'Large Boost', price: '₹99', desc: '10 plans + 20 messages' },
              { name: 'Freeze Pack ❄️', price: '₹15', desc: '2 streak freezes' },
            ].map((pack) => (
              <div key={pack.name} className="p-4 bg-white/5 rounded-xl">
                <p className="font-bold text-sm text-white">{pack.name}</p>
                <p className="text-2xl font-bold text-[#1E90FF] my-1">{pack.price}</p>
                <p className="text-xs text-[#A0AEC0]">{pack.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'Can I use PlanBot on iPhone?',
                a: 'PlanBot is currently Android only. iOS support is planned for the future.',
              },
              {
                q: 'How does the God Trial work?',
                a: '3 days of full God tier features completely free. No credit card needed. Download the app to activate.',
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes. Manage your subscription through Google Play at any time.',
              },
              {
                q: 'Is there a refund policy?',
                a: 'Yes. View our full refund policy for details.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-bold mb-2 text-white">{item.q}</h3>
                <p className="text-[#A0AEC0] text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-[#A0AEC0] text-sm mb-8">
          All purchases made through Google Play. Download the app to subscribe.
        </p>

        <div className="text-center">
          <a href="https://play.google.com/store/apps/details?id=cpm.planbot"
             className="inline-block bg-gradient-to-r from-[#1E90FF] to-[#00C6FF] 
                        text-white font-bold px-8 py-4 rounded-2xl hover:opacity-90 transition">
            Download PlanBot Free →
          </a>
        </div>
      </div>
    </main>
  );
}
