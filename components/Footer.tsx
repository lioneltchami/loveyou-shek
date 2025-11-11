"use client";

import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      className="bg-gradient-to-r from-[#8b7355] to-[#a68968] text-white py-12"
      role="contentinfo"
      aria-label="Memorial website footer"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-2">Joëlle Shekinah Tchami</h3>
            <p className="text-white/80">{t('hero.dates')}</p>
          </div>

          <div className="border-t border-white/30 pt-8 mb-8">
            <p className="text-lg italic mb-4">
              {t('footer.memory')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-sm text-white/80 mb-8">
            <div>
              <h4 className="font-semibold text-white mb-2">{t('footer.born')}</h4>
              <p>{t('footer.location')}</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">{t('footer.family')}</h4>
              <p>Kelilah, Daniela, Precious</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">{t('footer.profession')}</h4>
            </div>
          </div>

          <div className="border-t border-white/30 pt-8">
            <p className="text-sm text-white/70">
              {t('footer.createdBy')}
            </p>
            <p className="text-xs text-white/60 mt-2">
              {t('footer.legacy')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
