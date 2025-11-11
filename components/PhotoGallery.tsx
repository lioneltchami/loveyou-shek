"use client";

import { useLanguage } from '@/contexts/LanguageContext';

interface PhotoSection {
  title: string;
  description: string;
  period: string;
  placeholder: string;
}

export default function PhotoGallery() {
  const { t } = useLanguage();

  const photoSections: PhotoSection[] = [
    {
      title: t('gallery.sections.0.title'),
      description: t('gallery.sections.0.description'),
      period: t('gallery.sections.0.period'),
      placeholder: t('gallery.sections.0.placeholder')
    },
    {
      title: t('gallery.sections.1.title'),
      description: t('gallery.sections.1.description'),
      period: t('gallery.sections.1.period'),
      placeholder: t('gallery.sections.1.placeholder')
    },
    {
      title: t('gallery.sections.2.title'),
      description: t('gallery.sections.2.description'),
      period: t('gallery.sections.2.period'),
      placeholder: t('gallery.sections.2.placeholder')
    },
    {
      title: t('gallery.sections.3.title'),
      description: t('gallery.sections.3.description'),
      period: t('gallery.sections.3.period'),
      placeholder: t('gallery.sections.3.placeholder')
    },
    {
      title: t('gallery.sections.4.title'),
      description: t('gallery.sections.4.description'),
      period: t('gallery.sections.4.period'),
      placeholder: t('gallery.sections.4.placeholder')
    },
    {
      title: t('gallery.sections.5.title'),
      description: t('gallery.sections.5.description'),
      period: t('gallery.sections.5.period'),
      placeholder: t('gallery.sections.5.placeholder')
    }
  ];

  return (
    <section
      id="gallery"
      className="py-20 bg-gradient-to-b from-white to-[#f5f3f0]"
      aria-labelledby="gallery-heading"
    >
      <div className="container mx-auto px-4">
        <h2 id="gallery-heading" className="text-4xl font-bold text-center mb-4 text-[#8b7355]">
          {t('gallery.title')}
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          {t('gallery.subtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto" role="list" aria-label="Photo gallery sections">
          {photoSections.map((section, index) => (
            <article
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              role="listitem"
            >
              {/* Photo placeholder */}
              <div
                className="relative h-64 bg-gradient-to-br from-[#c4a585]/20 to-[#8b7355]/20 flex items-center justify-center"
                role="img"
                aria-label={`Photo placeholder for ${section.title} from ${section.period}`}
              >
                <div className="text-center text-gray-400 p-4">
                  <svg
                    className="w-16 h-16 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <title>Photo placeholder icon</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm">{section.placeholder}</p>
                </div>
                <div className="absolute top-2 right-2 bg-white/90 px-3 py-1 rounded-full text-xs font-semibold text-[#8b7355]">
                  {section.period}
                </div>
              </div>

              {/* Section info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {section.title}
                </h3>
                <p className="text-gray-600">
                  {section.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center bg-white rounded-lg p-8 max-w-2xl mx-auto shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-[#8b7355]">{t('gallery.instructions.title')}</h3>
          <p className="text-gray-700 mb-4">
            {t('gallery.instructions.intro')}
          </p>
          <ol className="text-left text-gray-700 space-y-2 max-w-xl mx-auto">
            <li className="flex items-start gap-2">
              <span className="font-semibold text-[#8b7355] min-w-[24px]">1.</span>
              <span dangerouslySetInnerHTML={{ __html: t('gallery.instructions.step1') }} />
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-[#8b7355] min-w-[24px]">2.</span>
              <span dangerouslySetInnerHTML={{ __html: t('gallery.instructions.step2') }} />
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-[#8b7355] min-w-[24px]">3.</span>
              <span dangerouslySetInnerHTML={{ __html: t('gallery.instructions.step3') }} />
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
