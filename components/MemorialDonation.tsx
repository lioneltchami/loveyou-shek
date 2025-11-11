"use client";

import { useLanguage } from '@/contexts/LanguageContext';

export default function MemorialDonation() {
  const { language } = useLanguage();

  // UPDATE THIS URL WITH YOUR ACTUAL DONATION LINK
  // Examples:
  // - Church donation page
  // - Charity in Joëlle's name
  // - Scholarship fund
  // - GoFundMe/other fundraising platform
  const donationUrl = "https://example.com/donate"; // CHANGE THIS

  return (
    <section
      id="donation"
      className="py-20 bg-gradient-to-b from-[#f5f3f0] to-white"
      aria-labelledby="donation-heading"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Card Container */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-t-4 border-[#8b7355]">
            <div className="text-center mb-8">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#8b7355] to-[#6f5a43] rounded-full mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>

              <h2 id="donation-heading" className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {language === 'fr'
                  ? 'Honorez Sa Mémoire'
                  : 'Honor Her Memory'}
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {language === 'fr'
                  ? 'Si vous souhaitez honorer la mémoire de Joëlle, vous pouvez faire un don à une cause qui lui tenait à cœur.'
                  : 'If you wish to honor Joëlle\'s memory, you can make a donation to a cause that was close to her heart.'}
              </p>
            </div>

            {/* Donation Details */}
            <div className="bg-gradient-to-br from-[#f5f3f0] to-[#f9f7f4] rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {language === 'fr'
                  ? 'Causes Soutenues par Joëlle'
                  : 'Causes Joëlle Supported'}
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#8b7355] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>
                    {language === 'fr'
                      ? 'Soutien aux ministères chrétiens et conférences spirituelles'
                      : 'Support for Christian ministries and spiritual conferences'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#8b7355] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>
                    {language === 'fr'
                      ? 'Éducation et bourses d\'études pour les jeunes camerounais'
                      : 'Education and scholarships for young Cameroonians'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#8b7355] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>
                    {language === 'fr'
                      ? 'Œuvres caritatives et aide aux familles dans le besoin'
                      : 'Charitable works and assistance to families in need'}
                  </span>
                </li>
              </ul>
            </div>

            {/* Donation Button */}
            <div className="text-center">
              <a
                href={donationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#8b7355] to-[#6f5a43] text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {language === 'fr' ? 'Faire un Don' : 'Make a Donation'}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>

              <p className="text-sm text-gray-500 mt-4">
                {language === 'fr'
                  ? 'Les dons sont facultatifs et iront à des causes chères à Joëlle'
                  : 'Donations are optional and will go to causes dear to Joëlle'}
              </p>
            </div>

            {/* Alternative Contact */}
            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                {language === 'fr'
                  ? 'Pour d\'autres moyens de contribuer ou pour plus d\'informations, veuillez contacter la famille.'
                  : 'For other ways to contribute or for more information, please contact the family.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
