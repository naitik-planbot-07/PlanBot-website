import type { Metadata } from 'next';

export const SITE_URL = 'https://planbotai.app';
export const SITE_NAME = 'PlanBot';

// SEO Fix (August 2026 GSC Forensic Remediation):
// Standardized formatUrl to strictly return non-trailing-slash canonical URLs (e.g. https://planbotai.app)
// to align with Firebase Hosting cleanUrls/trailingSlash:false and eliminate "Page with redirect" errors.
export function formatUrl(pathOrUrl: string): string {
  if (!pathOrUrl || pathOrUrl === '/' || pathOrUrl === SITE_URL || pathOrUrl === `${SITE_URL}/`) {
    return SITE_URL;
  }
  let url = pathOrUrl.startsWith('http') ? pathOrUrl : `${SITE_URL}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`;
  while (url.endsWith('/') && url !== SITE_URL) {
    url = url.slice(0, -1);
  }
  return url;
}

export function createMetadata({
  title,
  description,
  path = '',
  image = '/logo.jpg',
  type = 'website',
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: string;
}): Metadata {
  const url = formatUrl(path);

  // Bing Webmaster Fix (August 2026): Cap description at 160 chars and prevent double-appending brand in title.
  const formatDesc = (descStr: string) => {
    if (!descStr || descStr.length <= 160) return descStr;
    const trimmed = descStr.slice(0, 157);
    const lastSpace = trimmed.lastIndexOf(' ');
    const finalTrimmed = lastSpace > 100 ? trimmed.slice(0, lastSpace) : trimmed;
    return finalTrimmed.replace(/[.,\s]+$/, '') + '...';
  };
  const safeDescription = formatDesc(description);

  // If title has '| PlanBot' or length > 60 chars, use absolute title capped at 65 chars.
  let safeTitle: string | { absolute: string } = title;
  if (title.includes('| PlanBot') || title.length > 60) {
    const cleanTitle = title.length > 65 ? title.slice(0, 62) + '...' : title;
    safeTitle = { absolute: cleanTitle };
  }

  return {
    title: safeTitle,
    description: safeDescription,
    openGraph: {
      title,
      description: safeDescription,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1024, height: 1024, alt: title }],
      type: type as 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: safeDescription,
    },
    // SEO Fix (August 2026 GSC Fix):
    // Explicitly define canonical and all language alternates (en-US, en-IN, x-default) pointing to this page's URL.
    // This stops Googlebot from inheriting root-level '/' defaults and resolving "Duplicate, Google chose different canonical than user".
    alternates: {
      canonical: url,
      languages: {
        'en-US': url,
        'en-IN': url,
        'x-default': url,
      },
    },
  };
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'PlanBot',
  url: SITE_URL,
  description:
    'PlanBot is an Android productivity app by PlannextTech that uses advanced AI to generate personalized daily plans. Rated among the best productivity planners for students, it also scales perfectly for office productivity and enterprise time management worldwide.',
  publisher: {
    '@id': `${SITE_URL}/#organization`,
  },
  // SEO Fix: Removed SearchAction potentialAction schema because the website is static and lacks an internal search engine.
  // This prevents Googlebot from crawling template search query URLs like /?s={search_term_string}.
};

export const mobileAppSchema = {
  '@context': 'https://schema.org',
  '@type': ['SoftwareApplication', 'MobileApplication'],
  '@id': `${SITE_URL}/#app`,
  name: 'PlanBot',
  operatingSystem: 'Android',
  applicationCategory: 'ProductivityApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
  },
  installUrl: 'https://play.google.com/store/apps/details?id=cpm.planbot',
  description:
    'PlanBot is an AI-powered daily planner app for Android that creates personalized plans using advanced AI technology. Perfect for students, professionals, and athletes.',
  author: {
    '@id': `${SITE_URL}/#organization`,
  },
  publisher: {
    '@id': `${SITE_URL}/#organization`,
  },
  featureList: [
    'AI Schedule Generation',
    'Daily Routine Optimization',
    'Task Automation',
    'Time Management Assistant',
    'Gamified Productivity',
  ],
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'PlannextTech',
  alternateName: 'PlanBot Team',
  url: SITE_URL,
  areaServed: { '@type': 'Country', 'name': 'Worldwide' },
  logo: `${SITE_URL}/android-chrome-512x512.png`,
  description:
    'PlannextTech builds advanced AI productivity tools and scheduling systems for ambitious individuals. PlanBot is our flagship AI daily planner app for Android, designed to optimize time management and routine generation.',
  founder: {
    '@type': 'Person',
    name: 'Naitik Baldaniya',
    jobTitle: 'Founder & CEO',
    url: `${SITE_URL}/about`,
      sameAs: [
        'https://www.linkedin.com/in/naitik-baldaniya-b0079234a',
        'https://www.instagram.com/planbotai?igsh=bXplYm92dG13c3Jq',
        'https://x.com/planbotai'
      ],
    description: 'Productivity systems architect and software developer specializing in AI-driven scheduling algorithms and Spaced Repetition Systems.',
    knowsAbout: [
      'AI Planning',
      'Time Management',
      'Student Productivity',
      'Study Planning',
      'JEE Preparation',
      'NEET Preparation',
      'UPSC Preparation',
      'Task Automation',
      'Goal Setting',
      'Focus Systems',
      'Habit Formation',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'PlannextTech',
      url: SITE_URL,
    },
  },
  sameAs: [
    'https://whatsapp.com/channel/0029Vb7U0vR8aKvH1quo1f3G',
    'https://www.instagram.com/planbotai?igsh=bXplYm92dG13c3Jq',
    'https://play.google.com/store/apps/details?id=cpm.planbot',
    'https://x.com/planbotai',
    'https://youtube.com/@planbotai',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'plannexttech@gmail.com',
    contactType: 'customer support',
    availableLanguage: ['English', 'Hindi']
  }
};

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Naitik Baldaniya',
  jobTitle: 'Founder & CEO',
  birthDate: '2009-08-28',
  image: `${SITE_URL}/images/naitik-baldaniya.jpg`,
  url: `${SITE_URL}/author/naitik-baldaniya`,
  sameAs: [
    'https://www.linkedin.com/in/naitik-baldaniya-b0079234a',
    'https://www.instagram.com/planbotai?igsh=bXplYm92dG13c3Jq',
    'https://x.com/planbotai',
    'https://x.com/Naitikbaldaniya',
    'https://youtube.com/@planbotai'
  ],
  worksFor: {
    '@id': `${SITE_URL}/#organization`
  }
};

export function createFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function createArticleSchema({
  title,
  description,
  date,
  updated,
  author,
  slug,
  image = '/logo.jpg',
}: {
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: { name: string; url?: string };
  slug: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    datePublished: date,
    dateModified: updated || date,
    author: {
      '@type': 'Person',
      name: author.name,
      url: author.url || formatUrl('/author/naitik-baldaniya'),
    },
    publisher: {
      '@id': `${SITE_URL}/#organization`,
      '@type': 'Organization',
      name: 'PlanBot',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/android-chrome-512x512.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': formatUrl(`/blog/${slug}`),
    },
  };
}

export function createBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: formatUrl(breadcrumb.item),
    })),
  };
}

export function createWebPageSchema(title: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: formatUrl(url),
  };
}

export function createSpeakableSchema(url: string, name: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: name,
    url: formatUrl(url),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.aeo-answer', '.tl-dr'],
    },
  };
}

export function createHowToSchema(opts: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string; url?: string }>;
  totalTime?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description,
    totalTime: opts.totalTime,
    step: opts.steps.map((step, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: step.name,
      text: step.text,
      url: step.url,
    })),
  };
}

export function createWebApplicationSchema(name: string, url: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    url: formatUrl(url),
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description,
  };
}

export function createItemListSchema(items: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((url, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: formatUrl(url),
    })),
  };
}
