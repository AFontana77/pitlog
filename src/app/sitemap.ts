import type { MetadataRoute } from 'next';
import { ANIMALS, RECIPES, getRegions } from '@/content';

const BASE = 'https://pitlog.app';
const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const animalHubs = ANIMALS.map((a) => ({
    url: `${BASE}/cuts/${a.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));
  const animalTemps = ANIMALS.map((a) => ({
    url: `${BASE}/temperatures/${a.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));
  const beefRegions = ANIMALS.flatMap((a) =>
    getRegions(a.slug).map((r) => ({
      url: `${BASE}/cuts/${a.slug}/${r.slug}`,
      lastModified: new Date(r.updated_at),
      changeFrequency: 'monthly' as const,
      priority: r.slug === 'brisket' || r.slug === 'butt' || r.slug === 'thigh' ? 0.9 : 0.8,
    })),
  );
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
    ...animalHubs,
    ...beefRegions,
    { url: `${BASE}/temperatures`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    ...animalTemps,
    { url: `${BASE}/woods`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/recipes`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    ...recipes,
    { url: `${BASE}/sources`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
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
