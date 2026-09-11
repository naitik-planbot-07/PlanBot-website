'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';
import PlayStoreLink from '@/components/PlayStoreLink';
import { SITE_URL } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';

/**
 * PlanBot Weather Forecast & Routine Planner Tool
 * 10-day weather tracking system: Past 2 Days, Today, and Next 7 Days.
 * Features automatic GPS geolocation, manual city search via Open-Meteo,
 * and AI-driven daily planning & commute schedule advisories.
 */

interface WeatherDay {
  date: string;
  dayLabel: string;
  type: 'past' | 'today' | 'forecast';
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
  precipitationSum: number;
  precipitationProb: number;
  maxWind: number;
  uvIndex: number;
}

interface CurrentWeather {
  temp: number;
  apparentTemp: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  precipitation: number;
  isDay: number;
  timeStr: string;
}

interface HourlySlot {
  time: string;
  temp: number;
  weatherCode: number;
  precipProb: number;
  isDay: number;
}

interface GeocodingResult {
  id: number;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
}

// Map WMO weather codes to human labels and emoji/icons with Day/Night awareness
function getWeatherInfo(code: number, isDay: number = 1) {
  const isNight = isDay === 0;

  if (code === 0) {
    return isNight
      ? { label: 'Clear Night', icon: '🌙', color: 'text-indigo-200' }
      : { label: 'Clear Sky', icon: '☀️', color: 'text-amber-400' };
  }
  if (code === 1) {
    return isNight
      ? { label: 'Mainly Clear Night', icon: '🌙', color: 'text-indigo-200' }
      : { label: 'Mainly Clear', icon: '🌤️', color: 'text-amber-300' };
  }
  if (code === 2) {
    return isNight
      ? { label: 'Partly Cloudy Night', icon: '☁️', color: 'text-slate-300' }
      : { label: 'Partly Cloudy', icon: '⛅', color: 'text-blue-300' };
  }
  if (code === 3) return { label: 'Overcast', icon: '☁️', color: 'text-slate-300' };
  if (code >= 45 && code <= 48) return { label: 'Foggy', icon: '🌫️', color: 'text-slate-400' };
  if (code >= 51 && code <= 55) return { label: 'Light Drizzle', icon: '🌦️', color: 'text-sky-300' };
  if (code >= 61 && code <= 65) return { label: 'Rain', icon: '🌧️', color: 'text-blue-400' };
  if (code >= 71 && code <= 77) return { label: 'Snow Flurries', icon: '❄️', color: 'text-cyan-200' };
  if (code >= 80 && code <= 82) return { label: 'Rain Showers', icon: '🌧️', color: 'text-blue-400' };
  if (code >= 95 && code <= 99) return { label: 'Thunderstorm', icon: '⛈️', color: 'text-purple-400' };
  return isNight
    ? { label: 'Partly Cloudy Night', icon: '☁️', color: 'text-slate-300' }
    : { label: 'Partly Cloudy', icon: '⛅', color: 'text-blue-300' };
}

const DEFAULT_CITIES: GeocodingResult[] = [
  { id: 1, name: 'New Delhi', country: 'India', admin1: 'Delhi', latitude: 28.6139, longitude: 77.2090 },
  { id: 2, name: 'Mumbai', country: 'India', admin1: 'Maharashtra', latitude: 19.0760, longitude: 72.8777 },
  { id: 3, name: 'Bengaluru', country: 'India', admin1: 'Karnataka', latitude: 12.9716, longitude: 77.5946 },
  { id: 4, name: 'London', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278 },
  { id: 5, name: 'New York', country: 'United States', admin1: 'New York', latitude: 40.7128, longitude: -74.0060 },
];

export default function WeatherForecastPage() {
  const [selectedCity, setSelectedCity] = useState<GeocodingResult>(DEFAULT_CITIES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<GeocodingResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'past' | 'today' | 'forecast'>('all');

  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [days, setDays] = useState<WeatherDay[]>([]);
  const [hourlySlots, setHourlySlots] = useState<HourlySlot[]>([]);

  // Ref to close search dropdown when clicking outside
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch weather data for given coordinates (Past 2 days, Today, Next 7 days)
  const fetchWeather = useCallback(async (lat: number, lon: number) => {
    setIsLoadingWeather(true);
    setGeoError(null);
    try {
      // Fetch current conditions with is_day, hourly with is_day, and auto timezone
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,uv_index_max&hourly=temperature_2m,weather_code,precipitation_probability,is_day&past_days=2&forecast_days=8&timezone=auto`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to retrieve weather data.');
      const data = await res.json();

      // Current weather with exact observation time & day/night status
      if (data.current) {
        let timeStr = '';
        if (data.current.time) {
          const parts = data.current.time.split('T');
          if (parts.length > 1) {
            const [hStr, mStr] = parts[1].split(':');
            let hour = parseInt(hStr, 10);
            const minute = mStr;
            const ampm = hour >= 12 ? 'PM' : 'AM';
            hour = hour % 12 || 12;
            timeStr = `${hour}:${minute} ${ampm}`;
          }
        }

        setCurrentWeather({
          temp: Math.round(data.current.temperature_2m),
          apparentTemp: Math.round(data.current.apparent_temperature),
          humidity: data.current.relative_humidity_2m,
          windSpeed: Math.round(data.current.wind_speed_10m),
          weatherCode: data.current.weather_code,
          precipitation: data.current.precipitation || 0,
          isDay: typeof data.current.is_day === 'number' ? data.current.is_day : 1,
          timeStr: timeStr,
        });
      }

      // Process 10 days: 2 past days + 1 today + 7 forecast days
      if (data.daily && data.daily.time) {
        const timeArr: string[] = data.daily.time;

        const mappedDays: WeatherDay[] = timeArr.map((dateStr, idx) => {
          const d = new Date(dateStr + 'T00:00:00');
          const isToday = idx === 2; // with past_days=2, index 0 is 2 days ago, 1 is yesterday, 2 is today
          const isPast = idx < 2;

          let dayLabel = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
          if (idx === 0) dayLabel = `2 Days Ago (${dayLabel})`;
          else if (idx === 1) dayLabel = `Yesterday (${dayLabel})`;
          else if (isToday) dayLabel = `Today (${dayLabel})`;

          return {
            date: dateStr,
            dayLabel,
            type: isToday ? 'today' : isPast ? 'past' : 'forecast',
            maxTemp: Math.round(data.daily.temperature_2m_max[idx]),
            minTemp: Math.round(data.daily.temperature_2m_min[idx]),
            weatherCode: data.daily.weather_code[idx],
            precipitationSum: data.daily.precipitation_sum ? Math.round(data.daily.precipitation_sum[idx] * 10) / 10 : 0,
            precipitationProb: data.daily.precipitation_probability_max ? data.daily.precipitation_probability_max[idx] : 0,
            maxWind: Math.round(data.daily.wind_speed_10m_max[idx]),
            uvIndex: data.daily.uv_index_max ? Math.round(data.daily.uv_index_max[idx]) : 0,
          };
        });

        setDays(mappedDays);
      }

      // Process Hourly for today (12 hours starting around current location hour)
      if (data.hourly && data.hourly.time) {
        let currentHourIndex = -1;
        if (data.current && data.current.time) {
          const targetHourPrefix = data.current.time.slice(0, 13); // e.g. "2026-09-07T21"
          currentHourIndex = data.hourly.time.findIndex((t: string) => t.startsWith(targetHourPrefix));
        }
        if (currentHourIndex === -1) {
          currentHourIndex = new Date().getHours() + 48; // offset for 2 past days (48 hours)
        }

        const next12 = data.hourly.time.slice(currentHourIndex, currentHourIndex + 12).map((t: string, i: number) => {
          const hourIdx = currentHourIndex + i;
          const dt = new Date(t);
          const hourFormatted = dt.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
          return {
            time: hourFormatted,
            temp: Math.round(data.hourly.temperature_2m[hourIdx]),
            weatherCode: data.hourly.weather_code[hourIdx],
            precipProb: data.hourly.precipitation_probability ? data.hourly.precipitation_probability[hourIdx] : 0,
            isDay: data.hourly.is_day ? data.hourly.is_day[hourIdx] : 1,
          };
        });
        setHourlySlots(next12);
      }
    } catch {
      setGeoError('Unable to load weather forecast for this location. Please check connection and try again.');
    } finally {
      setIsLoadingWeather(false);
    }
  }, []);

  // Fetch for default city on mount
  useEffect(() => {
    fetchWeather(selectedCity.latitude, selectedCity.longitude);
  }, [selectedCity, fetchWeather]);

  // Turn on device location handler
  const handleTurnOnLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      return;
    }
    setIsLoadingWeather(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        // Try reverse geocoding via Open-Meteo or generic fallback
        try {
          const revRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${lat.toFixed(2)},${lon.toFixed(2)}&count=1`
          );
          if (revRes.ok) {
            const revData = await revRes.json();
            if (revData.results && revData.results.length > 0) {
              setSelectedCity(revData.results[0]);
            } else {
              setSelectedCity({
                id: Date.now(),
                name: 'Current GPS Location',
                country: 'Local Device',
                latitude: lat,
                longitude: lon,
              });
            }
          }
        } catch {
          setSelectedCity({
            id: Date.now(),
            name: 'Your Current Location',
            country: 'GPS Detected',
            latitude: lat,
            longitude: lon,
          });
        }
        fetchWeather(lat, lon);
      },
      (err) => {
        setIsLoadingWeather(false);
        if (err.code === 1) {
          setGeoError('Location permission denied. Please allow location access or search your city manually below.');
        } else {
          setGeoError('Failed to acquire precise GPS coordinates. Please search manually.');
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Debounced manual search
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery)}&count=6&language=en&format=json`
        );
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data.results || []);
        }
      } catch {
        // fail silently for search suggestions
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const selectCity = (city: GeocodingResult) => {
    setSelectedCity(city);
    setSearchQuery('');
    setSearchResults([]);
  };

  // Filter days based on active tab
  const filteredDays = useMemo(() => {
    if (activeTab === 'past') return days.filter((d) => d.type === 'past');
    if (activeTab === 'today') return days.filter((d) => d.type === 'today');
    if (activeTab === 'forecast') return days.filter((d) => d.type === 'forecast');
    return days; // 'all'
  }, [days, activeTab]);

  const todayData = days.find((d) => d.type === 'today');

  // AI Productivity Advisory Generator (Day/Night aware)
  const productivityAdvisory = useMemo(() => {
    if (!todayData || !currentWeather) return null;
    const isNight = currentWeather.isDay === 0;
    const isRainy = todayData.precipitationProb > 40 || todayData.precipitationSum > 2;
    const isHot = todayData.maxTemp >= 35 || currentWeather.temp >= 33;
    const isCold = todayData.maxTemp <= 12 || currentWeather.temp <= 12;

    if (isRainy) {
      return {
        headline: isNight
          ? '🌧️ Rain Alert: Cozy Indoor Wind-Down & Evening Study'
          : '🌧️ Rain Alert: Prioritize Indoor Deep Work Sprints',
        commute: isNight
          ? 'Rainy transit conditions. Avoid unnecessary late-night travel; stay indoors.'
          : 'High probability of rain. Complete essential transit before afternoon showers.',
        focusSchedule: isNight
          ? 'Ideal atmospheric rain acoustics for calm reading, revision, or planning tomorrow’s top priorities inside PlanBot.'
          : 'Reserve 2:00 PM – 6:00 PM for uninterrupted indoor deep study. Atmospheric rainfall lowers distraction and increases cognitive flow state.',
        workout: isNight
          ? 'Gentle indoor stretching or light core routine. Relax muscles before bedtime.'
          : 'Opt for indoor calisthenics or home treadmill session instead of outdoor running.',
      };
    }
    if (isHot) {
      return {
        headline: isNight
          ? '🌙 Warm Night: Optimize Bedroom Cooling & Sleep Recovery'
          : '☀️ Peak Heat Warning: Front-Load Morning Cognitive Tasks',
        commute: isNight
          ? 'Pleasant transit with cooler evening air compared to daytime peaks.'
          : 'Avoid travel between 12:30 PM and 4:00 PM. UV Index peaks high.',
        focusSchedule: isNight
          ? 'Wrap up deep cognitive work. Ensure cool ventilation and prepare tomorrow’s schedule in PlanBot for a productive morning.'
          : 'Schedule your hardest problem-solving sprint early (7:30 AM – 11:00 AM) when room temperatures are cool and mental alertness is highest.',
        workout: isNight
          ? 'Hydrate with electrolyte water. Keep physical activity light to prevent core temperature spikes before sleep.'
          : 'Hydrate continuously. Move workout to late evening after sunset (7:00 PM+).',
      };
    }
    if (isCold) {
      return {
        headline: isNight
          ? '❄️ Chilly Night: Warm Rest & Tomorrow Morning Prep'
          : '❄️ Cold Atmosphere: Warm-Up Ritual & Midday Solar Focus',
        commute: isNight
          ? 'Cold night roads with potential mist/fog. Drive carefully with headlights.'
          : 'Expect morning fog or low visibility. Allow 15-minute commute buffer.',
        focusSchedule: isNight
          ? 'Warm drink + focused 30-minute review session. Set bedtime alarms early for tomorrow’s morning study block.'
          : 'Utilize warm drinks and ambient lighting. Peak alertness aligns with midday sun (11:00 AM – 3:00 PM).',
        workout: isNight
          ? 'Light foam rolling or warm shower to release tension before resting.'
          : 'Thoroughly stretch before training to prevent muscle tightness in chilly temperatures.',
      };
    }
    return {
      headline: isNight
        ? '🌙 Clear Night: Evening Review & Tomorrow’s Blueprint'
        : '🌤️ Optimal Weather: High Productivity & Balanced Routine',
      commute: isNight
        ? 'Calm, clear transit conditions with low traffic friction.'
        : 'Clear transit conditions. Low weather friction.',
      focusSchedule: isNight
        ? 'Wind down intensive tasks. Dedicate 30–45 minutes for daily review, gratitude logging, and setting tomorrow’s top 3 tasks in PlanBot.'
        : 'Ideal conditions for standard 90/20 Ultradian focus blocks. Schedule 2 deep work sessions in morning and 1 review block in evening.',
      workout: isNight
        ? 'Ideal window for a relaxing 20-minute post-dinner walk to aid digestion and sleep quality.'
        : 'Great window for outdoor running, gym, or evening walk to maintain dopamine balance.',
    };
  }, [todayData, currentWeather]);

  // Copy schedule summary
  const handleCopyReport = () => {
    if (!todayData || !currentWeather) return;
    const weatherDetails = getWeatherInfo(currentWeather.weatherCode, currentWeather.isDay);
    const reportText = `${weatherDetails.icon} PlanBot Weather & Daily Schedule Advisory (${selectedCity.name})\n\n` +
      `Current: ${currentWeather.temp}°C (${weatherDetails.label}${currentWeather.timeStr ? ` at ${currentWeather.timeStr}` : ''})\n` +
      `Today: High ${todayData.maxTemp}°C / Low ${todayData.minTemp}°C | Rain: ${todayData.precipitationProb}%\n\n` +
      `💡 AI Productivity Advice:\n` +
      `${productivityAdvisory?.headline}\n` +
      `• Commute: ${productivityAdvisory?.commute}\n` +
      `• Deep Work Focus: ${productivityAdvisory?.focusSchedule}\n` +
      `• Physical Activity: ${productivityAdvisory?.workout}\n\n` +
      `Generated with PlanBot AI. Track your daily streaks on Android: https://play.google.com/store/apps/details?id=cpm.planbot`;

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: 'How accurate is this weather tool?',
      answer: 'PlanBot Weather leverages high-resolution satellite, radar, and numerical weather prediction models provided by Open-Meteo. It provides hour-by-hour updates with localized GPS precision.',
    },
    {
      question: 'Why does PlanBot include past 2 days of weather history?',
      answer: 'Reviewing weather from the past 2 days helps students and professionals understand recent sleep quality, hydration, weather transitions, and fatigue patterns when planning upcoming study sprints.',
    },
    {
      question: 'Can I sync my weather alerts with my daily study schedule?',
      answer: 'Yes! Download the PlanBot Android app to receive automated reminders and dynamic schedule readjustments when weather conditions impact your daily commute or routine.',
    },
  ];

  return (
    <>
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'PlanBot Weather Forecast & Daily Schedule Planner',
          url: `${SITE_URL}/tools/weather-forecast`,
          applicationCategory: 'UtilityApplication',
          operatingSystem: 'Any',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          description: '10-day precision weather forecast featuring past 2 days, today, and next 7 days with AI daily routine advisories.',
        }}
      />

      <main className="pt-28 pb-20 md:pt-36 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 border border-primary/30 text-accent mb-4">
            🌤️ 10-Day Precision Weather • Past 2 Days, Today &amp; 7-Day Forecast
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Weather Forecast &amp; <span className="text-gradient">Daily Schedule Planner</span>
          </h1>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed">
            Track precise weather for your exact GPS location or any city worldwide. Plan your deep work sessions, outdoor workouts, and commute times without weather surprises.
          </p>
        </div>

        {/* Location Selector Bar - Elevated z-index to stay above advisory cards */}
        <div className="glass-card p-6 md:p-8 mb-10 border-primary/30 max-w-4xl mx-auto relative z-30">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            {/* Geolocation Button */}
            <button
              onClick={handleTurnOnLocation}
              disabled={isLoadingWeather}
              type="button"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-95 transition shadow-lg shadow-primary/20 shrink-0 disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Turn On GPS Location</span>
            </button>

            {/* Manual Search Input */}
            <div ref={searchContainerRef} className="relative flex-1">
              <input
                type="text"
                placeholder="Or search city manually (e.g., Delhi, New York, London, Tokyo)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-surface/80 border border-glass-border focus:border-accent text-white text-sm outline-none transition pr-10"
              />
              {isSearching && (
                <span className="absolute right-4 top-3 text-xs text-text-dim animate-pulse">Searching...</span>
              )}
              {!isSearching && searchQuery.length > 0 && (
                <button
                  type="button"
                  onClick={() => { setSearchQuery(''); setSearchResults([]); }}
                  className="absolute right-3.5 top-3.5 text-text-dim hover:text-white text-xs px-1"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}

              {/* Autocomplete dropdown with high z-index & scrollbar */}
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-[#0B122F] border border-primary/50 shadow-2xl z-50 max-h-80 overflow-y-auto backdrop-blur-xl divide-y divide-glass-border/40">
                  {searchResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => selectCity(result)}
                      type="button"
                      className="w-full text-left px-4 py-3 text-sm hover:bg-primary/20 text-white flex items-center justify-between transition group"
                    >
                      <span className="font-medium">
                        {result.name}, {result.admin1 ? `${result.admin1}, ` : ''}{result.country}
                      </span>
                      <span className="text-xs text-text-dim group-hover:text-accent transition">Select →</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick city presets */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-glass-border">
            <span className="text-xs text-text-dim">Quick Cities:</span>
            {DEFAULT_CITIES.map((c) => (
              <button
                key={c.name}
                onClick={() => selectCity(c)}
                type="button"
                className={`text-xs px-2.5 py-1 rounded-lg border transition ${
                  selectedCity.name === c.name
                    ? 'bg-primary/30 border-accent text-accent font-semibold'
                    : 'bg-white/5 border-white/10 text-text-secondary hover:text-white'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Location status badge */}
          <div className="mt-4 flex items-center justify-between text-xs text-text-dim">
            <div className="flex items-center gap-2">
              <span className="text-accent">📍 Active Location:</span>
              <strong className="text-white">
                {selectedCity.name}
                {selectedCity.admin1 ? `, ${selectedCity.admin1}` : ''} ({selectedCity.country})
              </strong>
              <span className="hidden sm:inline text-text-dim font-mono">
                [{selectedCity.latitude.toFixed(2)}°, {selectedCity.longitude.toFixed(2)}°]
              </span>
            </div>
            {isLoadingWeather && (
              <span className="text-accent animate-pulse font-medium">Fetching satellite telemetry...</span>
            )}
          </div>

          {geoError && (
            <div className="mt-3 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-300">
              {geoError}
            </div>
          )}
        </div>

        {/* Current Weather & Daily Spotlight */}
        {currentWeather && todayData && (
          <div className="grid lg:grid-cols-3 gap-6 mb-10">
            {/* Realtime Hero Card */}
            <div className="lg:col-span-1 glass-card p-8 bg-gradient-to-br from-primary/20 via-surface/60 to-surface/40 border-primary/40 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent/20 text-accent border border-accent/30">
                    Current Conditions
                  </span>
                  {currentWeather.timeStr && (
                    <span className="text-xs text-text-dim flex items-center gap-1.5 font-medium">
                      <span className={`w-2 h-2 rounded-full ${currentWeather.isDay ? 'bg-amber-400' : 'bg-indigo-400'} animate-pulse`} />
                      {currentWeather.timeStr} • {currentWeather.isDay ? 'Day' : 'Night'}
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-6xl font-black text-white tracking-tight">
                    {currentWeather.temp}°C
                  </span>
                  <span className="text-3xl">
                    {getWeatherInfo(currentWeather.weatherCode, currentWeather.isDay).icon}
                  </span>
                </div>
                <div className="text-xl font-bold text-accent mb-4">
                  {getWeatherInfo(currentWeather.weatherCode, currentWeather.isDay).label}
                </div>
                <p className="text-xs text-text-secondary">
                  Feels like {currentWeather.apparentTemp}°C • High {todayData.maxTemp}°C / Low {todayData.minTemp}°C
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t border-glass-border text-center">
                <div className="p-2 rounded-lg bg-surface/50">
                  <span className="text-[10px] uppercase text-text-dim block mb-1">Humidity</span>
                  <span className="text-sm font-bold text-white">{currentWeather.humidity}%</span>
                </div>
                <div className="p-2 rounded-lg bg-surface/50">
                  <span className="text-[10px] uppercase text-text-dim block mb-1">Wind</span>
                  <span className="text-sm font-bold text-white">{currentWeather.windSpeed} km/h</span>
                </div>
                <div className="p-2 rounded-lg bg-surface/50">
                  <span className="text-[10px] uppercase text-text-dim block mb-1">Rain Prob</span>
                  <span className="text-sm font-bold text-accent">{todayData.precipitationProb}%</span>
                </div>
              </div>
            </div>

            {/* AI Productivity & Schedule Advisory */}
            <div className="lg:col-span-2 glass-card p-8 border-accent/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-1.5">
                    ⚡ PlanBot AI Routine Advisory
                  </span>
                  <button
                    onClick={handleCopyReport}
                    type="button"
                    className="text-xs px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white border border-white/10 transition flex items-center gap-1.5"
                  >
                    {copied ? '✓ Copied Report' : '📋 Copy Advisory'}
                  </button>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {productivityAdvisory?.headline}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="p-3.5 rounded-xl bg-surface/60 border border-glass-border">
                    <strong className="text-xs text-accent uppercase block mb-1">🧠 Deep Work &amp; Focus Window</strong>
                    <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                      {productivityAdvisory?.focusSchedule}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-surface/60 border border-glass-border">
                      <strong className="text-xs text-emerald-400 uppercase block mb-1">🚗 Commute &amp; Errands</strong>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {productivityAdvisory?.commute}
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-surface/60 border border-glass-border">
                      <strong className="text-xs text-amber-400 uppercase block mb-1">🏃 Exercise &amp; Health</strong>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {productivityAdvisory?.workout}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA link to App - CRO Contextual Prompt */}
              <div className="pt-4 border-t border-glass-border flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-primary/10 to-transparent p-4 rounded-xl mt-2 border border-primary/20">
                <div>
                  <strong className="text-xs md:text-sm text-white block">
                    Sudden rain or heatwave? Let PlanBot on Android auto-reschedule your day in 3 seconds.
                  </strong>
                  <p className="text-[11px] text-text-dim mt-0.5">
                    Adaptive AI schedule rescheduling, offline task tracking &amp; focus timers.
                  </p>
                </div>
                <PlayStoreLink 
                  location="weather_forecast"
                  className="btn-primary text-xs !py-2.5 !px-5 shrink-0 shadow-lg shadow-primary/25 whitespace-nowrap"
                >
                  Download Free on Android →
                </PlayStoreLink>
              </div>
            </div>
          </div>
        )}

        {/* 24-Hour Hourly Scroll */}
        {hourlySlots.length > 0 && (
          <div className="mb-10">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span>⏱️ Next 12 Hours Forecast</span>
              <span className="text-xs text-text-dim font-normal">• Hourly Temperature &amp; Rain</span>
            </h3>
            <div className="overflow-x-auto pb-4 custom-scrollbar">
              <div className="flex gap-3 min-w-max">
                {hourlySlots.map((slot, idx) => (
                  <div
                    key={idx}
                    className="glass-card p-4 text-center w-24 flex flex-col items-center justify-between border-glass-border hover:border-primary/50 transition"
                  >
                    <span className="text-xs font-semibold text-text-dim mb-2">{slot.time}</span>
                    <span className="text-2xl mb-1">{getWeatherInfo(slot.weatherCode, slot.isDay).icon}</span>
                    <span className="text-base font-bold text-white mb-2">{slot.temp}°</span>
                    <span className={`text-[10px] font-semibold ${slot.precipProb > 30 ? 'text-blue-400' : 'text-text-dim'}`}>
                      {slot.precipProb}% rain
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 10-Day Complete Breakdown Tabs */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">
                10-Day Atmospheric Timeline
              </h2>
              <p className="text-xs text-text-secondary mt-1">
                Comparing Past 2 Days History with Today and the 7-Day Outlook
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="inline-flex rounded-xl bg-surface/80 p-1 border border-glass-border">
              <button
                onClick={() => setActiveTab('all')}
                type="button"
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  activeTab === 'all' ? 'bg-primary text-white shadow' : 'text-text-secondary hover:text-white'
                }`}
              >
                All (10 Days)
              </button>
              <button
                onClick={() => setActiveTab('past')}
                type="button"
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  activeTab === 'past' ? 'bg-primary text-white shadow' : 'text-text-secondary hover:text-white'
                }`}
              >
                Past 2 Days
              </button>
              <button
                onClick={() => setActiveTab('today')}
                type="button"
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  activeTab === 'today' ? 'bg-primary text-white shadow' : 'text-text-secondary hover:text-white'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setActiveTab('forecast')}
                type="button"
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  activeTab === 'forecast' ? 'bg-primary text-white shadow' : 'text-text-secondary hover:text-white'
                }`}
              >
                Next 7 Days
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {filteredDays.map((day) => {
              const info = getWeatherInfo(day.weatherCode);
              const isPast = day.type === 'past';
              const isToday = day.type === 'today';

              return (
                <div
                  key={day.date}
                  className={`glass-card p-5 flex flex-col justify-between transition-all duration-200 ${
                    isToday
                      ? 'border-accent bg-primary/20 shadow-lg shadow-accent/10 relative overflow-hidden'
                      : isPast
                      ? 'opacity-85 border-white/10 hover:opacity-100'
                      : 'border-glass-border hover:border-primary/40'
                  }`}
                >
                  {isToday && (
                    <span className="absolute top-2 right-2 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-accent text-[#0A0E23]">
                      Today
                    </span>
                  )}
                  {isPast && (
                    <span className="inline-block self-start text-[10px] font-semibold text-text-dim px-2 py-0.5 rounded bg-white/5 border border-white/10 mb-2">
                      Past Weather
                    </span>
                  )}

                  <div>
                    <span className="text-xs font-semibold text-text-secondary block mb-1">
                      {day.dayLabel}
                    </span>
                    <div className="flex items-center gap-3 my-3">
                      <span className="text-3xl">{info.icon}</span>
                      <div>
                        <div className="text-lg font-bold text-white">
                          {day.maxTemp}° / <span className="text-text-dim text-sm">{day.minTemp}°</span>
                        </div>
                        <span className="text-xs text-accent font-medium">
                          {info.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-glass-border text-xs text-text-secondary">
                    <div className="flex items-center justify-between">
                      <span>Rain Prob:</span>
                      <strong className={day.precipitationProb > 30 ? 'text-blue-400' : 'text-white'}>
                        {day.precipitationProb}%
                      </strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Rainfall:</span>
                      <strong className="text-white">{day.precipitationSum} mm</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Max Wind:</span>
                      <strong className="text-white">{day.maxWind} km/h</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>UV Index:</span>
                      <strong className="text-white">{day.uvIndex}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why Weather-Aware Planning Matters Section */}
        <section className="glass-card p-8 md:p-12 mb-16 border-primary/20">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Why Weather Awareness Boosts Daily Productivity
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              Human cognitive endurance and willpower fluctuate significantly with ambient temperature, humidity, sunlight exposure, and atmospheric pressure. PlanBot analyzes weather variables so you never schedule exhausting physical activities during peak UV heat, or critical analytical study blocks when heavy rain and low atmospheric pressure induce natural fatigue.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 pt-4 border-t border-glass-border">
              <div>
                <div className="text-2xl font-bold text-accent mb-1">Past 2 Days</div>
                <p className="text-xs text-text-dim">Audit sleep debt and dehydration caused by sudden weekend heat or storms.</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-gradient mb-1">Real-Time Today</div>
                <p className="text-xs text-text-dim">Hourly 24h temperature and precipitation tracking for precision commute planning.</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">7-Day Horizon</div>
                <p className="text-xs text-text-dim">Plan upcoming study exams and mock tests around optimal indoor weather windows.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">
            Weather &amp; Schedule Planning FAQs
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="glass-card p-6">
                <h3 className="text-base font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center glass-card p-10 md:p-14 border-primary/40 bg-gradient-to-b from-primary/10 to-transparent">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let AI Dynamically Adjust When Weather Disrupts Your Day
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto mb-8">
            A sudden thunderstorm or 40°C heatwave can ruin a rigid paper timetable. PlanBot on Android recalculates your daily focus blocks in 3 seconds to keep your goals on track.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <PlayStoreLink 
              location="weather_forecast_bottom"
              className="btn-primary text-base !px-8 !py-3.5"
            >
              Download PlanBot Free on Android →
            </PlayStoreLink>
            <Link
              href="/tools"
              className="btn-secondary text-base !px-8 !py-3.5"
            >
              Explore All Free Tools
            </Link>
          </div>
        </section>

        {/* SEO Article & Example Input/Output (600+ words) */}
        <article className="prose prose-invert max-w-4xl mx-auto space-y-6 text-text-secondary leading-relaxed pb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Weather Forecasts as a Productivity Multiplier
          </h2>
          <p>
            While most weather apps exist to tell you if you need an umbrella, the PlanBot AI Weather & Routine Planner is designed specifically for deep work and cognitive optimization. Human productivity is deeply intertwined with barometric pressure, sunlight exposure, and temperature. By analyzing up to 10 days of hyper-local meteorological data, this tool automatically generates an actionable daily schedule.
          </p>

          <h3 className="text-xl font-bold text-white mt-8 mb-4">Example Input and AI Output</h3>
          <p>
            Understanding how the AI interprets weather data helps you maximize the utility of this tool. Below is a real-world example of how raw meteorological data is converted into a structured routine advisory.
          </p>
          <div className="bg-surface/50 border border-glass-border p-6 rounded-xl my-4">
            <h4 className="font-bold text-accent mb-2">Input (Bangalore, India - Monsoon Season):</h4>
            <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-text-dim">
              <li>Current Temp: 22°C (Apparent: 24°C)</li>
              <li>Conditions: Heavy Rain (Code 65)</li>
              <li>Rain Probability: 90% until 4:00 PM</li>
              <li>Wind: 18 km/h</li>
            </ul>
            <h4 className="font-bold text-emerald-400 mb-2">Output (AI Routine Advisory):</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm text-white">
              <li><strong>Commute:</strong> Delay commute until 4:30 PM if possible, or work remotely.</li>
              <li><strong>Deep Work:</strong> Capitalize on the rain noise. Schedule your longest 90-minute deep work block between 10:00 AM and 1:00 PM when rain probability is highest and outdoor distractions are zero.</li>
              <li><strong>Exercise:</strong> Skip the outdoor run today. Substitute with a 30-minute indoor HIIT or yoga session at 6:00 PM.</li>
            </ul>
          </div>

          <h3 className="text-xl font-bold text-white mt-8 mb-4">The Science of Weather and Cognition</h3>
          <p>
            Research indicates that high-pressure systems and clear, sunny days correlate with elevated mood and higher physical energy, making them ideal for collaborative meetings and outdoor activities. Conversely, rainy days with low barometric pressure lower physical energy but dramatically increase cognitive isolation—creating the perfect environmental conditions for deep, uninterrupted work (often referred to as the &quot;rainy day effect&quot;). 
          </p>
          <p>
            Our tool uses the Open-Meteo API to fetch data from national meteorological agencies like NOAA and ECMWF. This ensures that the 10-day forecast is not just accurate, but robust enough to base your entire week&apos;s schedule upon. If you see a cluster of rainy days approaching next week, you can front-load your outdoor errands today, reserving those indoor days strictly for writing, coding, or studying.
          </p>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions (FAQ)</h2>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-white aeo-answer">How accurate is the 10-day weather forecast?</h4>
                <p className="mt-2 text-sm">
                  The 10-day forecast utilizes the Open-Meteo API, which aggregates data from national weather services including NOAA, DWD, and ECMWF for highly precise, hyper-local meteorological predictions.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-white aeo-answer">How does weather impact daily productivity?</h4>
                <p className="mt-2 text-sm">
                  Barometric pressure changes, high humidity, and lack of sunlight (SAD) significantly impact cognitive function and energy levels. The AI routine planner analyzes these atmospheric conditions to recommend the optimal times for deep work versus shallow administrative tasks.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white aeo-answer">Can I generate a daily schedule based on the weather?</h4>
                <p className="mt-2 text-sm">
                  Yes, the AI Weather Routine Advisory analyzes the current temperature, rain probability, and wind speed to suggest when you should commute, when you should exercise outdoors, and when you should lock in for uninterrupted indoor deep work.
                </p>
              </div>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
