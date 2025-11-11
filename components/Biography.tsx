"use client";

import { useLanguage } from '@/contexts/LanguageContext';

export default function Biography() {
  const { t } = useLanguage();

  return (
    <section id="biography" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-4 text-[#8b7355]">
          {t('biography.title')}
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          {t('biography.subtitle')}
        </p>

        <div className="prose prose-lg max-w-none">
          <div className="bg-[#f5f3f0] rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-[#8b7355]">
              {t('biography.earlyLife.title')}
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {t('biography.earlyLife.content')}
            </p>
          </div>

          <div className="bg-[#f5f3f0] rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-[#8b7355]">
              {t('biography.miracle.title')}
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {t('biography.miracle.content')}
            </p>
          </div>

          <div className="bg-[#f5f3f0] rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-[#8b7355]">
              {t('biography.education.title')}
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {t('biography.education.content')}
            </p>
          </div>

          <div className="bg-[#f5f3f0] rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-[#8b7355]">
              {t('biography.family.title')}
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {t('biography.family.content')}
            </p>
          </div>

          <div className="bg-[#f5f3f0] rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-[#8b7355]">
              {t('biography.treasuredRelationships.title')}
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{ __html: t('biography.treasuredRelationships.content') }} />
          </div>

          <div className="bg-[#f5f3f0] rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-[#8b7355]">
              {t('biography.strength.title')}
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {t('biography.strength.content')}
            </p>
          </div>

          <div className="bg-[#f5f3f0] rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-4 text-[#8b7355]">
              {t('biography.legacy.title')}
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {t('biography.legacy.content')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
