"use client";

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  // CONFIGURE YOUR MAIN PHOTO HERE:
  // Change this path to use any photo from public/images/family/
  const mainPhotoPath = '/images/family/IMG_7592.jpg'; // Joëlle with her mother

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
        {/* Main Hero Photo */}
        <div
          className="mb-8 mx-auto w-64 h-64 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white shadow-2xl overflow-hidden"
          role="img"
          aria-label="Profile photo of Joëlle Shekinah Tchami"
        >
          <Image
            src={mainPhotoPath}
            alt="Joëlle Shekinah Tchami"
            width={256}
            height={256}
            className="w-full h-full object-cover"
            priority
          />
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
