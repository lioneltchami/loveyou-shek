"use client";

import { useEffect } from 'react';
import { onCLS, onFCP, onLCP, onTTFB, onINP, Metric } from 'web-vitals';

/**
 * Web Vitals Component
 *
 * Monitors and reports Core Web Vitals metrics for performance tracking.
 *
 * Metrics tracked:
 * - CLS (Cumulative Layout Shift): Visual stability - target < 0.1
 * - INP (Interaction to Next Paint): Responsiveness - target < 200ms (replaces FID)
 * - FCP (First Contentful Paint): Loading speed - target < 1.8s
 * - LCP (Largest Contentful Paint): Loading performance - target < 2.5s
 * - TTFB (Time to First Byte): Server response time - target < 600ms
 *
 * Note: FID (First Input Delay) has been deprecated in favor of INP.
 *
 * In production, these metrics can be sent to analytics services.
 * Currently logs to console for development monitoring.
 */

// Function to send metrics to analytics endpoint (configure for production)
function sendToAnalytics(metric: Metric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
    });
  }

  // In production, send to your analytics service
  // Examples:
  //
  // Google Analytics 4:
  // if (window.gtag) {
  //   window.gtag('event', metric.name, {
  //     value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
  //     metric_id: metric.id,
  //     metric_value: metric.value,
  //     metric_delta: metric.delta,
  //   });
  // }
  //
  // Vercel Analytics:
  // if (window.va) {
  //   window.va('event', {
  //     name: metric.name,
  //     data: {
  //       value: metric.value,
  //       rating: metric.rating,
  //     },
  //   });
  // }
  //
  // Custom endpoint:
  // fetch('/api/analytics', {
  //   method: 'POST',
  //   body: JSON.stringify(metric),
  //   headers: { 'Content-Type': 'application/json' },
  // });
}

export default function WebVitals() {
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;

    // Core Web Vitals (Google's main metrics)
    onCLS(sendToAnalytics);  // Cumulative Layout Shift
    onLCP(sendToAnalytics);  // Largest Contentful Paint
    onINP(sendToAnalytics);  // Interaction to Next Paint (replaced FID)

    // Additional important metrics
    onFCP(sendToAnalytics);  // First Contentful Paint
    onTTFB(sendToAnalytics); // Time to First Byte

  }, []);

  // This component doesn't render anything visible
  return null;
}

/**
 * Web Vitals Thresholds (Google standards):
 *
 * LCP (Largest Contentful Paint):
 *   - Good: < 2.5 seconds
 *   - Needs Improvement: 2.5 - 4.0 seconds
 *   - Poor: > 4.0 seconds
 *
 * INP (Interaction to Next Paint):
 *   - Good: < 200 milliseconds
 *   - Needs Improvement: 200 - 500 milliseconds
 *   - Poor: > 500 milliseconds
 *
 * CLS (Cumulative Layout Shift):
 *   - Good: < 0.1
 *   - Needs Improvement: 0.1 - 0.25
 *   - Poor: > 0.25
 *
 * FCP (First Contentful Paint):
 *   - Good: < 1.8 seconds
 *   - Needs Improvement: 1.8 - 3.0 seconds
 *   - Poor: > 3.0 seconds
 *
 * TTFB (Time to First Byte):
 *   - Good: < 600 milliseconds
 *   - Needs Improvement: 600 - 1500 milliseconds
 *   - Poor: > 1500 milliseconds
 *
 * Note: FID (First Input Delay) was deprecated in 2024 and replaced by INP.
 */
