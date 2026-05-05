import type { Metadata } from 'next';

const SITE_URL = 'https://planbot.com';
const SITE_NAME = 'PlanBot';

export function createMetadata({
  title,
  description,
  path = '',
  image = '/og-image.png',
  type = 'website',
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
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
};

export const mobileAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  name: 'PlanBot',
  operatingSystem: 'Android',
  applicationCategory: 'ProductivityApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  installUrl: 'https://play.google.com/store/apps/details?id=cpm.planbot',
  description:
    'PlanBot is an AI-powered daily planner app for Android that creates personalized plans using advanced AI technology.',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.5',
    ratingCount: '100',
  },
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PlannextTech',
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.png`,
  description:
    'PlannextTech builds productivity tools for ambitious people. PlanBot is our flagship AI planner app for Android.',
  sameAs: [
    'https://whatsapp.com/channel/0029Vb7U0vR8aKvH1quo1f3G',
    'https://www.instagram.com/planbotai',
  ],
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
}: {
  title: string;
  description: string;
  date: string;
  author: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'PlannextTech',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${slug}`,
    },
  };
}
