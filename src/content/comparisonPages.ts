/**
 * Cut comparison pages: /cuts/compare/[pair].
 *
 * A different intent from the temperature answers. "Pork shoulder vs pork
 * butt" is not asking for a number, it is asking which cut is which at the
 * counter, and the honest answer is that they are not two alternatives at all:
 * one contains the other. A page that treats them as rivals gets it wrong no
 * matter how good the temperatures on it are.
 *
 * DataForSEO Google US, read 2026-09-03. The five phrasings below all report
 * 12,100 with the same competition and CPC, which is what DataForSEO does when
 * variants share one SERP, so they are ONE query and not 60,500:
 *
 *   pork shoulder vs pork butt   12,100  KD 0
 *   pork shoulder vs butt        12,100  KD 0
 *   boston butt vs pork butt     12,100  KD 1
 *   pork butt vs boston butt     12,100  KD 2
 *   boston butt vs pork shoulder 12,100  KD 2
 *
 * Same rule as the temperature registry: no figure is typed here. Every value
 * comes from a record, resolveComparison() throws at import on a bad ref, and
 * the copy functions receive resolved records.
 */
import {
  getAnimal,
  getPitmasterTarget,
  getRegion,
  getSafetyMinimum,
  type Animal,
  type AnimalSlug,
  type CutRegion,
  type PitmasterTarget,
  type RetailCut,
  type SafetyMinimum,
} from '@/content';

/**
 * One side of the comparison. A side is either a whole region (pork butt) or
 * one retail cut inside a region (brisket flat), because the questions people
 * ask do not respect that boundary.
 */
export interface ComparisonSide {
  label: string;
  region: string;
  cut?: string;
}

export interface ResolvedSide {
  label: string;
  region: CutRegion;
  cut?: RetailCut;
  target?: PitmasterTarget;
}

/** Attributes the table can compare. Each resolves from the side's records. */
export type CompareAttr = 'where' | 'scores' | 'methods' | 'finish' | 'planning' | 'rest' | 'slice' | 'note';

export interface ComparisonContext {
  animal: Animal;
  safety: SafetyMinimum;
  sides: ResolvedSide[];
  regions: CutRegion[];
}

export interface ComparisonCopy {
  title: string;
  description: string;
  h1: string;
  question: string;
  /** The verdict, first thing on the page. */
  answer: string;
  /** Why the confusion exists, in the reader's terms. */
  why: string;
  /** What to actually buy. */
  buying: string;
}

export interface ComparisonPage {
  slug: string;
  animal: AnimalSlug;
  /** Short name for breadcrumbs and link rows. */
  name: string;
  sides: ComparisonSide[];
  /**
   * Rows to print, in order. A row whose value is the same on every side is
   * still worth printing here, because "these two cook identically" is half of
   * what the reader came to find out. The renderer collapses those into one
   * cell so they cannot masquerade as a difference.
   */
  rows: CompareAttr[];
  /** Extra regions whose records the page cites but does not compare. */
  alsoRegions?: string[];
  /** The sub-cut temperature page to send the reader to once they have chosen. */
  nextCut?: { cut: string; label: string };
  copy: (ctx: ComparisonContext) => ComparisonCopy;
}

export const COMPARISON_PAGES: ComparisonPage[] = [
  {
    slug: 'pork-butt-vs-pork-shoulder',
    animal: 'pork',
    name: 'Pork butt vs pork shoulder',
    sides: [
      { label: 'Pork butt (Boston butt)', region: 'butt' },
      { label: 'Picnic shoulder', region: 'picnic-shoulder' },
    ],
    rows: ['where', 'scores', 'methods', 'finish', 'planning', 'rest', 'slice'],
    alsoRegions: ['hock'],
    nextCut: { cut: 'pulled', label: 'pulled pork temperature page' },
    copy: ({ animal, sides, safety }) => {
      const [butt] = sides;
      const t = butt.target;
      const primals = animal.fsis_primals.join(', ');
      return {
        title: 'Pork Butt vs Pork Shoulder: One Contains the Other',
        description: `They are not two cuts. USDA FSIS counts one shoulder primal, and the butt sits inside it along with the picnic. Boston butt and pork butt are the same thing.`,
        h1: 'Pork butt vs pork shoulder.',
        question: 'What is the difference between pork butt and pork shoulder?',
        answer: `They are not two alternatives. "Pork shoulder" is the whole front leg and the meat above it, and USDA FSIS counts it as one of ${animal.fsis_primals.length} pork primals (${primals}). The butt sits inside that primal, and so does the picnic below it. So a pork butt is a pork shoulder, but a pork shoulder is not necessarily a pork butt. Boston butt and pork butt are two names for that same upper half, and neither has anything to do with the back end of the pig.`,
        why: `The naming is historical, not anatomical. Both halves cook the same way and finish at the same temperature, which is why recipes use the words interchangeably and get away with it. What separates them is shape, skin and price, and the table below has the specifics on each.`,
        buying: `For pulled pork, buy the butt. It is squarer, easier to trim, and the blade bone gives you the ${t?.finish_test?.replace(/_/g, ' ')} test that tells you when it is done. Take the picnic if it is cheaper or you want the skin for crackling, and expect to spend longer trimming. A label reading "whole shoulder" is both halves together, which is a long cook and a lot of meat. Either way the safety floor is ${safety.temp_f} F and the tenderness comes much later.`,
      };
    },
  },
];

export function getComparisonPage(slug: string): ComparisonPage | undefined {
  return COMPARISON_PAGES.find((p) => p.slug === slug);
}

export function comparisonPagesFor(animal: string): ComparisonPage[] {
  return COMPARISON_PAGES.filter((p) => p.animal === animal);
}

/** Resolve every ref. Throws with the list of what failed, so the build fails. */
export function resolveComparison(p: ComparisonPage): ComparisonContext {
  const missing: string[] = [];
  const animal = getAnimal(p.animal);
  if (!animal) missing.push(`animal ${p.animal}`);

  const sides: (ResolvedSide | undefined)[] = p.sides.map((s) => {
    const region = getRegion(p.animal, s.region);
    if (!region) missing.push(`region ${p.animal}/${s.region}`);
    const cut = s.cut ? region?.retail_cuts.find((c) => c.slug === s.cut) : undefined;
    if (s.cut && !cut) missing.push(`retail cut ${p.animal}/${s.region}/${s.cut}`);
    const target = getPitmasterTarget(region?.tenderness_target_ref);
    return region ? { label: s.label, region, cut, target } : undefined;
  });

  const also = (p.alsoRegions ?? []).map((slug) => {
    const r = getRegion(p.animal, slug);
    if (!r) missing.push(`region ${p.animal}/${slug}`);
    return r;
  });

  const safety = animal ? getSafetyMinimum(animal.safety_ref) : undefined;
  if (!safety) missing.push(`safety for ${p.animal}`);
  if (missing.length) throw new Error(`comparisonPages: /cuts/compare/${p.slug} has unresolved refs: ${missing.join(', ')}`);

  const resolved = sides.filter((s): s is ResolvedSide => !!s);
  const regions: CutRegion[] = [];
  for (const r of [...resolved.map((s) => s.region), ...also.filter((r): r is CutRegion => !!r)]) {
    if (!regions.some((x) => x.slug === r.slug)) regions.push(r);
  }
  return { animal: animal!, safety: safety!, sides: resolved, regions };
}

// Fail the build, not the reader.
for (const p of COMPARISON_PAGES) resolveComparison(p);
