'use client';

import { useState } from 'react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback if clipboard API fails
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="my-8 py-4 border-y border-white/10 flex flex-wrap items-center justify-between gap-4">
      <span className="text-sm font-medium text-text-secondary">Share this article:</span>
      <div className="flex items-center gap-3 flex-wrap">
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-colors"
          aria-label="Share on WhatsApp"
        >
          💬 WhatsApp
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0A66C2]/10 text-[#0A66C2] border border-[#0A66C2]/20 hover:bg-[#0A66C2]/20 transition-colors"
          aria-label="Share on LinkedIn"
        >
          💼 LinkedIn
        </a>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors"
          aria-label="Share on X Twitter"
        >
          𝕏 Post
        </a>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors cursor-pointer"
          aria-label="Copy link"
        >
          {copied ? '✅ Link Copied!' : '🔗 Copy Link'}
        </button>
      </div>
    </div>
  );
}
