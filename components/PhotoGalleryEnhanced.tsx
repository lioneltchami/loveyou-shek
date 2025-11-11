"use client";

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useLanguage } from '@/contexts/LanguageContext';

interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
  title: string;
  description: string;
}

export default function PhotoGalleryEnhanced() {
  const { t, language } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Wedding photos with bilingual metadata
  const photos: Photo[] = [
    {
      src: '/images/wedding/IMG-20170819-WA0015.jpg',
      alt: 'Joëlle and Olivier wedding ceremony',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Cérémonie de Mariage' : 'Wedding Ceremony',
      description: language === 'fr'
        ? "Beau moment de la cérémonie de mariage de Joëlle et Olivier en juin 2017"
        : "Beautiful moment from Joëlle and Olivier's wedding ceremony in June 2017"
    },
    {
      src: '/images/wedding/IMG_1751.JPG',
      alt: 'Joëlle and Olivier wedding celebration',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Célébration de Mariage' : 'Wedding Celebration',
      description: language === 'fr'
        ? 'Joyeuse célébration avec la famille et les amis'
        : 'Joyful celebration with family and friends'
    },
    {
      src: '/images/wedding/IMG_1914.JPG',
      alt: 'Joëlle and Olivier wedding portrait',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Portrait de Mariage' : 'Wedding Portrait',
      description: language === 'fr'
        ? 'Beau portrait de mariage du couple heureux'
        : 'Beautiful wedding portrait of the happy couple'
    }
  ];

  // Prepare slides for lightbox
  const slides = photos.map(photo => ({
    src: photo.src,
    alt: photo.alt,
    title: photo.title,
    description: photo.description,
  }));

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

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

        {/* Photo Grid - Responsive Masonry-style Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {photos.map((photo, index) => (
            <article
              key={index}
              className="group relative bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              aria-label={`View ${photo.title} in fullscreen`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(index);
                }
              }}
            >
              {/* Image Container */}
              <div className="relative h-80 w-full overflow-hidden bg-gray-100">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index === 0}
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-white">
                    <h3 className="text-lg font-semibold mb-1">{photo.title}</h3>
                    <p className="text-sm">{photo.description}</p>
                  </div>
                </div>

                {/* Click indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 rounded-full p-3 shadow-lg">
                    <svg className="w-8 h-8 text-[#8b7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Photo metadata */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{photo.title}</h3>
                <p className="text-sm text-gray-600">{photo.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Lightbox */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={slides}
          index={currentImageIndex}
          on={{
            view: ({ index }) => setCurrentImageIndex(index),
          }}
          carousel={{
            finite: photos.length <= 1,
          }}
          render={{
            slide: ({ slide }) => (
              <div className="flex flex-col items-center justify-center h-full">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="max-h-[80vh] max-w-full object-contain"
                />
                {slide.title && (
                  <div className="mt-4 text-center px-4">
                    <h3 className="text-xl font-semibold text-white mb-2">{slide.title}</h3>
                    {slide.description && (
                      <p className="text-sm text-white/80">{slide.description}</p>
                    )}
                  </div>
                )}
              </div>
            ),
          }}
          styles={{
            container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
          }}
        />

        {/* Instructions section */}
        <div className="mt-12 text-center bg-white rounded-lg p-8 max-w-2xl mx-auto shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-[#8b7355]">{t('gallery.instructions.title')}</h3>
          <p className="text-gray-700 mb-4">
            {t('gallery.instructions.intro')}
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#8b7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>Click to view fullscreen</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#8b7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <span>Navigate with keyboard</span>
            </div>
          </div>
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
