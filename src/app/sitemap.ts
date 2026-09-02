import type { MetadataRoute } from 'next';
import { RECIPES, getRegions } from '@/content';

const BASE = 'https://pitlog.app';
const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const beefRegions = getRegions('beef').map((r) => ({
    url: `${BASE}/cuts/beef/${r.slug}`,
    lastModified: new Date(r.updated_at),
    changeFrequency: 'monthly' as const,
    priority: r.slug === 'brisket' ? 0.9 : 0.8,
  }));
  const recipes = RECIPES.filter((r) => r.status !== 'PLANNED' && r.status !== 'RETIRED').map((r) => ({
    url: `${BASE}/recipes/${r.slug}`,
    lastModified: new Date(r.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
  return [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    // Content spine hubs
    { url: `${BASE}/cuts`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/cuts/beef`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    ...beefRegions,
    { url: `${BASE}/temperatures`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/woods`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/recipes`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    ...recipes,
    // Existing pages
    { url: `${BASE}/library`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/free-download`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/support`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/smoking-times-temperatures`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/traeger-recipes`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/pit-boss-recipes`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/smoker-recipes`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/pellet-smoker-recipes`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/smoked-meat-recipes`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];
}
