import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Contact PlanBot — Get in Touch',
  // Bing Webmaster Fix: Optimized description length to 138 characters to satisfy search engine thresholds.
  description: 'Contact the PlanBot team at PlannextTech for support, feature requests, or business inquiries. We are here to help you optimize your schedule.',
  path: '/contact',
});

import StructuredData from '@/components/StructuredData';
import { createBreadcrumbSchema, SITE_URL } from '@/lib/seo';

export default function ContactPage() {
  return (
    <>
      <StructuredData data={{
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact PlanBot — Get in Touch',
        description: 'Contact the PlanBot team at PlannextTech for support, feature requests, or business inquiries. We are here to help you optimize your schedule.',
        url: `${SITE_URL}/contact`,
        mainEntity: {
          '@id': `${SITE_URL}/#organization`
        }
      }} />
      <StructuredData data={createBreadcrumbSchema([
        { name: 'Home', item: SITE_URL },
        { name: 'Contact', item: `${SITE_URL}/contact` },
      ])} />
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-4 sm:px-6 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Get in <span className="text-gradient">Touch</span>
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Have questions, feedback, or a business inquiry? We&apos;d love to hear from you.
        </p>
      </section>

      <section className="pb-20 px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="glass-card p-8">
                <h2 className="text-xl font-bold text-white mb-4">📧 Email Us</h2>
                <p className="text-text-secondary mb-4">For support, feedback, or business inquiries:</p>
                <a
                  href="mailto:plannexttech@gmail.com"
                  className="text-accent hover:underline text-lg font-medium"
                >
                  plannexttech@gmail.com
                </a>
                <p className="text-sm text-text-dim mt-4">We aim to respond to all inquiries within 24-48 business hours.</p>
              </div>

              <div className="glass-card p-8">
                <h2 className="text-xl font-bold text-white mb-4">🏢 Office Location</h2>
                <p className="text-text-secondary">
                  <strong>PlannextTech HQ</strong><br/>
                  Gujarat, India<br/>
                  <span className="text-sm mt-2 block text-text-dim">Available Mon-Fri, 9:00 AM - 6:00 PM IST</span>
                </p>
              </div>

              <div className="glass-card p-8">
                <h2 className="text-xl font-bold text-white mb-4">📱 In-App Support</h2>
                <p className="text-text-secondary">
                  The fastest way to get help is through the PlanBot app itself. Go to <strong>Settings &gt; Help &amp; Support</strong> inside the app.
                </p>
              </div>
            </div>

            <div className="glass-card p-8">
              <h2 className="text-xl font-bold text-white mb-6">Send us a message</h2>
              <form action="mailto:plannexttech@gmail.com" method="post" encType="text/plain" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Your Name</label>
                  <input type="text" name="name" required className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Email Address</label>
                  <input type="email" name="email" required className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Topic</label>
                  <select name="topic" className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent">
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Inquiry</option>
                    <option value="feedback">Feature Request / Feedback</option>
                    <option value="business">Business / Partnership</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Message</label>
                  <textarea name="message" required rows={4} className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent"></textarea>
                </div>
                <button type="submit" className="btn-primary w-full py-3 mt-2">Send Message</button>
              </form>
            </div>
          </div>
      </section>
    </>
  );
}
