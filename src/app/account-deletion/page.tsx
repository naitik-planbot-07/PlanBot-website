import type { Metadata } from 'next';
import { createMetadata, createWebPageSchema, createBreadcrumbSchema } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = createMetadata({
  title: 'Account Deletion Policy — PlanBot',
  description: 'How to delete your PlanBot account and associated data. Step-by-step instructions for account removal.',
  path: '/account-deletion',
});

export default function AccountDeletionPage() {
  return (
    <>
      <StructuredData data={createWebPageSchema(
        'Account Deletion Policy — PlanBot',
        'How to delete your PlanBot account and associated data',
        'https://planbotai.app/account-deletion'
      )} />
      <StructuredData data={createBreadcrumbSchema([
        { name: 'Home', item: 'https://planbotai.app/' },
        { name: 'Account Deletion', item: 'https://planbotai.app/account-deletion' }
      ])} />

      <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-center">
            <span className="text-gradient">Account</span> Deletion
          </h1>
          <p className="text-text-secondary text-center mb-12">Learn how to manage your data and delete your account.</p>

          <div className="glass-card p-8 md:p-12 prose-planbot">
            <div className="aeo-answer mb-8">
              <p><strong>Your Right to Data Deletion:</strong> You have the right to request the deletion of your account and all associated personal data from PlanBot at any time.</p>
            </div>

            <h2>How to Delete Your Account</h2>
            <p>You can easily delete your account directly from within the PlanBot app:</p>
            
            <ol>
                <li>Open the PlanBot app on your Android device.</li>
                <li>Go to the <strong>Settings</strong> screen (often found in the profile or side menu).</li>
                <li>Scroll down and tap on <strong>Delete Account</strong>.</li>
                <li>You will be prompted to confirm your decision. Confirming will permanently delete your account.</li>
            </ol>

            <h2>What Happens When You Delete Your Account?</h2>
            <p>When you initiate an account deletion:</p>
            <ul>
                <li><strong>Immediate Removal:</strong> Your profile, study plans, schedules, and chat history are permanently deleted from our active databases.</li>
                <li><strong>No Recovery:</strong> This action is irreversible. You will not be able to recover your data once the account is deleted.</li>
                <li><strong>Subscriptions:</strong> Deleting your account <strong>does not</strong> automatically cancel any active Google Play subscriptions. You must manually cancel your subscription through the Google Play Store to avoid future charges.</li>
            </ul>

            <h2>Data Retention</h2>
            <p>While your personal data is deleted immediately from our active systems, some anonymized analytics data may be retained for aggregate performance monitoring, but it will no longer be linked to your identity.</p>

            <h2>Contact Support</h2>
            <p>If you no longer have access to the app or need assistance with deleting your account, please email our support team from the email address associated with your account:</p>
            <p><a href="mailto:plannexttech@gmail.com">plannexttech@gmail.com</a></p>
            <p>Please include &quot;Account Deletion Request&quot; in the subject line.</p>
          </div>
        </div>
      </section>
    </>
  );
}
