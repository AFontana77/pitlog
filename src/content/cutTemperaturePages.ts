/**
 * Sub-cut temperature answer pages: /temperatures/[animal]/[cut].
 *
 * Built 2026-09-02 from the day-2 DataForSEO set. Each page exists because
 * the query has its own SERP and its own record set, not because the animal
 * page lacked the number:
 *
 *   pork chop internal temp        49,500/mo  KD 14
 *   pork tenderloin internal temp  33,100/mo  KD 0
 *   chicken breast internal temp   27,100/mo  KD 6
 *   chicken thigh internal temp    18,100/mo  KD 14
 *   ribs internal temp              9,900/mo  KD 0  (+ pork ribs internal temp 9,900)
 *   ground beef internal temp       8,100/mo  KD 13
 *   tri tip internal temp           6,600/mo  KD 0  (+ reverse sear tri tip 6,600)
 *   pulled pork internal temp       4,400/mo  KD 0  (+ what/when to wrap pork butt
 *                                                    2,900 each, what temp to pull
 *                                                    pork butt 1,600, pork butt
 *                                                    stall temp 1,000)
 *
 * Every figure on these pages is interpolated from a record in content/.
 * The copy functions below receive resolved records and never carry a typed
 * temperature. `resolveCutPage()` throws at import if a ref does not resolve,
 * so a broken registry fails `next build` instead of rendering a blank.
 */
import {
  getAnimal,
  getPitmasterTarget,
  getRegion,
  getSafetyMinimum,
  renderableDoneness,
  type Animal,
  type AnimalSlug,
  type CulinaryDoneness,
  type CutRegion,
  type DonenessTier,
  type PitmasterTarget,
  type RetailCut,
  type SafetyMinimum,
} from '@/content';

export interface CutTemperatureContext {
  animal: Animal;
  safety: SafetyMinimum;
  /** A second safety floor printed beside the first, when the page needs the contrast. */
  secondary?: SafetyMinimum;
  primary: CutRegion;
  regions: CutRegion[];
  cuts: { region: CutRegion; cut: RetailCut }[];
  targets: PitmasterTarget[];
  /** Resolved crossTargets, in registry order, so copy can cite their figures. */
  cross: PitmasterTarget[];
  doneness: CulinaryDoneness[];
}

export interface CutCopy {
  title: string;
  description: string;
  h1: string;
  question: string;
  intro: string;
  probe: string;
}

export interface CutTemperaturePage {
  animal: AnimalSlug;
  cut: string;
  /** Short name used in link lists and breadcrumbs. */
  name: string;
  /** Region that supplies planning time, rest, mistakes and recipes. */
  primary: string;
  /** Retail cuts rendered, in order. May span regions (ribs do). */
  cuts: { region: string; slug: string }[];
  /**
   * Safety floor that leads the page. Defaults to the animal's whole-muscle
   * ref. The ground beef page overrides it: a burger is 160 F, and printing
   * the 145 F whole-muscle rule first on a page about ground beef would put
   * the wrong number in the answer position.
   */
  primarySafetyRef?: string;
  /**
   * A second floor printed beside the first. Defaults to the animal's ground
   * ref when the page lists a ground cut, which is how a whole-muscle page
   * that happens to include ground meat picks up 160 F.
   */
  secondarySafetyRef?: string;
  targets: string[];
  doneness: string[];
  /**
   * Whether to print the primary region's planning time, rest, slice direction
   * and common mistakes. Default true. The ground beef page sets it false: its
   * primary region is chuck, and chuck's guidance is about a smoked roast, so
   * the page would tell you to rest a burger 30 to 60 minutes and slice it
   * across the grain. There is no ground-beef planning record to put there
   * instead, and inventing one is worse than printing none.
   */
  regionGuidance?: boolean;
  /**
   * A related tenderness record, labelled as what it is. `href` is optional:
   * the beef target on the ribs page has a cut guide to link to, the stall on
   * the pulled pork page is a concept and has none.
   */
  crossTargets?: { id: string; label: string; href?: string }[];
  copy: (ctx: CutTemperatureContext) => CutCopy;
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const titleCase = (s: string) => s.replace(/(^|\s)([a-z])/g, (m, sp, c) => `${sp}${c.toUpperCase()}`);

/** "at least 3 minutes before carving or consuming" -> "at least 3 minutes". */
function restShort(s: SafetyMinimum): string {
  return (s.rest ?? '').split(' before')[0];
}

function tier(d: CulinaryDoneness | undefined, prefix: string): DonenessTier | undefined {
  return d?.tiers.find((t) => t.label.toLowerCase().startsWith(prefix.toLowerCase()));
}

function range(t: DonenessTier | undefined): string {
  if (!t) return '';
  return t.temp_f_max && t.temp_f_max !== t.temp_f_min ? `${t.temp_f_min} to ${t.temp_f_max} F` : `${t.temp_f_min} F and up`;
}

export const CUT_TEMPERATURE_PAGES: CutTemperaturePage[] = [
  {
    animal: 'pork',
    cut: 'chops',
    name: 'Pork chops',
    primary: 'loin',
    cuts: [
      { region: 'loin', slug: 'pork-chops' },
      { region: 'butt', slug: 'pork-steak' },
    ],
    targets: [],
    doneness: ['doneness-pork-chops-roasts'],
    copy: ({ safety, doneness }) => {
      const d = doneness[0];
      const mw = tier(d, 'medium well');
      const wd = tier(d, 'well done');
      const rest = restShort(safety);
      return {
        title: `Pork Chop Internal Temp: ${safety.temp_f} F, Then Rest ${titleCase(rest)}`,
        description: `Pork chops are safe at ${safety.temp_f} F with a rest of ${rest}, and can still be pink. Medium well ${range(mw)}, well done ${range(wd)}. USDA FSIS cited.`,
        h1: 'Pork chop internal temperature.',
        question: 'What internal temp is a pork chop done?',
        intro: `A pork chop is done and safe at ${safety.temp_f} F, read in the thickest part away from the bone, followed by a rest of ${rest}. ${safety.notes[0]} If you like it firmer, ${mw?.label.toLowerCase()} is ${range(mw)} and ${wd?.label.toLowerCase()} is ${range(wd)}. Those are preferences. The ${safety.temp_f} F rule is the floor.`,
        probe: 'Push the thermometer through the side of the chop to the centre, not touching bone. Thin chops cook fast, so start checking early. A thick bone-in chop reads cooler near the bone, so read the thickest meat, not the edge.',
      };
    },
  },
  {
    animal: 'pork',
    cut: 'tenderloin',
    name: 'Pork tenderloin',
    primary: 'loin',
    cuts: [
      { region: 'loin', slug: 'pork-tenderloin' },
      { region: 'loin', slug: 'pork-loin-roast' },
    ],
    targets: [],
    doneness: ['doneness-pork-chops-roasts'],
    copy: ({ safety }) => {
      const rest = restShort(safety);
      return {
        title: `Pork Tenderloin Internal Temp: ${safety.temp_f} F, and Pink Is Safe`,
        description: `Pork tenderloin is safe at ${safety.temp_f} F with a rest of ${rest}. Very lean, so past ${safety.temp_f} F it dries. Tenderloin is not pork loin; both are on the page.`,
        h1: 'Pork tenderloin internal temperature.',
        question: 'What internal temp is pork tenderloin done?',
        intro: `Pork tenderloin is done at ${safety.temp_f} F in the thickest part, then rested ${rest}. ${safety.notes[0]} It is the most tender cut on the pig and very lean, so most cooks stop right at the minimum. Tenderloin and pork loin are different cuts. The loin is the wide back muscle sold as roasts and chops. The tenderloin is the thin strip under it. Both follow the same ${safety.temp_f} F rule.`,
        probe: 'Through the end or the side into the thickest part of the strip, not touching the grate. The thin tail end finishes first, so read the thick end and take the whole piece off when it hits the number.',
      };
    },
  },
  {
    animal: 'chicken',
    cut: 'breast',
    name: 'Chicken breast',
    primary: 'breast',
    cuts: [
      { region: 'breast', slug: 'bone-in-breast' },
      { region: 'breast', slug: 'boneless-breast' },
      { region: 'breast', slug: 'ground-chicken' },
    ],
    targets: [],
    doneness: [],
    copy: ({ safety }) => ({
      title: `Chicken Breast Internal Temp: ${safety.temp_f} F, No Rest Required`,
      description: `Chicken breast is safe at ${safety.temp_f} F in the thickest part. USDA requires no rest. ${safety.temp_f} F is also the ceiling for a juicy breast. Never count on carryover.`,
      h1: 'Chicken breast internal temperature.',
      question: 'What internal temp is chicken breast done?',
      intro: `Chicken breast is done at ${safety.temp_f} F, read in the thickest part. USDA requires no rest for poultry. Breast is lean white meat, so ${safety.temp_f} F is both the safety minimum and the practical ceiling. Past it, it dries. ${safety.notes[1]}`,
      probe: 'Push the probe through the side into the thickest part of the breast, not touching bone. The thin end cooks first, so read the thick end. On a whole bird, check the breast, the innermost thigh and the wing.',
    }),
  },
  {
    animal: 'chicken',
    cut: 'thigh',
    name: 'Chicken thigh',
    primary: 'thigh',
    cuts: [
      { region: 'thigh', slug: 'bone-in-thigh' },
      { region: 'thigh', slug: 'boneless-thigh' },
      { region: 'thigh', slug: 'whole-leg' },
      { region: 'drumstick', slug: 'drumsticks' },
    ],
    targets: ['target-chicken-pulled'],
    doneness: ['doneness-chicken-dark-meat-preference'],
    copy: ({ safety, doneness, targets }) => {
      const dark = tier(doneness[0], 'dark meat');
      const t = targets[0];
      return {
        title: `Chicken Thigh Internal Temp: ${safety.temp_f} F Safe, ${range(dark)} Better`,
        description: `Chicken thighs are safe at ${safety.temp_f} F, but better at ${range(dark)}, where the connective tissue renders. Pulled chicken goes to ${t.window_f?.min} to ${t.window_f?.max} F. USDA FSIS cited.`,
        h1: 'Chicken thigh internal temperature.',
        question: 'What internal temp is a chicken thigh done?',
        intro: `A chicken thigh is safe at ${safety.temp_f} F in the innermost meat by the joint, not touching bone. Most cooks take it higher, to ${range(dark)}, because dark meat firms up and the fat and connective tissue render. For pulled chicken, ${t.window_f?.min} to ${t.window_f?.max} F, ${t.finish_test?.replace(/_/g, ' ')}. Those higher numbers are texture, not safety. ${safety.temp_f} F is the floor, and nothing changes that.`,
        probe: 'Into the innermost thigh meat near the joint, not touching bone. A probe resting on the bone reads high and fools you into pulling early. Boneless thighs are thin, so go in through the side.',
      };
    },
  },
  {
    animal: 'pork',
    cut: 'ribs',
    name: 'Pork ribs',
    primary: 'spareribs',
    cuts: [
      { region: 'spareribs', slug: 'spareribs-full' },
      { region: 'spareribs', slug: 'st-louis-ribs' },
      { region: 'loin', slug: 'baby-back-ribs' },
      { region: 'loin', slug: 'country-style-ribs' },
      { region: 'spareribs', slug: 'rib-tips' },
    ],
    targets: ['target-pork-ribs'],
    doneness: [],
    crossTargets: [{ id: 'target-beef-chuck-and-short-ribs', label: 'Beef ribs', href: '/cuts/beef/plate' }],
    copy: ({ safety, targets }) => {
      const t = targets[0];
      const rest = restShort(safety);
      return {
        title: `Ribs Internal Temp: ${t.window_f?.min} to ${t.window_f?.max} F, and the Bend Test Decides`,
        description: `Pork ribs are safe at ${safety.temp_f} F but not tender until about ${t.window_f?.min} to ${t.window_f?.max} F, when they pass the bend test. Covers baby backs, spareribs, St. Louis and beef ribs.`,
        h1: 'Ribs internal temperature.',
        question: 'What internal temp are ribs done?',
        intro: `Ribs are the one cut where the thermometer does not get the final say. They usually come good somewhere around ${t.window_f?.min} to ${t.window_f?.max} F, but the reading moves a lot depending on where you put the probe. Cook them until they pass the ${t.finish_test?.replace(/_/g, ' ')}, and let the number tell you only when to start checking. USDA FSIS calls pork safe at ${safety.temp_f} F with a rest of ${rest}, and ribs clear that hours before they are tender.`,
        probe: `${cap(t.probe_where ?? '')}. The meat is thin and the bones are close, so one reading can be off by a lot. Take two or three, and trust the bend test over any of them.`,
      };
    },
  },
  {
    animal: 'beef',
    cut: 'ground',
    name: 'Ground beef',
    primary: 'chuck',
    cuts: [{ region: 'chuck', slug: 'ground-chuck' }],
    // A burger is 160 F, not 145 F. Grinding spreads surface bacteria through
    // the whole patty, so the whole-muscle rule does not apply and must not
    // sit in the answer position. It is printed second, as the contrast the
    // query is really asking about.
    primarySafetyRef: 'safety-ground-meat',
    secondarySafetyRef: 'safety-whole-muscle-red-meat',
    targets: [],
    // No doneness scale. There is no safe medium-rare burger, and a table of
    // preferences here would read as permission for one.
    doneness: [],
    regionGuidance: false,
    copy: ({ safety, secondary }) => ({
      title: `Ground Beef Internal Temp: ${safety.temp_f} F, No Pink Rule`,
      description: `Ground beef and burgers are safe at ${safety.temp_f} F, not the ${secondary?.temp_f} F that applies to steaks. Colour does not tell you when a burger is done. USDA FSIS cited.`,
      h1: 'Ground beef internal temperature.',
      question: 'What internal temp is ground beef done?',
      intro: `Ground beef is done at ${safety.temp_f} F, measured ${safety.measurement}. That is higher than the ${secondary?.temp_f} F a steak needs, and the difference is not fussiness. A steak's bacteria sit on the outside, where the heat of the pan kills them. Grinding mixes that surface through the whole patty, so the centre has to reach a safe temperature too. ${safety.notes[0]} Cook it to the number, not to the colour.`,
      probe: 'Through the side of the patty into the centre, so the probe sits in the middle of the meat rather than passing out the far side. Meatballs and meat loaf get the same treatment: the thickest part, away from the pan.',
    }),
  },
  {
    animal: 'beef',
    cut: 'tri-tip',
    name: 'Tri-tip',
    primary: 'sirloin',
    cuts: [
      { region: 'sirloin', slug: 'tri-tip' },
      { region: 'sirloin', slug: 'top-sirloin-steak' },
      { region: 'sirloin', slug: 'sirloin-bavette' },
    ],
    targets: [],
    // Both scales, in this order: what USDA publishes, then what steakhouses
    // and pitmasters actually pull at. The convention record is flagged
    // below-minimum and carries its own disclosure.
    doneness: ['doneness-beef-industry', 'doneness-beef-convention'],
    copy: ({ safety, doneness }) => {
      const industry = doneness[0];
      const convention = doneness[1];
      const usdaMr = tier(industry, 'medium rare');
      const conventionMr = tier(convention, 'medium rare');
      return {
        title: `Tri Tip Internal Temp: ${safety.temp_f} F USDA, ${range(conventionMr)} Pulled`,
        description: `Tri-tip is a steak, not a collagen cut. USDA puts medium rare at ${usdaMr?.temp_f_min} F after a rest. Steakhouse convention pulls at ${range(conventionMr)}, below that minimum.`,
        h1: 'Tri-tip internal temperature.',
        question: 'What internal temp is tri-tip done?',
        intro: `Tri-tip is cooked like a steak, not like a brisket. USDA FSIS puts whole-muscle beef at ${safety.temp_f} F with a rest of ${restShort(safety)}, and its own doneness chart calls that medium rare. Steakhouse and pitmaster convention pulls tri-tip lower, around ${range(conventionMr)} for medium rare, and that is below the USDA minimum. Both numbers are printed here, and which one you use is your decision, not ours. What tri-tip is not is a low-and-slow cut: take it to a collagen window and it dries out rather than pulling apart.`,
        probe: 'Into the thickest part of the roast from the end, level with the grate, so the tip sits in the centre. Tri-tip is a wedge, so the thin end runs well ahead of the thick end. Read the thick end and pull the whole roast on it.',
      };
    },
  },
  {
    animal: 'pork',
    cut: 'pulled',
    name: 'Pulled pork',
    primary: 'butt',
    cuts: [
      { region: 'butt', slug: 'boston-butt' },
      { region: 'picnic-shoulder', slug: 'picnic-roast' },
      { region: 'picnic-shoulder', slug: 'whole-shoulder' },
    ],
    targets: ['target-pork-shoulder'],
    // The stall is why people search this at midnight with a probe stuck at
    // 160 F. It is a tenderness concept with no safety dimension of its own.
    crossTargets: [{ id: 'concept-the-stall', label: 'The stall' }],
    doneness: [],
    copy: ({ safety, targets, cross }) => {
      const t = targets[0];
      const stall = cross[0];
      return {
        title: `Pulled Pork Internal Temp: ${t.window_f?.min} to ${t.window_f?.max} F, and the Bone Decides`,
        description: `Pork shoulder is safe at ${safety.temp_f} F but will not pull until about ${t.window_f?.min} to ${t.window_f?.max} F. The Pork Board publishes a lower figure. Both are here.`,
        h1: 'Pulled pork internal temperature.',
        question: 'What internal temp is pulled pork done?',
        intro: `Pork shoulder pulls at roughly ${t.window_f?.min} to ${t.window_f?.max} F, and the test that settles it is the bone: when the blade bone slides out clean, the shoulder is ready, whatever the thermometer says. The National Pork Board publishes a lower figure than backyard convention does, and both are printed further down, because the gap between them is texture and not safety. USDA FSIS calls pork safe at ${safety.temp_f} F with a rest of ${restShort(safety)}, and a shoulder passes that many hours before it will pull. Expect the reading to stall somewhere around ${stall?.window_f?.min} to ${stall?.window_f?.max} F and sit there for hours. That is normal, and cranking the pit to beat it is how people ruin bark.`,
        probe: `${cap(t.probe_where ?? '')}. Bone throws a reading off badly on a shoulder, so take two or three in different spots. When the probe slides in with no resistance anywhere, it is done. ${t.rest}`,
      };
    },
  },
];

export function getCutTemperaturePage(animal: string, cut: string): CutTemperaturePage | undefined {
  return CUT_TEMPERATURE_PAGES.find((p) => p.animal === animal && p.cut === cut);
}

export function cutTemperaturePagesFor(animal: string): CutTemperaturePage[] {
  return CUT_TEMPERATURE_PAGES.filter((p) => p.animal === animal);
}

/** Resolve every ref a page needs. Throws if anything does not resolve. */
export function resolveCutPage(p: CutTemperaturePage): CutTemperatureContext {
  const missing: string[] = [];
  const animal = getAnimal(p.animal);
  if (!animal) missing.push(`animal ${p.animal}`);
  const primary = getRegion(p.animal, p.primary);
  if (!primary) missing.push(`region ${p.animal}/${p.primary}`);
  const cuts = p.cuts.map(({ region, slug }) => {
    const r = getRegion(p.animal, region);
    const c = r?.retail_cuts.find((x) => x.slug === slug);
    if (!r || !c) missing.push(`retail cut ${p.animal}/${region}/${slug}`);
    return r && c ? { region: r, cut: c } : undefined;
  });
  const targets = [...p.targets, ...(p.crossTargets ?? []).map((x) => x.id)].map((id) => {
    const t = getPitmasterTarget(id);
    if (!t) missing.push(`target ${id}`);
    return t;
  });
  const doneness = p.doneness.map((id) => {
    const d = renderableDoneness(id);
    if (!d) missing.push(`doneness ${id}`);
    return d?.record;
  });
  const safetyRef = p.primarySafetyRef ?? animal?.safety_ref;
  const safety = safetyRef ? getSafetyMinimum(safetyRef) : undefined;
  if (!safety) missing.push(`safety ${safetyRef ?? `for ${p.animal}`}`);
  if (missing.length) throw new Error(`cutTemperaturePages: /temperatures/${p.animal}/${p.cut} has unresolved refs: ${missing.join(', ')}`);

  const resolvedCuts = cuts.filter((c): c is NonNullable<typeof c> => !!c);
  const regionSlugs = new Set<string>();
  const regions: CutRegion[] = [];
  for (const { region } of [{ region: primary! }, ...resolvedCuts]) {
    if (!regionSlugs.has(region.slug)) {
      regionSlugs.add(region.slug);
      regions.push(region);
    }
  }
  const usesGround = resolvedCuts.some(({ cut }) => cut.finish === 'safety-ground-meat');
  const secondaryRef =
    p.secondarySafetyRef ?? (usesGround && animal!.ground_safety_ref ? animal!.ground_safety_ref : undefined);
  const secondary = secondaryRef && secondaryRef !== safety!.id ? getSafetyMinimum(secondaryRef) : undefined;

  return {
    animal: animal!,
    safety: safety!,
    secondary,
    primary: primary!,
    regions,
    cuts: resolvedCuts,
    targets: targets.slice(0, p.targets.length).filter((t): t is PitmasterTarget => !!t),
    cross: targets.slice(p.targets.length).filter((t): t is PitmasterTarget => !!t),
    doneness: doneness.filter((d): d is CulinaryDoneness => !!d),
  };
}

// Fail the build, not the reader: resolve every page once at import.
for (const p of CUT_TEMPERATURE_PAGES) resolveCutPage(p);
