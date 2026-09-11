import type { Metadata } from 'next';
import { createMetadata, createWebApplicationSchema, createFAQSchema, createWebPageSchema, createBreadcrumbSchema, createHowToSchema, SITE_URL } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = createMetadata({
  title: 'Pomodoro & Deep Work Focus Calculator | PlanBot',
  description: 'Calculate optimal focus sprints, rest intervals, and cognitive energy curves using Pomodoro, 50/10, or 90/20 Ultradian rhythms. 100% free.',
  path: '/tools/pomodoro-focus-calculator',
});

const faqData = [
  {
    question: 'Is 25 minutes (Pomodoro) the best focus time?',
    answer: "The 25/5 Pomodoro method is great for beginners and for highly repetitive tasks. However, for deep cognitive work like coding, writing, or studying complex math, a 50/10 or 90/20 Ultradian sprint allows your brain to enter a state of deep flow."
  },
  {
    question: 'How long should a deep work sprint be?',
    answer: "A deep work sprint should typically be 50 to 90 minutes. Neurobiology shows that the human brain operates on 90-minute Ultradian rhythms. After 90 minutes of intense focus, a 20-30 minute active rest period is required to consolidate learning."
  },
  {
    question: 'What should I do during a Pomodoro break?',
    answer: "True rest requires disconnecting from high-dopamine activities. Step away from your desk, stretch, drink water, or stare at something in the distance. Do not check social media, read emails, or watch short-form videos."
  }
];

export default function PomodoroCalculatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={createWebApplicationSchema('Pomodoro & Deep Work Focus Calculator', '/tools/pomodoro-focus-calculator', 'Calculate optimal focus sprints, rest intervals, and cognitive energy curves using Pomodoro, 50/10, or 90/20 Ultradian rhythms.')} />
      <StructuredData data={createWebPageSchema(
        'Pomodoro & Deep Work Focus Calculator | PlanBot',
        'Calculate optimal focus sprints, rest intervals, and cognitive energy curves using Pomodoro, 50/10, or 90/20 Ultradian rhythms. 100% free.',
        `${SITE_URL}/tools/pomodoro-focus-calculator`
      )} />
      <StructuredData data={createBreadcrumbSchema([
        { name: 'Home', item: SITE_URL },
        { name: 'Free Tools', item: `${SITE_URL}/tools` },
        { name: 'Pomodoro Calculator', item: `${SITE_URL}/tools/pomodoro-focus-calculator` },
      ])} />
      <StructuredData data={createHowToSchema({
        name: 'How to Calculate Your Ideal Focus Sprints',
        description: 'Find the optimal balance between deep work and rest intervals.',
        steps: [
          { name: 'Select Framework', text: 'Choose between Pomodoro (25/5), 50/10, or 90/20 (Ultradian).' },
          { name: 'Set Session Length', text: 'Determine how many total hours you plan to work.' },
          { name: 'Review Timings', text: 'The calculator will output exactly when to start working and when to rest.' }
        ]
      })} />
      <StructuredData data={createFAQSchema(faqData)} />
      {children}
    </>
  );
}
