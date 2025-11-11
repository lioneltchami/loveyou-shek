"use client";

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="flex items-center gap-2 bg-white rounded-full shadow-lg p-2 border-2 border-[#8b7355]">
        <button
          onClick={() => setLanguage('en')}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
            language === 'en'
              ? 'bg-[#8b7355] text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          aria-label="Switch to English"
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('fr')}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
            language === 'fr'
              ? 'bg-[#8b7355] text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          aria-label="Passer au français"
        >
          FR
        </button>
      </div>
    </div>
  );
}
