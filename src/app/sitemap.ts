import type { MetadataRoute } from 'next';

const BASE = 'https://www.pitlog.app';
const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/library`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/free-download`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/support`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    // SEO content pages
    { url: `${BASE}/smoking-times-temperatures`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/traeger-recipes`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/pit-boss-recipes`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/smoker-recipes`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/pellet-smoker-recipes`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/smoked-meat-recipes`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];
}
