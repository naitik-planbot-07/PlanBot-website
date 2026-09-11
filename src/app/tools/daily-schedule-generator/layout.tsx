import type { Metadata } from 'next';
import { createMetadata, createWebApplicationSchema, createFAQSchema, createWebPageSchema, createBreadcrumbSchema, createHowToSchema, SITE_URL } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = createMetadata({
  title: 'Free AI Daily Schedule Generator – Plan in 30s',
  description: 'Generate a color-coded daily timetable from your wake time, energy peaks & goals. AI time-blocking, 100% free, no install — plan your day in seconds.',
  path: '/tools/daily-schedule-generator',
});

const faqData = [
  {
    question: 'How do I create a daily routine that I can actually stick to?',
    answer: "The secret is energy matching, not just time blocking. If you schedule deep work during your natural energy dip, you will procrastinate. The AI daily schedule generator aligns your hardest tasks with your specified energy peak."
  },
  {
    question: 'Is it better to plan hour-by-hour or use broad time blocks?',
    answer: "Broad time blocks are statistically more successful. Hour-by-hour planning creates a rigid structure that breaks upon the first interruption. The schedule generator groups activities into 90-120 minute blocks to allow for flexibility and deep focus."
  },
  {
    question: 'How many hours of deep work can a person do per day?',
    answer: "Cognitive science suggests the absolute limit for intense deep work is about 4 hours per day. Any schedule attempting 8+ hours of 'deep work' will result in burnout or shallow work masquerading as deep work."
  }
];

export default function DailyScheduleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={createWebApplicationSchema('Free AI Daily Schedule Generator', '/tools/daily-schedule-generator', 'Generate a color-coded daily timetable from your wake time, energy peaks & goals.')} />
      <StructuredData data={createWebPageSchema(
        'Free AI Daily Schedule Generator – Plan in 30s',
        'Generate a color-coded daily timetable from your wake time, energy peaks & goals. AI time-blocking, 100% free, no install — plan your day in seconds.',
        `${SITE_URL}/tools/daily-schedule-generator`
      )} />
      <StructuredData data={createBreadcrumbSchema([
        { name: 'Home', item: SITE_URL },
        { name: 'Free Tools', item: `${SITE_URL}/tools` },
        { name: 'Daily Schedule Generator', item: `${SITE_URL}/tools/daily-schedule-generator` },
      ])} />
      <StructuredData data={createHowToSchema({
        name: 'How to Generate Your Perfect Daily Schedule',
        description: 'Create a customized, energy-aligned daily timetable in seconds.',
        steps: [
          { name: 'Set Your Boundaries', text: 'Enter your typical wake up and sleep times.' },
          { name: 'Select Your Persona', text: 'Choose if you are a student, professional, or freelancer to get tailored categories.' },
          { name: 'Identify Peak Energy', text: 'Select the time of day when you feel most focused and alert.' },
          { name: 'Generate Plan', text: 'Click Generate to create a color-coded, realistic daily routine.' }
        ]
      })} />
      <StructuredData data={createFAQSchema(faqData)} />
      {children}
    </>
  );
}
