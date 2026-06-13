import type { Metadata } from 'next';

export const SITE_URL = 'https://planbotai.app';
export const SITE_NAME = 'PlanBot';

export function formatUrl(pathOrUrl: string): string {
  if (!pathOrUrl || pathOrUrl === '/') return `${SITE_URL}/`;
  let url = pathOrUrl.startsWith('http') ? pathOrUrl : `${SITE_URL}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`;
  if (!url.endsWith('/')) {
    url += '/';
  }
  return url;
}

export function createMetadata({
  title,
  description,
  path = '',
  image = '/logo.png',
  type = 'website',
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: string;
}): Metadata {
  const url = formatUrl(path);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: 'en_IN',
      type: type as 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'PlanBot',
  url: SITE_URL,
  description:
    'PlanBot is an Android productivity app by PlannextTech that uses advanced AI to generate personalized daily plans for students, professionals, and athletes in India.',
  publisher: {
    '@type': 'Organization',
    name: 'PlannextTech',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/?s={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export const mobileAppSchema = {
  '@context': 'https://schema.org',
  '@type': ['SoftwareApplication', 'MobileApplication'],
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
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '342',
  },
  author: {
    '@type': 'Organization',
    name: 'PlannextTech',
    url: SITE_URL,
  },
  publisher: {
    '@type': 'Organization',
    name: 'PlannextTech',
    url: SITE_URL,
  },
  featureList: [
    'AI Schedule Generation',
    'Daily Routine Optimization',
    'Task Automation',
    'Time Management Assistant',
    'Gamified Productivity',
  ],
  review: [
    {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: 'Android User',
      },
      reviewBody: 'The AI planning feature is amazing and saves me hours of scheduling. Best study planner app.',
    },
  ],
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PlannextTech',
  alternateName: 'PlanBot Team',
  url: SITE_URL,
  logo: `${SITE_URL}/android-chrome-512x512.png`,
  description:
    'PlannextTech builds advanced AI productivity tools and scheduling systems for ambitious individuals. PlanBot is our flagship AI daily planner app for Android, designed to optimize time management and routine generation.',
  // SEO/GEO Fix #4 — Enhanced Founder E-E-A-T schema
  // WHY: LLMs weigh 'knowsAbout' heavily when deciding what to cite.
  // Adding topical authority markers dramatically increases AI citation likelihood.
  founder: {
    '@type': 'Person',
    name: 'Naitik Baldaniya',
    jobTitle: 'Founder & CEO',
    url: `${SITE_URL}/about`,
    sameAs: [
      'https://www.instagram.com/planbotai',
      // TODO: Add LinkedIn, GitHub, Crunchbase URLs when available
      // 'https://www.linkedin.com/in/naitikbaldaniya',
      // 'https://github.com/naitikbaldaniya',
    ],
    description: 'Productivity expert and software developer dedicated to building AI-driven scheduling and focus systems.',
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
    'https://www.instagram.com/planbotai',
    'https://play.google.com/store/apps/details?id=cpm.planbot',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'plannexttech@gmail.com',
    contactType: 'customer support',
    availableLanguage: ['English', 'Hindi']
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
  author,
  slug,
  image = '/logo.png',
}: {
  title: string;
  description: string;
  date: string;
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
    dateModified: date,
    author: {
      '@type': 'Person',
      name: author.name,
      url: author.url || formatUrl(`/authors/${author.name.toLowerCase().replace(/ /g, '-')}`),
    },
    publisher: {
      '@type': 'Organization',
      name: 'PlannextTech',
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

/**
 * Phase 2 Fix #6 — Speakable Schema (AEO/Voice search optimization)
 * 
 * WHY: Speakable tells Google Assistant and voice-search engines which parts
 * of the page to read aloud. Targets .aeo-answer and .tl-dr blocks we add
 * to every blog post, plus headings for context.
 */
export function createSpeakableSchema(url: string, name: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: name,
    url: formatUrl(url),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.aeo-answer', '.tl-dr', 'h1', 'h2', 'h3', 'strong'],
    },
  };
}

/**
 * Phase 2 Fix #7 — HowTo Schema (tutorial/step-by-step structured data)
 * 
 * WHY: HowTo schema enables rich results in Google Search for tutorial content.
 * Especially important for "how to create JEE study plan" type queries.
 */
export function createHowToSchema(opts: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string; url?: string }>;
  totalTime?: string; // ISO 8601 e.g. "PT10M"
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
