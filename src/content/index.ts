/**
 * Pit Log content spine: typed, build-time access to content/*.json.
 *
 * Reference facts are static and version-controlled (brief section 5). Pages
 * import from here; they never fetch reference data at runtime and never from
 * Supabase. Run `py -3.11 content/validate_content.py` before a build; this
 * module trusts that the gate has passed.
 *
 * The three temperature kinds never merge. A page that prints a
 * CULINARY_PREFERENCE record with `below_safety_minimum: true` MUST also render
 * `record.disclosure` and the animal's SAFETY_MINIMUM. `renderableDoneness()`
 * hands you both so the page cannot forget.
 */
import sourcesJson from "../../content/sources/sources.json";
import animalsJson from "../../content/animals/animals.json";
import beefJson from "../../content/cuts/beef.json";
import porkJson from "../../content/cuts/pork.json";
import lambJson from "../../content/cuts/lamb.json";
import goatJson from "../../content/cuts/goat.json";
import chickenJson from "../../content/cuts/chicken.json";
import salmonJson from "../../content/cuts/salmon.json";
import safetyJson from "../../content/temperatures/safety_minimums.json";
import donenessJson from "../../content/temperatures/culinary_doneness.json";
import targetsJson from "../../content/temperatures/pitmaster_targets.json";
import handlingJson from "../../content/temperatures/handling.json";
import woodsJson from "../../content/woods/woods.json";
import recipesJson from "../../content/recipes/recipes.json";
import gearJson from "../../content/gear/gear_categories.json";
import mastersJson from "../../content/graphics/masters.json";

export type ReviewStatus = "DRAFT" | "NEEDS_SOURCE" | "SOURCED" | "REVIEWED" | "RETIRED";
export type TempKind = "SAFETY_MINIMUM" | "CULINARY_PREFERENCE" | "PITMASTER_TENDERNESS";
export type AnimalSlug = "beef" | "pork" | "lamb" | "goat" | "chicken" | "salmon";

export interface Source {
  id: string;
  org: string;
  title: string;
  url: string;
  primary: boolean;
  tier: 1 | 2 | 3 | 4 | 5;
  accessed: string;
  page_last_updated: string | null;
  update_sensitivity: "safety-critical" | "volatile" | "stable";
  supports: string[];
}

export interface SafetyMinimum {
  id: string;
  kind: "SAFETY_MINIMUM";
  applies_to: string[];
  scope: string;
  temp_f: number;
  temp_c: number;
  rest: string | null;
  measurement: string;
  statement: string;
  notes: string[];
  source_refs: string[];
  review_status: ReviewStatus;
  updated_at: string;
}

export interface DonenessTier {
  label: string;
  temp_f_min: number | null;
  temp_f_max: number | null;
  pull_f?: number;
  rest?: string | null;
  below_safety_minimum: boolean;
}

export interface CulinaryDoneness {
  id: string;
  kind: "CULINARY_PREFERENCE";
  applies_to: string[];
  scope: string;
  safety_ref: string;
  tiers: DonenessTier[];
  carryover: string;
  below_safety_minimum: boolean;
  disclosure: string | null;
  notes: string[];
  source_refs: string[];
  review_status: ReviewStatus;
  updated_at: string;
}

export interface PitmasterTarget {
  id: string;
  kind: "PITMASTER_TENDERNESS";
  safety_ref: string | null;
  window_f: { min: number; max: number } | null;
  checkpoint_f: number | null;
  finish_test: string | null;
  probe_where: string | null;
  pit_temp_f: { min: number; max: number } | null;
  planning_time: string | null;
  rest: string | null;
  stall: string | null;
  statement: string;
  conflicts: { between: string[]; resolution: string }[];
  source_refs: string[];
  source_note: string;
  review_status: ReviewStatus;
  updated_at: string;
}

export interface HandlingRule {
  id: string;
  kind: "SAFETY_HANDLING" | "PLANNING_GUIDANCE";
  title: string;
  statement: string;
  pitlog_application: string;
  source_refs: string[];
  review_status: ReviewStatus;
  updated_at: string;
}

export interface RetailCut {
  slug: string;
  name: string;
  methods: string[];
  finish: string;
  note: string;
}

export interface CutRegion {
  slug: string;
  name: string;
  number: number;
  fsis_parent: string | null;
  short_description: string;
  long_description: string;
  tenderness_score: number;
  richness_score: number;
  best_methods: string[];
  retail_cuts: RetailCut[];
  safe_temp_ref: string;
  doneness_refs: string[];
  tenderness_target_ref: string | null;
  planning_time_guidance: string;
  rest_guidance: string;
  slice_direction: string;
  best_woods: string[];
  common_mistakes: string[];
  recipe_refs: string[];
  gear_category_refs: string[];
  source_refs: string[];
  review_status: ReviewStatus;
  updated_at: string;
}

export interface Animal {
  slug: AnimalSlug;
  name: string;
  category: "red_meat" | "poultry" | "fish";
  summary: string;
  primal_scheme: { regions: string[]; note: string; scheme_source_refs: string[] };
  fsis_primals: string[];
  safety_ref: string;
  ground_safety_ref: string | null;
  wood_refs: string[];
  master_graphic: string;
  secondary_graphic?: string;
  route: string;
  source_refs: string[];
  review_status: ReviewStatus;
  updated_at: string;
}

export interface Wood {
  slug: string;
  name: string;
  strength: "mild" | "medium" | "strong";
  flavor_character: string;
  best_animals: string[];
  best_cuts: string[];
  blend_ideas: string[];
  avoid_or_use_lightly_with: string[];
  regional_note: string;
  source_refs: string[];
  review_status: ReviewStatus;
  updated_at: string;
}

export type RecipeStatus = "PLANNED" | "TEST_V1" | "TEST_V2" | "TEST_V3" | "OFFICIAL" | "RETIRED";

export interface AppLogPrefill {
  meat_type: string;
  wood_type: string[];
  target_temp: number;
  wrap_method: string;
  rub: string;
}

export interface Recipe {
  slug: string;
  title: string;
  status: RecipeStatus;
  family: string;
  animal: AnimalSlug | null;
  cuts: string[];
  description: string;
  concept_ingredients: string[];
  cook_time_guidance: string | null;
  pit_temp_ref: string | null;
  finish_ref: string | null;
  safety_refs: string[];
  wood_refs: string[];
  equipment_refs: string[];
  shop_ingredient_categories: string[];
  promised_by_graphic: string | null;
  app_log_prefill: AppLogPrefill | null;
  related_cut_refs: string[];
  review_status: ReviewStatus;
  updated_at: string;
}

export interface GearCategory {
  slug: string;
  name: string;
  amazon_category: string;
  priority: number;
  why: string;
  direct_affiliate_candidates: string[];
  status: string;
}

export interface MasterGraphic {
  id: string;
  file: string;
  md5: string;
  px: [number, number];
  subject: string;
  names_recipes: string[];
  defects: { severity: string; text_on_master: string; record: string | null; fix: string }[];
  publish_gate: string;
  poster_candidate: boolean;
}

// ---------------------------------------------------------------- data
export const SOURCES = sourcesJson.sources as unknown as Source[];
export const ANIMALS = animalsJson.animals as unknown as Animal[];
export const SAFETY_MINIMUMS = safetyJson.records as unknown as SafetyMinimum[];
export const CULINARY_DONENESS = donenessJson.records as unknown as CulinaryDoneness[];
export const PITMASTER_TARGETS = targetsJson.records as unknown as PitmasterTarget[];
export const HANDLING = handlingJson.records as unknown as HandlingRule[];
export const WOODS = woodsJson.woods as unknown as Wood[];
export const RECIPES = recipesJson.recipes as unknown as Recipe[];
export const GEAR_CATEGORIES = gearJson.categories as unknown as GearCategory[];
export const MASTERS = mastersJson.masters as unknown as MasterGraphic[];

const CUT_FILES: Record<AnimalSlug, { regions: unknown[] }> = {
  beef: beefJson,
  pork: porkJson,
  lamb: lambJson,
  goat: goatJson,
  chicken: chickenJson,
  salmon: salmonJson,
};

// ------------------------------------------------------------- lookups
const byId = <T extends { id: string }>(list: T[]) =>
  Object.fromEntries(list.map((x) => [x.id, x])) as Record<string, T>;

const SAFE_BY_ID = byId(SAFETY_MINIMUMS);
const DONE_BY_ID = byId(CULINARY_DONENESS);
const TARG_BY_ID = byId(PITMASTER_TARGETS);
const SRC_BY_ID = byId(SOURCES);

export function getAnimal(slug: string): Animal | undefined {
  return ANIMALS.find((a) => a.slug === slug);
}

export function getRegions(animal: AnimalSlug): CutRegion[] {
  return CUT_FILES[animal].regions as CutRegion[];
}

export function getRegion(animal: AnimalSlug, slug: string): CutRegion | undefined {
  return getRegions(animal).find((r) => r.slug === slug);
}

export function getSafetyMinimum(id: string): SafetyMinimum | undefined {
  return SAFE_BY_ID[id];
}

export function getPitmasterTarget(id: string | null | undefined): PitmasterTarget | undefined {
  return id ? TARG_BY_ID[id] : undefined;
}

export function getWood(slug: string): Wood | undefined {
  return WOODS.find((w) => w.slug === slug);
}

export function getRecipe(slug: string): Recipe | undefined {
  return RECIPES.find((r) => r.slug === slug);
}

export function getSource(id: string): Source | undefined {
  return SRC_BY_ID[id];
}

/** Sources cited by a record, resolved and de-duplicated, tier-1 first. */
export function citationsFor(refs: string[]): Source[] {
  const seen = new Set<string>();
  return refs
    .map((r) => SRC_BY_ID[r])
    .filter((s): s is Source => !!s && !seen.has(s.id) && !!seen.add(s.id))
    .sort((a, b) => a.tier - b.tier);
}

/**
 * The only sanctioned way to put a culinary doneness table on a page.
 * Returns the record together with the SAFETY_MINIMUM it must be printed
 * beside and the disclosure the page must render when any tier is below it.
 */
export function renderableDoneness(id: string): {
  record: CulinaryDoneness;
  safety: SafetyMinimum;
  mustDisclose: boolean;
  disclosure: string | null;
} | undefined {
  const record = DONE_BY_ID[id];
  if (!record) return undefined;
  const safety = SAFE_BY_ID[record.safety_ref];
  if (!safety) return undefined;
  const mustDisclose = record.tiers.some((t) => t.below_safety_minimum);
  return { record, safety, mustDisclose, disclosure: mustDisclose ? record.disclosure : null };
}

/**
 * Everything a cut page or an app quick-reference card needs, resolved.
 * The shape is deliberately the brief's section 7 list.
 */
export function cutReference(animal: AnimalSlug, slug: string) {
  const region = getRegion(animal, slug);
  const a = getAnimal(animal);
  if (!region || !a) return undefined;
  return {
    animal: a,
    region,
    safety: SAFE_BY_ID[region.safe_temp_ref],
    doneness: region.doneness_refs.map(renderableDoneness).filter(Boolean),
    tenderness: getPitmasterTarget(region.tenderness_target_ref),
    woods: region.best_woods
      .map((w) => getWood(w.split(" ")[0].toLowerCase()))
      .filter((w): w is Wood => !!w),
    recipes: region.recipe_refs.map(getRecipe).filter((r): r is Recipe => !!r),
    citations: citationsFor([
      ...region.source_refs,
      ...(SAFE_BY_ID[region.safe_temp_ref]?.source_refs ?? []),
    ]),
  };
}

/** Recipes a graphic promises that are not yet publishable. */
export function unmetGraphicPromises(): { master: string; recipe: string; status: RecipeStatus }[] {
  const out: { master: string; recipe: string; status: RecipeStatus }[] = [];
  for (const m of MASTERS) {
    for (const slug of m.names_recipes) {
      const r = getRecipe(slug);
      if (!r || r.status === "PLANNED") out.push({ master: m.id, recipe: slug, status: r?.status ?? "PLANNED" });
    }
  }
  return out;
}
