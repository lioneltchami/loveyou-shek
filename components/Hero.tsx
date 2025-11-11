"use client";

import { useLanguage } from '@/contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#8b7355] via-[#a68968] to-[#c4a585] text-white"
      aria-label="Hero section - Joëlle Shekinah Tchami memorial introduction"
    >
      {/* Overlay pattern - decorative only */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Photo placeholder - user will add later */}
        <div
          className="mb-8 mx-auto w-64 h-64 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white shadow-2xl flex items-center justify-center overflow-hidden"
          role="img"
          aria-label="Profile photo placeholder for Joëlle Shekinah Tchami"
        >
          <div className="text-white/40 text-center p-8">
            <svg
              className="w-32 h-32 mx-auto mb-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              role="img"
              aria-label="Person icon placeholder"
            >
              <title>Profile photo will be added</title>
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <p className="text-sm" aria-hidden="true">Photo will be added here</p>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-4" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'}}>
          Joëlle Shekinah
        </h1>
        <h2 className="text-3xl md:text-4xl font-light mb-6">
          Tchami
        </h2>

        <div className="flex items-center justify-center gap-4 text-xl md:text-2xl mb-8">
          <span>{t('hero.dates')}</span>
        </div>

        <div className="max-w-3xl mx-auto mb-8">
          <p className="text-xl md:text-2xl font-light leading-relaxed">
            {t('hero.tagline')}
          </p>
          <p className="text-lg md:text-xl mt-4 opacity-90">
            {t('hero.scrollDown')}
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 animate-bounce" aria-hidden="true">
          <svg
            className="w-8 h-8 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            role="img"
            aria-label="Scroll down indicator"
          >
            <title>Scroll down to read more</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
