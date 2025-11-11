"use client";

import { useLanguage } from '@/contexts/LanguageContext';

export default function Professional() {
  const { t } = useLanguage();

  return (
    <section
      id="professional"
      className="py-20 bg-white"
      aria-labelledby="professional-heading"
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 id="professional-heading" className="text-4xl font-bold text-center mb-12 text-[#8b7355]">
          {t('professional.title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Career Highlights */}
          <article className="bg-gradient-to-br from-[#f5f3f0] to-white rounded-lg p-8 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full bg-[#8b7355] flex items-center justify-center"
                aria-hidden="true"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-label="Globe icon representing international work"
                >
                  <title>International Career</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">{t('professional.career.title')}</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {t('professional.career.description')}
            </p>
          </article>

          {/* Education */}
          <article className="bg-gradient-to-br from-[#f5f3f0] to-white rounded-lg p-8 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full bg-[#8b7355] flex items-center justify-center"
                aria-hidden="true"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-label="Graduation cap icon representing education"
                >
                  <title>Education</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">{t('professional.education.title')}</h3>
            </div>
            <ul className="text-gray-700 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-[#8b7355] mt-1">•</span>
                <span dangerouslySetInnerHTML={{ __html: t('professional.education.masters') }} />
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8b7355] mt-1">•</span>
                <span dangerouslySetInnerHTML={{ __html: t('professional.education.bachelors') }} />
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8b7355] mt-1">•</span>
                <span dangerouslySetInnerHTML={{ __html: t('professional.education.baccalaureate') }} />
              </li>
            </ul>
          </article>
        </div>

        {/* Key Achievements */}
        <div className="bg-gradient-to-r from-[#8b7355] to-[#c4a585] rounded-lg p-8 text-white shadow-xl mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-center">{t('professional.achievements.title')}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-white/90">{t('professional.achievements.years')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-white/90">{t('professional.achievements.conferences')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">3</div>
              <div className="text-white/90">{t('professional.achievements.languages')}</div>
            </div>
          </div>
        </div>

        {/* Skills & Expertise */}
        <div className="bg-[#f5f3f0] rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">{t('professional.skills.title')}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#8b7355]"></div>
              <span className="text-gray-700">{t('professional.skills.interpretation')}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#8b7355]"></div>
              <span className="text-gray-700">{t('professional.skills.french')}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#8b7355]"></div>
              <span className="text-gray-700">{t('professional.skills.english')}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#8b7355]"></div>
              <span className="text-gray-700">{t('professional.skills.portuguese')}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#8b7355]"></div>
              <span className="text-gray-700">{t('professional.skills.translation')}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#8b7355]"></div>
              <span className="text-gray-700">{t('professional.skills.communication')}</span>
            </div>
          </div>
        </div>

        {/* Fire Conference Highlight */}
        <article className="bg-white rounded-lg p-8 shadow-md border-l-4 border-[#8b7355]">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <svg
              className="w-8 h-8 text-[#8b7355]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              role="img"
              aria-label="Sparkle icon representing notable achievement"
            >
              <title>Notable Achievement</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            {t('professional.fireConference.title')}
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {t('professional.fireConference.description')}
          </p>
        </article>

        {/* King Interpreters Section */}
        <section className="mt-12 text-center bg-gradient-to-r from-[#8b7355] to-[#c4a585] rounded-lg p-8 shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-white">{t('professional.kingInterpreters.title')}</h3>
          <p className="text-white/90 mb-6">
            {t('professional.kingInterpreters.description')}
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://kinginterpreters.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#8b7355] px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-md font-semibold focus:outline-none focus:ring-4 focus:ring-white/50"
              aria-label="Visit King Interpreters Website"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                role="img"
                aria-hidden="true"
              >
                <title>Globe icon</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              {t('professional.kingInterpreters.button')}
            </a>
          </div>
        </section>

        {/* LinkedIn Section */}
        <section className="mt-12 text-center bg-gradient-to-r from-[#f5f3f0] to-white rounded-lg p-8 shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">{t('professional.linkedin.title')}</h3>
          <p className="text-gray-700 mb-6">
            {t('professional.linkedin.description')}
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/joelle-k-70949880/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0077b5] text-white px-6 py-3 rounded-lg hover:bg-[#006399] transition-colors duration-300 shadow-md focus:outline-none focus:ring-4 focus:ring-[#0077b5]/50"
              aria-label="Visit Joëlle Shekinah Tchami's LinkedIn Profile"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                role="img"
                aria-hidden="true"
              >
                <title>LinkedIn icon</title>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              {t('professional.linkedin.button')}
            </a>
          </div>
        </section>
      </div>
    </section>
  );
}
