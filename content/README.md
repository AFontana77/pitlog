# Pit Log Content Spine

**One fact, one source of truth, many surfaces.**

This directory is the canonical, version-controlled reference content for every Pit Log
property: pitlog.app, the Pit Master Log app, the free field guide PDF, the KDP field guide,
and the print-on-demand poster line. If a fact about meat, temperature, wood, or technique
appears on any Pit Log surface, it is rendered from a record in here. Nothing is authored
twice.

Governing spec: `docs/PITLOG_MASTER_ECOSYSTEM_CLAUDE_BRIEF.md` sections 4, 5, 6, 18.

## Layout

```
content/
  sources/sources.json              citation graph. Every factual record points here.
  animals/animals.json              the six supported animals
  cuts/{beef,pork,lamb,goat,chicken,salmon}.json
                                    primal regions and the retail cuts under them
  temperatures/safety_minimums.json SAFETY_MINIMUM records (USDA FSIS, FDA)
  temperatures/culinary_doneness.json
                                    CULINARY_PREFERENCE records (steak doneness etc.)
  temperatures/pitmaster_targets.json
                                    PITMASTER_TENDERNESS records (brisket 195-205 etc.)
  temperatures/handling.json        danger zone, resting, thermometer placement, pit air temp
  woods/woods.json                  smoke woods
  recipes/recipes.json              Pit Log house recipes (none are OFFICIAL yet)
  gear/gear_categories.json         equipment categories for commerce modules
  graphics/masters.json             registry of approved ChatGPT masters, with defects
  pod/catalog.json                  poster products (draft, no provider yet)
  validate_content.py               the gate. Run before any build that consumes this data.
```

Consumers:

- **Site** imports the JSON through `src/content/index.ts` at build time (static).
- **App** receives a generated bundle (`npm run content:export` writes
  `content-dist/pitlog-content.json`); it never fetches reference data from Supabase.
- **PDF / KDP** Python tooling reads the JSON directly.

## The three temperature kinds never merge

Every temperature record carries `kind`, one of:

| kind | meaning | who decides | may be below the safety minimum? |
|---|---|---|---|
| `SAFETY_MINIMUM` | food-safety floor | USDA FSIS (FDA for seafood) | never |
| `CULINARY_PREFERENCE` | how a person likes a steak or a fillet | the cook | yes, and the record must say so |
| `PITMASTER_TENDERNESS` | where collagen cuts turn tender | barbecue craft | no, always above it |

USDA/FSIS wins every safety conflict. A `CULINARY_PREFERENCE` record that sits below the
matching `SAFETY_MINIMUM` must carry `below_safety_minimum: true` and the renderer must
print the disclosure sentence stored in `disclosure`. `validate_content.py` fails the build
if either is missing.

Time is planning guidance. No record may present a duration as proof of doneness.

## Provenance is a field, not a footnote

Every record carries:

- `source_refs[]` pointing at `sources/sources.json` ids
- `review_status` in `DRAFT | NEEDS_SOURCE | SOURCED | REVIEWED | RETIRED`
- `updated_at` ISO date

Every `SAFETY_MINIMUM` and every handling rule must cite at least one tier-1 source (federal
agency). Craft records (tenderness windows, wood pairings, slice direction) may cite tier 2-4
sources, or carry `NEEDS_SOURCE` honestly until one is found. A craft record that cannot be
sourced is still allowed to render, but it is labelled as barbecue convention, never as
safety guidance.

## What the ChatGPT graphics are, and are not

The ten masters in `brand-assets/cut-guides/` decide **coverage and look**: which primals
the product names, the numbering, the layout, the palette. They do not supply a single
number in this directory. `graphics/masters.json` records each master's checksum, pixel
size, the facts it displays that disagree with a source record, and its publish gate.
Where a master disagrees with a record, the record wins and the master goes back to the
ChatGPT lane for regeneration.

## What does NOT live here

- Cook logs, user identity, saved recipes, favourites. Those are user data and live in
  Supabase.
- Prices, ASINs, stock. Those are volatile commerce data with their own verification
  contract (`src/data/affiliateLinks.json` and the future product manifest).
- Prose articles. Pages render from these records; they do not become records.

## Changing a record

1. Edit the JSON.
2. Bump `updated_at`. If a number changed, re-read the source and refresh `accessed` in
   `sources.json`.
3. Run `py -3.11 content/validate_content.py`.
4. If it is a safety record, also run `py -3.11 tools/lead-magnets/assert_safety_content.py`
   against the rebuilt PDF. Extend that script if a new safety fact was added. Never weaken
   it.
