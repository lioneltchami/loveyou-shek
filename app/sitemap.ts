import { MetadataRoute } from 'next'

/**
 * sitemap.ts - Generates XML sitemap for search engines
 *
 * This file creates a sitemap.xml that helps search engines discover
 * and index all pages on the memorial website efficiently.
 *
 * Next.js 15 automatically generates sitemap.xml from this file.
 *
 * Update the baseUrl after deployment to your actual domain.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  // Update this with your actual deployed URL
  const baseUrl = 'https://joelle-shekinah-memorial.vercel.app'

  // Get current date for lastModified
  const currentDate = new Date()

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'monthly', // Memorial content changes occasionally
      priority: 1.0, // Homepage has highest priority
      alternates: {
        languages: {
          en: `${baseUrl}?lang=en`,
          fr: `${baseUrl}?lang=fr`,
        },
      },
    },
    // If you add additional pages in the future, add them here:
    // {
    //   url: `${baseUrl}/gallery`,
    //   lastModified: currentDate,
    //   changeFrequency: 'weekly',
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/testimonials`,
    //   lastModified: currentDate,
    //   changeFrequency: 'daily',
    //   priority: 0.7,
    // },
  ]
}

/**
 * NOTES:
 *
 * Priority values (0.0 - 1.0):
 * - 1.0: Most important (homepage)
 * - 0.8: High priority (main sections)
 * - 0.5: Medium priority (secondary content)
 * - 0.3: Lower priority (archives, older content)
 *
 * Change Frequency options:
 * - 'always': Changes on every access (rarely used)
 * - 'hourly': Changes hourly (real-time content)
 * - 'daily': Changes daily (news, blogs)
 * - 'weekly': Changes weekly (regular updates)
 * - 'monthly': Changes monthly (stable content)
 * - 'yearly': Changes yearly (archived content)
 * - 'never': Static content that won't change
 *
 * After deployment:
 * 1. Test your sitemap at: https://your-domain.com/sitemap.xml
 * 2. Submit to Google Search Console: https://search.google.com/search-console
 * 3. Submit to Bing Webmaster Tools: https://www.bing.com/webmasters
 */
