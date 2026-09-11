import type { Metadata } from 'next';
import { createMetadata, createWebApplicationSchema, createFAQSchema, createWebPageSchema, createBreadcrumbSchema, createHowToSchema, SITE_URL } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = createMetadata({
  title: 'AI Weather Forecast & Routine Planner | PlanBot',
  description: '10-day precision weather tracker with AI-generated daily routine advisories. Optimize your morning commute and deep work around rain probability and UV index.',
  path: '/tools/weather-forecast',
});

const faqData = [
  {
    question: 'How accurate is the 10-day weather forecast?',
    answer: "The 10-day forecast utilizes the Open-Meteo API, which aggregates data from national weather services including NOAA, DWD, and ECMWF for highly precise, hyper-local meteorological predictions."
  },
  {
    question: 'How does weather impact daily productivity?',
    answer: "Barometric pressure changes, high humidity, and lack of sunlight (SAD) significantly impact cognitive function and energy levels. The AI routine planner analyzes these atmospheric conditions to recommend the optimal times for deep work versus shallow administrative tasks."
  },
  {
    question: 'Can I generate a daily schedule based on the weather?',
    answer: "Yes, the AI Weather Routine Advisory analyzes the current temperature, rain probability, and wind speed to suggest when you should commute, when you should exercise outdoors, and when you should lock in for uninterrupted indoor deep work."
  }
];

export default function WeatherForecastLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={createWebApplicationSchema('AI Weather Forecast & Routine Planner', '/tools/weather-forecast', '10-day precision weather tracker with AI-generated daily routine advisories.')} />
      <StructuredData data={createWebPageSchema(
        'AI Weather Forecast & Routine Planner | PlanBot',
        '10-day precision weather tracker with AI-generated daily routine advisories. Optimize your morning commute and deep work around rain probability and UV index.',
        `${SITE_URL}/tools/weather-forecast`
      )} />
      <StructuredData data={createBreadcrumbSchema([
        { name: 'Home', item: SITE_URL },
        { name: 'Free Tools', item: `${SITE_URL}/tools` },
        { name: 'Weather Forecast & Routine Planner', item: `${SITE_URL}/tools/weather-forecast` },
      ])} />
      <StructuredData data={createHowToSchema({
        name: 'How to Optimize Your Routine Around the Weather',
        description: 'Use hyper-local weather data to schedule your deep work and outdoor activities.',
        steps: [
          { name: 'Enter Your Location', text: 'Search for your city or click the GPS icon to auto-detect your location.' },
          { name: 'Review Current Conditions', text: 'Check the temperature, apparent temperature, and rain probability.' },
          { name: 'Analyze the Hourly Forecast', text: 'Identify blocks of clear weather for your commute or exercise.' },
          { name: 'Generate AI Advisory', text: 'Read the AI-generated routine suggestions to align your deep work blocks with poor outdoor weather.' }
        ]
      })} />
      <StructuredData data={createFAQSchema(faqData)} />
      {children}
    </>
  );
}
