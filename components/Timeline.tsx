"use client";

import { useLanguage } from '@/contexts/LanguageContext';

interface TimelineEvent {
  year: string;
  date?: string;
  title: string;
  description: string;
  location?: string;
  category: 'birth' | 'life' | 'education' | 'career' | 'family' | 'miracle' | 'memorial';
}

const categoryColors = {
  birth: 'bg-rose-100 border-rose-300 text-rose-800',
  life: 'bg-blue-100 border-blue-300 text-blue-800',
  education: 'bg-purple-100 border-purple-300 text-purple-800',
  career: 'bg-emerald-100 border-emerald-300 text-emerald-800',
  family: 'bg-pink-100 border-pink-300 text-pink-800',
  miracle: 'bg-amber-100 border-amber-300 text-amber-800',
  memorial: 'bg-gray-100 border-gray-300 text-gray-800'
};

export default function Timeline() {
  const { t } = useLanguage();

  // Helper function to safely get translations (returns undefined if translation key is returned)
  const safeT = (key: string): string | undefined => {
    const value = t(key);
    // If the translation returns the key itself, it means translation is missing
    return value === key ? undefined : value;
  };

  const events: TimelineEvent[] = [
    {
      year: t('timeline.events.0.year'),
      date: safeT('timeline.events.0.date'),
      title: t('timeline.events.0.title'),
      description: t('timeline.events.0.description'),
      location: safeT('timeline.events.0.location'),
      category: 'birth'
    },
    {
      year: t('timeline.events.1.year'),
      title: t('timeline.events.1.title'),
      description: t('timeline.events.1.description'),
      location: safeT('timeline.events.1.location'),
      category: 'life'
    },
    {
      year: t('timeline.events.2.year'),
      title: t('timeline.events.2.title'),
      description: t('timeline.events.2.description'),
      location: safeT('timeline.events.2.location'),
      category: 'life'
    },
    {
      year: t('timeline.events.3.year'),
      title: t('timeline.events.3.title'),
      description: t('timeline.events.3.description'),
      location: safeT('timeline.events.3.location'),
      category: 'education'
    },
    {
      year: t('timeline.events.4.year'),
      title: t('timeline.events.4.title'),
      description: t('timeline.events.4.description'),
      location: safeT('timeline.events.4.location'),
      category: 'education'
    },
    {
      year: t('timeline.events.5.year'),
      title: t('timeline.events.5.title'),
      description: t('timeline.events.5.description'),
      location: safeT('timeline.events.5.location'),
      category: 'education'
    },
    {
      year: t('timeline.events.6.year'),
      title: t('timeline.events.6.title'),
      description: t('timeline.events.6.description'),
      location: safeT('timeline.events.6.location'),
      category: 'miracle'
    },
    {
      year: t('timeline.events.7.year'),
      title: t('timeline.events.7.title'),
      description: t('timeline.events.7.description'),
      location: safeT('timeline.events.7.location'),
      category: 'career'
    },
    {
      year: t('timeline.events.8.year'),
      title: t('timeline.events.8.title'),
      description: t('timeline.events.8.description'),
      location: safeT('timeline.events.8.location'),
      category: 'career'
    },
    {
      year: t('timeline.events.9.year'),
      title: t('timeline.events.9.title'),
      description: t('timeline.events.9.description'),
      location: safeT('timeline.events.9.location'),
      category: 'career'
    },
    {
      year: t('timeline.events.10.year'),
      date: safeT('timeline.events.10.date'),
      title: t('timeline.events.10.title'),
      description: t('timeline.events.10.description'),
      location: safeT('timeline.events.10.location'),
      category: 'family'
    },
    {
      year: t('timeline.events.11.year'),
      title: t('timeline.events.11.title'),
      description: t('timeline.events.11.description'),
      location: safeT('timeline.events.11.location'),
      category: 'family'
    },
    {
      year: t('timeline.events.12.year'),
      title: t('timeline.events.12.title'),
      description: t('timeline.events.12.description'),
      location: safeT('timeline.events.12.location'),
      category: 'family'
    },
    {
      year: t('timeline.events.13.year'),
      title: t('timeline.events.13.title'),
      description: t('timeline.events.13.description'),
      location: safeT('timeline.events.13.location'),
      category: 'family'
    },
    {
      year: t('timeline.events.14.year'),
      title: t('timeline.events.14.title'),
      description: t('timeline.events.14.description'),
      location: safeT('timeline.events.14.location'),
      category: 'life'
    },
    {
      year: t('timeline.events.15.year'),
      title: t('timeline.events.15.title'),
      description: t('timeline.events.15.description'),
      location: safeT('timeline.events.15.location'),
      category: 'career'
    },
    {
      year: t('timeline.events.16.year'),
      date: safeT('timeline.events.16.date'),
      title: t('timeline.events.16.title'),
      description: t('timeline.events.16.description'),
      location: safeT('timeline.events.16.location'),
      category: 'memorial'
    },
    {
      year: t('timeline.events.17.year'),
      title: t('timeline.events.17.title'),
      description: t('timeline.events.17.description'),
      location: safeT('timeline.events.17.location'),
      category: 'career'
    },
    {
      year: t('timeline.events.18.year'),
      date: safeT('timeline.events.18.date'),
      title: t('timeline.events.18.title'),
      description: t('timeline.events.18.description'),
      location: safeT('timeline.events.18.location'),
      category: 'memorial'
    },
    {
      year: t('timeline.events.19.year'),
      title: t('timeline.events.19.title'),
      description: t('timeline.events.19.description'),
      location: safeT('timeline.events.19.location'),
      category: 'life'
    },
    {
      year: t('timeline.events.20.year'),
      date: safeT('timeline.events.20.date'),
      title: t('timeline.events.20.title'),
      description: t('timeline.events.20.description'),
      location: safeT('timeline.events.20.location'),
      category: 'memorial'
    }
  ];

  return (
    <section
      id="timeline"
      className="py-20 bg-gradient-to-b from-[#f5f3f0] to-white"
      aria-labelledby="timeline-heading"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 id="timeline-heading" className="text-4xl font-bold text-center mb-4 text-[#8b7355]">
          {t('timeline.title')}
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          {t('timeline.subtitle')}
        </p>

        <div className="relative">
          {/* Timeline line - decorative */}
          <div
            className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#8b7355] via-[#c4a585] to-[#8b7355]"
            aria-hidden="true"
          />

          {/* Timeline events */}
          <div className="space-y-8" role="list" aria-label="Timeline events">
            {events.map((event, index) => (
              <article key={index} className="relative pl-20" role="listitem">
                {/* Timeline dot - decorative */}
                <div
                  className="absolute left-6 top-2 w-5 h-5 rounded-full bg-[#8b7355] border-4 border-white shadow-md"
                  aria-hidden="true"
                />

                {/* Event card */}
                <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-[#c4a585]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-sm font-bold text-[#8b7355] bg-[#f5f3f0] px-3 py-1 rounded-full">
                      {event.year}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full border ${categoryColors[event.category]}`}>
                      {t(`timeline.categories.${event.category}`)}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {event.title}
                  </h3>

                  {event.date && (
                    <p className="text-sm text-gray-500 mb-2">{event.date}</p>
                  )}

                  <p className="text-gray-700 leading-relaxed mb-2">
                    {event.description}
                  </p>

                  {event.location && (
                    <p className="text-sm text-gray-500 italic flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        role="img"
                        aria-label="Location marker icon"
                      >
                        <title>Location</title>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
