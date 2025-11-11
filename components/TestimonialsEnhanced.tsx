"use client";

import { useState, useEffect, useActionState } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { Filter } from 'bad-words';
import { useLanguage } from '@/contexts/LanguageContext';
import SubmitButton from './SubmitButton';
import jsPDF from 'jspdf';

// Initialize profanity filter
const filter = new Filter();

// TypeScript interface for testimonial data
interface Testimonial {
  id: string;
  name: string;
  relationship: string;
  message: string;
  email?: string;
  createdAt: Timestamp;
  approved: boolean;
}

// Form state interface for React 19 useActionState
interface FormState {
  status: 'idle' | 'success' | 'error';
  message?: string;
}

export default function TestimonialsEnhanced() {
  const { t } = useLanguage();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  // React 19 useActionState for form handling
  const [formState, formAction] = useActionState<FormState, FormData>(
    async (prevState: FormState, formData: FormData) => {
      const name = formData.get('name') as string;
      const relationship = formData.get('relationship') as string;
      const message = formData.get('message') as string;
      const email = formData.get('email') as string;

      // Validation
      if (!name?.trim() || !relationship?.trim() || !message?.trim()) {
        return {
          status: 'error' as const,
          message: 'Please fill in all required fields.'
        };
      }

      // Rate limiting check
      const lastSubmissionTime = localStorage.getItem('lastTestimonialSubmission');
      if (lastSubmissionTime) {
        const timeSinceLastSubmission = Date.now() - parseInt(lastSubmissionTime);
        const oneHour = 60 * 60 * 1000;
        if (timeSinceLastSubmission < oneHour) {
          const minutesRemaining = Math.ceil((oneHour - timeSinceLastSubmission) / 60000);
          return {
            status: 'error' as const,
            message: `Please wait ${minutesRemaining} minutes before submitting another testimonial.`
          };
        }
      }

      // Character limit check
      const wordCount = message.trim().split(/\s+/).length;
      if (wordCount > 500) {
        return {
          status: 'error' as const,
          message: 'Your message is too long. Please keep it under 500 words.'
        };
      }

      // Profanity check
      if (filter.isProfane(name) || filter.isProfane(relationship) || filter.isProfane(message)) {
        return {
          status: 'error' as const,
          message: 'Your submission contains inappropriate language. Please revise and resubmit.'
        };
      }

      // URL/Spam check
      const urlPattern = /(https?:\/\/|www\.|\.[a-z]{2,}\/|\.com|\.net|\.org)/i;
      if (urlPattern.test(message) || urlPattern.test(name)) {
        return {
          status: 'error' as const,
          message: 'Links are not allowed in testimonials. Please remove any URLs.'
        };
      }

      try {
        // Add testimonial to Firestore
        await addDoc(collection(db, 'testimonials'), {
          name: name.trim(),
          relationship: relationship.trim(),
          message: message.trim(),
          email: email?.trim() || null,
          createdAt: serverTimestamp(),
          approved: true,
        });

        // Update rate limiting timestamp
        localStorage.setItem('lastTestimonialSubmission', Date.now().toString());

        return {
          status: 'success' as const,
          message: 'Thank you for sharing your memory! Your testimonial has been submitted successfully.'
        };
      } catch (error) {
        console.error('Error submitting testimonial:', error);
        return {
          status: 'error' as const,
          message: 'An error occurred while submitting your testimonial. Please try again.'
        };
      }
    },
    { status: 'idle' }
  );

  // Real-time testimonials listener
  useEffect(() => {
    const isFirebaseConfigured = process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
                                   process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'YOUR_API_KEY';

    if (!isFirebaseConfigured) {
      console.warn('Firebase not configured. Please set up .env.local with your Firebase credentials.');
      setIsLoading(false);
      return;
    }

    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    const testimonialsRef = collection(db, 'testimonials');
    const q = query(testimonialsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      clearTimeout(loadingTimeout);
      const testimonialsData: Testimonial[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        testimonialsData.push({
          id: doc.id,
          name: data.name,
          relationship: data.relationship,
          message: data.message,
          email: data.email,
          createdAt: data.createdAt,
          approved: data.approved !== false,
        });
      });
      setTestimonials(testimonialsData);
      setIsLoading(false);
    }, (error) => {
      clearTimeout(loadingTimeout);
      console.error('Error fetching testimonials:', error);
      setIsLoading(false);
    });

    return () => {
      clearTimeout(loadingTimeout);
      unsubscribe();
    };
  }, []);

  // Handle delete (admin only)
  const handleDelete = async (testimonialId: string) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }

    const password = prompt('Enter admin password to delete this testimonial:');
    if (!password) return;

    try {
      const response = await fetch('/api/testimonials/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Password': password,
        },
        body: JSON.stringify({ testimonialId }),
      });

      if (response.ok) {
        alert('Testimonial deleted successfully.');
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Error deleting testimonial. Please check your password.');
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      alert('Error deleting testimonial. Please try again.');
    }
  };

  // Export testimonials to PDF
  const exportToPDF = async () => {
    if (testimonials.length === 0) {
      alert('No testimonials to export.');
      return;
    }

    setIsExporting(true);

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - 2 * margin;
      let yPosition = margin;

      // Title
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('In Loving Memory of', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 10;
      doc.text('Joëlle Shekinah Tchami', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 8;

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text('December 19, 1983 - October 2025', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 15;

      // Subtitle
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Memories & Testimonials', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 10;

      // Add each testimonial
      for (let i = 0; i < testimonials.length; i++) {
        const testimonial = testimonials[i];

        // Check if we need a new page
        if (yPosition > pageHeight - 40) {
          doc.addPage();
          yPosition = margin;
        }

        // Testimonial header
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(testimonial.name, margin, yPosition);
        yPosition += 5;

        doc.setFontSize(9);
        doc.setFont('helvetica', 'italic');
        doc.text(testimonial.relationship, margin, yPosition);
        yPosition += 3;

        // Date
        const date = testimonial.createdAt?.toDate()?.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) || 'Just now';
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text(date, margin, yPosition);
        yPosition += 7;

        // Message
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const lines = doc.splitTextToSize(testimonial.message, maxWidth);

        // Check if message fits on current page
        if (yPosition + (lines.length * 5) > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }

        doc.text(lines, margin, yPosition);
        yPosition += (lines.length * 5) + 10;

        // Add separator
        if (i < testimonials.length - 1) {
          doc.setDrawColor(200, 200, 200);
          doc.line(margin, yPosition, pageWidth - margin, yPosition);
          yPosition += 10;
        }
      }

      // Footer on last page
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'italic');
        doc.text(
          `Page ${i} of ${totalPages} | Generated on ${new Date().toLocaleDateString()}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: 'center' }
        );
      }

      // Save PDF
      const fileName = `Joelle-Shekinah-Memorial-Testimonials-${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);

      alert(`Successfully exported ${testimonials.length} testimonials to PDF!`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('An error occurred while generating the PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Format timestamp for display
  const formatDate = (timestamp: Timestamp | null): string => {
    if (!timestamp) return 'Just now';
    try {
      const date = timestamp.toDate();
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Just now';
    }
  };

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-b from-[#f5f3f0] to-white"
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto px-4">
        <h2 id="testimonials-heading" className="text-4xl font-bold text-center mb-4 text-[#8b7355]">
          {t('testimonials.title')}
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          {t('testimonials.subtitle')}
        </p>

        {/* Submission Form with React 19 Form Actions */}
        <div className="max-w-2xl mx-auto mb-16">
          <form
            action={formAction}
            className="bg-white rounded-lg shadow-lg p-8"
            aria-label="Submit a testimonial form"
          >
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">{t('testimonials.form.title')}</h3>

            {/* Name field */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                {t('testimonials.form.nameLabel')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent outline-none transition-all"
                placeholder={t('testimonials.form.namePlaceholder')}
                required
                maxLength={100}
              />
            </div>

            {/* Relationship field */}
            <div className="mb-4">
              <label htmlFor="relationship" className="block text-gray-700 font-medium mb-2">
                {t('testimonials.form.relationshipLabel')} <span className="text-red-500">*</span>
              </label>
              <select
                id="relationship"
                name="relationship"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent outline-none transition-all bg-white"
                required
              >
                <option value="">{t('testimonials.form.relationshipPlaceholder')}</option>
                <option value="Daughter">Daughter</option>
                <option value="Son">Son</option>
                <option value="Brother">Brother</option>
                <option value="Sister">Sister</option>
                <option value="Friend">Friend</option>
                <option value="Professional Colleague">Professional Colleague</option>
                <option value="Classmate">Classmate</option>
                <option value="Aunt">Aunt</option>
                <option value="Uncle">Uncle</option>
                <option value="Cousin">Cousin</option>
                <option value="Niece">Niece</option>
                <option value="Nephew">Nephew</option>
                <option value="Neighbor">Neighbor</option>
                <option value="Church Member">Church Member</option>
                <option value="Student">Student</option>
                <option value="Acquaintance">Acquaintance</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Email field (optional) */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                {t('testimonials.form.emailLabel')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent outline-none transition-all"
                placeholder={t('testimonials.form.emailPlaceholder')}
                maxLength={100}
              />
            </div>

            {/* Message field */}
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                {t('testimonials.form.messageLabel')} <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent outline-none transition-all resize-none"
                placeholder={t('testimonials.form.messagePlaceholder')}
                required
                maxLength={5000}
              />
              <p className="text-sm text-gray-500 mt-1">
                Maximum 500 {t('testimonials.form.wordsLabel')}
              </p>
            </div>

            {/* Status messages */}
            {formState.status === 'success' && (
              <div
                className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800"
                role="alert"
              >
                <p className="font-medium">{formState.message}</p>
              </div>
            )}

            {formState.status === 'error' && formState.message && (
              <div
                className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800"
                role="alert"
              >
                <p className="font-medium">{t('testimonials.form.error')}</p>
                <p className="text-sm mt-1">{formState.message}</p>
              </div>
            )}

            {/* Submit button with React 19 useFormStatus */}
            <SubmitButton
              label={t('testimonials.form.submitButton')}
              submittingLabel={t('testimonials.form.submittingButton')}
            />

            <p className="text-xs text-gray-500 mt-4 text-center">
              {t('testimonials.form.disclaimer')}
            </p>
          </form>
        </div>

        {/* Display Testimonials */}
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h3 id="testimonials-list-heading" className="text-3xl font-bold text-gray-800">
              {t('testimonials.display.title')}
            </h3>

            {/* Export to PDF Button */}
            {testimonials.length > 0 && (
              <button
                onClick={exportToPDF}
                disabled={isExporting}
                className="flex items-center gap-2 bg-[#8b7355] text-white px-4 py-2 rounded-lg hover:bg-[#6f5a43] transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                aria-label="Export testimonials to PDF"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {isExporting ? 'Generating PDF...' : 'Export to PDF'}
              </button>
            )}
          </div>

          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md" role="status">
              <p className="text-gray-600 text-lg">
                {(process.env.NEXT_PUBLIC_FIREBASE_API_KEY === 'YOUR_API_KEY' || !process.env.NEXT_PUBLIC_FIREBASE_API_KEY)
                  ? t('testimonials.display.notConfigured')
                  : t('testimonials.display.noTestimonials')}
              </p>
            </div>
          ) : (
            <div className="space-y-6" role="list" aria-labelledby="testimonials-list-heading">
              {testimonials.map((testimonial) => (
                <article
                  key={testimonial.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 group"
                  role="listitem"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600 italic">
                        {testimonial.relationship}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-gray-500">
                        {formatDate(testimonial.createdAt)}
                      </p>
                      <button
                        onClick={() => handleDelete(testimonial.id)}
                        className="text-xs text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200 ml-2 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                        aria-label={`Delete testimonial from ${testimonial.name} (Admin only)`}
                        title="Delete (Admin only)"
                      >
                        <span aria-hidden="true">🗑️</span>
                        <span className="sr-only">Delete</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {testimonial.message}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
