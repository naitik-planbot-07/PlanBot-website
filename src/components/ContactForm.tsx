"use client";

import { useState } from 'react';
import { rtdb } from '@/lib/firebase';
import { ref, push, serverTimestamp } from 'firebase/database';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      topic: formData.get('topic') as string,
      message: formData.get('message') as string,
      createdAt: serverTimestamp(),
      source: 'website_contact'
    };

    try {
      // Save directly to Firebase Realtime Database
      const messagesRef = ref(rtdb, 'contact_messages');
      await push(messagesRef, data);
      
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error saving message:', error);
      setStatus('error');
    }
  };

  return (
    <div className="glass-card p-8">
      <h2 className="text-xl font-bold text-white mb-6">Send us a message</h2>
      
      {status === 'success' ? (
        <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-6 text-center">
          <p className="text-green-400 font-medium mb-2">Message sent successfully!</p>
          <p className="text-sm text-text-secondary">We will get back to you shortly.</p>
          <button 
            onClick={() => setStatus('idle')} 
            className="mt-4 text-sm text-accent hover:underline"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Your Name</label>
            <input type="text" name="name" required disabled={status === 'submitting'} className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent disabled:opacity-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Email Address</label>
            <input type="email" name="email" required disabled={status === 'submitting'} className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent disabled:opacity-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Topic</label>
            <select name="topic" required disabled={status === 'submitting'} className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent disabled:opacity-50">
              <option value="support">Technical Support</option>
              <option value="billing">Billing Inquiry</option>
              <option value="feedback">Feature Request / Feedback</option>
              <option value="business">Business / Partnership</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Message</label>
            <textarea name="message" required rows={4} disabled={status === 'submitting'} className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent disabled:opacity-50"></textarea>
          </div>
          
          {status === 'error' && (
            <p className="text-red-400 text-sm mt-2">There was an error sending your message. Please try again or email us directly.</p>
          )}
          
          <button 
            type="submit" 
            disabled={status === 'submitting'} 
            className="btn-primary w-full py-3 mt-2 disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {status === 'submitting' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
}
