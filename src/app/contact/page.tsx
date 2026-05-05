import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Contact PlanBot — Get in Touch',
  description: 'Contact the PlanBot team at PlannextTech for support, feedback, or business inquiries.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-4 sm:px-6 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Get in <span className="text-gradient">Touch</span>
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Have questions, feedback, or a business inquiry? We&apos;d love to hear from you.
        </p>
      </section>

      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="glass-card p-8">
            <h2 className="text-xl font-bold text-white mb-4">📧 Email Us</h2>
            <p className="text-text-secondary mb-4">For support, feedback, or business inquiries:</p>
            <a
              href="mailto:plannexttech@gmail.com"
              className="text-accent hover:underline text-lg font-medium"
            >
              plannexttech@gmail.com
            </a>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-xl font-bold text-white mb-4">📱 In-App Support</h2>
            <p className="text-text-secondary">
              The fastest way to get help is through the PlanBot app itself. Go to Settings → Help & Support inside the app.
            </p>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-xl font-bold text-white mb-4">🏢 About PlannextTech</h2>
            <p className="text-text-secondary">
              PlannextTech is the team behind PlanBot. We&apos;re based in India, building AI productivity tools for ambitious people.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
