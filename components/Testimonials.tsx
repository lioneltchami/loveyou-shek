"use client";

import { useState, useEffect, FormEvent } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  doc,
  Timestamp
} from 'firebase/firestore';
import { Filter } from 'bad-words';
import { useLanguage } from '@/contexts/LanguageContext';

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

export default function Testimonials() {
  const { t } = useLanguage();

  // Form state
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Real-time testimonials listener
  useEffect(() => {
    // Check if Firebase is properly configured
    const isFirebaseConfigured = process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
                                   process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'YOUR_API_KEY';

    if (!isFirebaseConfigured) {
      console.warn('Firebase not configured. Please set up .env.local with your Firebase credentials.');
      setIsLoading(false);
      return;
    }

    // Set a timeout to stop loading if Firebase takes too long
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5 second timeout

    const testimonialsRef = collection(db, 'testimonials');
    const q = query(testimonialsRef, orderBy('createdAt', 'desc'));

    // Subscribe to real-time updates
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
          approved: data.approved !== false, // Auto-approve unless explicitly marked false
        });
      });
      setTestimonials(testimonialsData);
      setIsLoading(false);
    }, (error) => {
      clearTimeout(loadingTimeout);
      console.error('Error fetching testimonials:', error);
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      clearTimeout(loadingTimeout);
      unsubscribe();
    };
  }, []);

  // Rate limiting check (client-side)
  const checkRateLimit = (): boolean => {
    const lastSubmissionTime = localStorage.getItem('lastTestimonialSubmission');
    if (lastSubmissionTime) {
      const timeSinceLastSubmission = Date.now() - parseInt(lastSubmissionTime);
      const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

      if (timeSinceLastSubmission < oneHour) {
        const minutesRemaining = Math.ceil((oneHour - timeSinceLastSubmission) / 60000);
        setErrorMessage(`Please wait ${minutesRemaining} minutes before submitting another testimonial.`);
        return false;
      }
    }
    return true;
  };

  // Spam detection: check for URLs
  const containsURL = (text: string): boolean => {
    const urlPattern = /(https?:\/\/|www\.|\.[a-z]{2,}\/|\.com|\.net|\.org)/i;
    return urlPattern.test(text);
  };

  // Character limit check
  const isWithinCharacterLimit = (text: string): boolean => {
    const wordCount = text.trim().split(/\s+/).length;
    return wordCount <= 500;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    setErrorMessage('');

    // Validation
    if (!name.trim() || !relationship.trim() || !message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      setSubmitStatus('error');
      return;
    }

    // Rate limiting check
    if (!checkRateLimit()) {
      setSubmitStatus('error');
      return;
    }

    // Character limit check
    if (!isWithinCharacterLimit(message)) {
      setErrorMessage('Your message is too long. Please keep it under 500 words.');
      setSubmitStatus('error');
      return;
    }

    // Profanity check
    if (filter.isProfane(name) || filter.isProfane(relationship) || filter.isProfane(message)) {
      setErrorMessage('Your submission contains inappropriate language. Please revise and resubmit.');
      setSubmitStatus('error');
      return;
    }

    // URL/Spam check
    if (containsURL(message) || containsURL(name)) {
      setErrorMessage('Links are not allowed in testimonials. Please remove any URLs.');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Add testimonial to Firestore
      await addDoc(collection(db, 'testimonials'), {
        name: name.trim(),
        relationship: relationship.trim(),
        message: message.trim(),
        email: email.trim() || null,
        createdAt: serverTimestamp(),
        approved: true, // Auto-approve since we have spam filters
      });

      // Update rate limiting timestamp
      localStorage.setItem('lastTestimonialSubmission', Date.now().toString());

      // Reset form
      setName('');
      setRelationship('');
      setMessage('');
      setEmail('');
      setSubmitStatus('success');

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);

    } catch (error) {
      console.error('Error submitting testimonial:', error);
      setErrorMessage('An error occurred while submitting your testimonial. Please try again.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete (admin only - SECURE VERSION using API route)
  const handleDelete = async (testimonialId: string) => {
    // Confirm deletion
    if (!window.confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }

    const password = prompt('Enter admin password to delete this testimonial:');

    if (!password) {
      return; // User cancelled
    }

    try {
      // Call secure API route instead of exposing password in client code
      const response = await fetch('/api/testimonials/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Password': password, // Send via secure header
        },
        body: JSON.stringify({ testimonialId }),
      });

      if (response.ok) {
        alert('Testimonial deleted successfully.');
        // Testimonial will be removed automatically via realtime listener
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Error deleting testimonial. Please check your password.');
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      alert('Error deleting testimonial. Please try again.');
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

        {/* Submission Form */}
        <div className="max-w-2xl mx-auto mb-16">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg p-8"
            aria-label="Submit a testimonial form"
            noValidate
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent outline-none transition-all"
                placeholder={t('testimonials.form.emailPlaceholder')}
                maxLength={100}
              />
            </div>

            {/* Message field */}
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                {t('testimonials.form.messageLabel')} <span className="text-red-500" aria-label="required">*</span>
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent outline-none transition-all resize-none"
                placeholder={t('testimonials.form.messagePlaceholder')}
                required
                maxLength={5000}
                aria-describedby="message-word-count"
                aria-invalid={submitStatus === 'error' && !message.trim()}
              />
              <p id="message-word-count" className="text-sm text-gray-500 mt-1" aria-live="polite">
                {message.trim().split(/\s+/).filter(w => w.length > 0).length} / 500 {t('testimonials.form.wordsLabel')}
              </p>
            </div>

            {/* Status messages */}
            {submitStatus === 'success' && (
              <div
                className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800"
                role="alert"
                aria-live="polite"
              >
                <p className="font-medium">{t('testimonials.form.successMessage')}</p>
                <p className="text-sm mt-1">{t('testimonials.form.successSubMessage')}</p>
              </div>
            )}

            {submitStatus === 'error' && errorMessage && (
              <div
                className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800"
                role="alert"
                aria-live="assertive"
              >
                <p className="font-medium">{t('testimonials.form.error')}</p>
                <p className="text-sm mt-1">{errorMessage}</p>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#8b7355] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#6f5a43] transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-[#8b7355]/50"
              aria-label={isSubmitting ? t('testimonials.form.submittingButton') : t('testimonials.form.submitButton')}
            >
              {isSubmitting ? t('testimonials.form.submittingButton') : t('testimonials.form.submitButton')}
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              {t('testimonials.form.disclaimer')}
            </p>
          </form>
        </div>

        {/* Display Testimonials */}
        <div className="max-w-4xl mx-auto">
          <h3 id="testimonials-list-heading" className="text-3xl font-bold text-center mb-8 text-gray-800">
            {t('testimonials.display.title')}
          </h3>

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
                      {/* Admin delete button - shows on card hover */}
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
