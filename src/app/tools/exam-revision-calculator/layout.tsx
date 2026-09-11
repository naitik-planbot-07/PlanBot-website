import type { Metadata } from 'next';
import { createMetadata, createWebApplicationSchema, createFAQSchema, createWebPageSchema, createBreadcrumbSchema, createHowToSchema, SITE_URL } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = createMetadata({
  title: 'Exam Revision & Study Schedule Calculator | PlanBot',
  description: 'Calculate daily subject distribution, spaced repetition cycles, and mock test pacing for JEE, NEET, UPSC, CAT, GATE, and Board Exams. 100% free.',
  path: '/tools/exam-revision-calculator',
});

const faqData = [
  {
    question: 'How many hours a day should I study for JEE or NEET?',
    answer: "Quality beats quantity. Research shows that 6 to 8 hours of highly concentrated deep work is more effective than 14 hours of distracted studying. Use the calculator above to distribute 8 hours effectively, ensuring you include adequate sleep and active recall sessions. PlanBot's God Tier can also help analyze your peak diurnal focus times."
  },
  {
    question: 'Should I study one subject a day or multiple subjects?',
    answer: "Studying multiple subjects a day (interleaving) is scientifically proven to improve long-term retention compared to studying a single subject (blocking). The exam revision calculator automatically splits your daily hours across 3 subjects to prevent cognitive fatigue and keep your brain actively engaged."
  },
  {
    question: 'How often should I take full-length mock tests?',
    answer: "If your exam is more than 6 months away, one mock test every two weeks is sufficient. If the exam is 1 to 3 months away, you should increase this to 1 or 2 mock tests per week. Always allocate at least 2 hours post-test for deep analysis of your mistakes to populate your error log."
  }
];

export default function ExamRevisionLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={createWebApplicationSchema('Exam Revision & Study Schedule Calculator', '/tools/exam-revision-calculator', 'Calculate daily subject distribution, spaced repetition cycles, and mock test pacing for JEE, NEET, UPSC, CAT, GATE, and Board Exams.')} />
      <StructuredData data={createWebPageSchema(
        'Exam Revision & Study Schedule Calculator | PlanBot',
        'Calculate daily subject distribution, spaced repetition cycles, and mock test pacing for JEE, NEET, UPSC, CAT, GATE, and Board Exams. 100% free.',
        `${SITE_URL}/tools/exam-revision-calculator`
      )} />
      <StructuredData data={createBreadcrumbSchema([
        { name: 'Home', item: SITE_URL },
        { name: 'Free Tools', item: `${SITE_URL}/tools` },
        { name: 'Exam Revision Calculator', item: `${SITE_URL}/tools/exam-revision-calculator` },
      ])} />
      <StructuredData data={createHowToSchema({
        name: 'How to Use the Exam Revision Calculator',
        description: 'Calculate your exact study hours and subject split for JEE, NEET, or UPSC exams.',
        steps: [
          { name: 'Select Your Exam Target', text: 'Choose your exam type (JEE/NEET/UPSC/CAT).' },
          { name: 'Input Study Hours', text: 'Enter the number of hours you can realistically study each day.' },
          { name: 'Identify Weaknesses', text: 'Select the subject or area that needs the most improvement.' },
          { name: 'Generate Study Plan', text: 'Click Calculate to get your exact hour distribution and spaced repetition schedule.' }
        ]
      })} />
      <StructuredData data={createFAQSchema(faqData)} />
      {children}
    </>
  );
}
