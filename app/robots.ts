import { MetadataRoute } from 'next'

/**
 * robots.ts - Configures search engine crawling rules
 *
 * This file generates the robots.txt file that tells search engines
 * which pages they can and cannot crawl on the memorial website.
 *
 * Next.js 15 automatically generates robots.txt from this file.
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Rules for all search engines
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // Disallow API routes
          '/_next/',         // Disallow Next.js internal files
          '/admin',          // Disallow admin areas if any exist
        ],
      },
      {
        // Specific rules for Google bot
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        // Specific rules for Bing bot
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: 'https://joelle-shekinah-memorial.vercel.app/sitemap.xml', // Update with actual URL after deployment
    // Alternative format if deploying to a custom domain:
    // sitemap: 'https://www.your-domain.com/sitemap.xml',
  }
}
