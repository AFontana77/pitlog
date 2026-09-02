# PIT LOG — MASTER ECOSYSTEM BUILD BRIEF
## App + Authority/Affiliate Site + KDP Book + PDF + POD Commerce

**Date:** 2026-09-02  
**Role of this brief:** Canonical implementation direction for Claude Code  
**Primary public brand:** Pit Log  
**Website:** pitlog.app  
**App:** Pit Master Log (do not rename without explicit approval)  
**Core doctrine:** One fact, one source of truth, many surfaces.

---

# 1. VISION

Pit Log is not merely a cook-log app and pitlog.app is not merely an app marketing site.

The intended product is a connected barbecue knowledge-and-commerce ecosystem built around three primary properties:

1. **Pit Master Log app** — the working tool that helps users record cooks, compare results, learn from previous sessions, and start future cooks from trusted references and recipes.
2. **pitlog.app authority site** — the acquisition, SEO/AIO, education, email, affiliate, recipe, interactive-guide, and print-on-demand commerce engine.
3. **Pit Log KDP field guide/book** — the premium physical reference product: meat cuts, temperatures, wood pairings, recipes, techniques, smoke-time planning, troubleshooting, and cook-log pages.

Supporting all three:

- **Free downloadable Pit Log field guide** — premium lead magnet and preview of the book.
- **Print-on-demand poster/art line** — butcher-cut charts, wood pairing charts, standalone animal art, temperature guides, and future BBQ reference art.
- **Shared canonical content system** — the same cuts, temperatures, recipes, sources, diagrams, wood guidance, and terminology power every surface.

The ecosystem should feel like the place a serious backyard pitmaster goes to answer a question, plan a cook, buy what they need, record the result, and improve the next cook.

**Long-term authority goal:** There should eventually be no meaningful barbecue question about Pit Log's supported meats that the site cannot answer clearly, accurately, and usefully.

---

# 2. THE CORE FLYWHEEL

The intended user journey is:

**Search / AI answer / social / poster discovery**
→ Pit Log authority page
→ interactive cut/temperature/wood guide
→ recipe
→ relevant equipment and ingredient commerce
→ free field-guide email capture
→ Pit Master Log app
→ KDP field guide / POD poster
→ repeat cook and return visit

Every component should reinforce the others rather than behave as an isolated project.

Examples:

**"What temp is brisket done?"**
→ brisket authority page
→ safety vs tenderness explanation
→ interactive beef cut
→ Central Texas brisket recipe
→ probe thermometer / butcher paper / slicing knife
→ "Log this cook" app CTA
→ free field guide
→ KDP guide

**"What wood for salmon?"**
→ smoke-wood pairing guide
→ salmon page
→ alder/apple/cherry explanation
→ salmon recipe
→ thermometer / cedar plank / tools
→ app / PDF / poster

---

# 3. CURRENT CREATIVE SYSTEM

GPT owns canonical creative/editorial direction and has begun producing the Pit Log visual system.

Current planned animal set:

- Beef
- Pork
- Lamb
- Goat
- Chicken
- Salmon

Additional shared visual/reference assets include:

- Smoke Wood Pairing Guide
- Doneness/temperature guides
- Individual animal butcher/cut charts
- Line-art-only animal prints
- Future technique charts
- Future sauce/rub/recipe art

The approved visual language is:

- vintage butcher-shop / smokehouse field-guide aesthetic
- cream paper
- charcoal/black
- burgundy/deep red
- ember orange
- engraved line art
- distressed display typography
- clean factual tables and diagrams
- Pit Log flame mark
- "SMOKE. LOG. MASTER."
- "LOG IT. LEARN IT. MASTER IT."

**Important:** Generated infographic artwork is visual direction, not canonical factual text. Final production implementations must use real typeset text and data from the canonical content records. Do not OCR an AI graphic and treat its labels or temperatures as authoritative.

---

# 4. CONTENT SAFETY DOCTRINE

This rule is permanent across site, app, PDF, KDP and posters:

## SAFETY MINIMUM != CULINARY PREFERENCE != PITMASTER TENDERNESS TARGET

Examples:

- USDA safety guidance is a food-safety statement.
- Rare / medium-rare / medium charts are culinary preference guidance and may fall below a USDA minimum.
- Brisket around 195–205°F is tenderness guidance, not a pathogen-safety threshold.
- "203°F" is a useful brisket checkpoint, not a magic guaranteed endpoint.
- Time is planning guidance, not doneness.

Any potentially harmful temperature, processing, or food-safety statement must have explicit provenance from an authoritative primary source where possible.

**USDA/FSIS wins every safety conflict.**

Never:
- use color as proof of safety
- describe a lower preference temperature as "safe" when it conflicts with USDA guidance
- turn a rough smoke-time estimate into a guarantee
- invent a safety-sensitive number to fill a layout

Build source provenance into the content model.

---

# 5. SHARED CONTENT ARCHITECTURE

Do not independently author the same fact in the app, website, PDF and book.

Create or formalize a shared, version-controlled Pit Log content spine.

Preferred conceptual structure:

```text
pitlog-content/
  brand/
  sources/
  animals/
    beef/
    pork/
    lamb/
    goat/
    chicken/
    salmon/
  cuts/
  temperatures/
  woods/
  recipes/
  sauces/
  rubs/
  methods/
  gear/
  graphics/
  pdf/
  kdp/
  pod/
  handoffs/
```

Implementation location can differ if the existing repo topology suggests a cleaner solution. Do not create unnecessary repository sprawl.

Canonical reference/editorial content should initially be static and version-controlled.

**Do not put universal meat-reference facts in Supabase simply because Supabase exists.**

Supabase is appropriate for user-specific data:
- cook logs
- anonymous user identity
- user favorites if added later
- saved/custom recipes if added later

Reference content should be build-time/static until a real CMS need exists.

Every canonical record should support provenance and review status.

---

# 6. CANONICAL KNOWLEDGE GRAPH

The site/app/book should share a connected model:

**Animal**
→ **Primal / Cut**
→ **Cooking Method**
→ **Temperature / Doneness / Tenderness**
→ **Smoke Wood**
→ **Recipe**
→ **Equipment**
→ **Ingredients**
→ **Cook Log**

This relationship graph is the core of the product.

Example:

```text
Beef
  → Brisket
    → Smoke
      → Oak / Post Oak / Hickory
      → 195–205°F tenderness window / probe tender
      → Pit Log Central Texas Brisket
      → probe thermometer
      → butcher paper
      → slicing knife
      → recipe ingredients
      → Log This Cook
```

The web architecture, internal links and app navigation should reflect these relationships.

---

# 7. PROPERTY ONE — PIT MASTER LOG APP

The app remains first and foremost a **working pitmaster tool**.

Do not turn it into a bloated content website.

## Core product role

- start a cook
- log meat/cut/weight
- track pit temperature and key events
- record wrap time, final temp, rest, wood/fuel, seasoning, results
- preserve cook history
- compare outcomes
- learn what produced the best result
- repeat a successful cook

## New reference layer

Add, when implementation timing permits:

**Learn / Cuts & Temps**

Navigation concept:

```text
Cuts & Temps
  → Beef
  → Brisket
  → Quick Reference
  → Log This Cook
```

For each cut, the app should show a condensed record:

- what/where the cut is
- tenderness
- richness
- best methods
- USDA safety line
- culinary doneness or pitmaster finish guidance
- resting/slicing guidance
- best woods
- top mistakes
- related Pit Log recipes
- **LOG THIS COOK**

## Recipe-to-log bridge

A recipe should be able to initialize a cook log with useful fields preselected:

- animal
- cut
- method
- suggested pit range
- reference finish guidance
- wood
- recipe/rub/sauce reference

The user remains in control; prefilled values should be editable.

## Web bridge

Full editorial articles, commerce, affiliate modules and long-form recipe explanations remain on pitlog.app.

The app may expose:
- "View full guide"
- "View full recipe"
- "Explore gear"

These should deep-link to the relevant web page.

**Do not make Amazon affiliate commerce a core in-app dependency.** Keep the app clean and App-Store-friendly; the website is the primary commerce layer.

## Release discipline

If another portfolio canary gate currently prevents changing the shipping Template A binary, implement app work on a safe branch or scaffold the adapter without forcing an immediate store release. Do not sacrifice the launch program merely to synchronize content.

---

# 8. PROPERTY TWO — PITLOG.APP AUTHORITY + COMMERCE SITE

pitlog.app should become the deepest property in the ecosystem.

It must simultaneously serve:

- SEO
- AIO / LLM discovery
- education
- app acquisition
- email capture
- Amazon Associates
- higher-value direct affiliates
- recipe ingredient commerce
- POD products
- KDP/book promotion

## Core site hubs

Recommended information architecture:

```text
/cuts
  /beef
  /pork
  /lamb
  /goat
  /chicken
  /salmon

/cuts/beef/brisket
/cuts/beef/rib
...

/temperatures
/woods
/recipes
/recipes/beef
/recipes/pork
...
/techniques
/gear
/posters
/free-guide
/book
```

Use the cleanest implementation compatible with the existing site. Preserve current valuable URLs and use redirects if routes change.

## Authority page standard

Each cut page should eventually answer:

1. What is it?
2. Where does it come from?
3. Tenderness
4. Richness/fat
5. Best cooking methods
6. USDA safety guidance
7. Culinary doneness or pitmaster finish guidance
8. Typical planning time range, clearly labeled approximate
9. Rest guidance
10. Slice direction
11. Smoke wood pairings
12. Common mistakes
13. Troubleshooting
14. Related recipes
15. Recommended equipment
16. Relevant ingredients
17. App CTA
18. PDF CTA
19. Poster CTA
20. Book CTA

Do not create hundreds of thin templated pages merely because data exists.

---

# 9. INTERACTIVE PRIMAL-CUT GRAPHICS

The six animal diagrams should become signature Pit Log interfaces.

## Website behavior

Each diagram should have an accessible SVG/hotspot layer over the approved artwork.

Requirements:

- tap/click selects a region
- keyboard accessible
- persistent selected state
- responsive on mobile
- a normal text-link list provides equivalent navigation
- no essential information depends on hover
- crawlable destinations

Selecting a region reveals:

- cut name
- one-line explanation
- tenderness scale
- richness scale
- best methods
- safety guidance
- finish/doneness guidance
- woods
- recipes
- gear

Primary actions:

**LEARN · COOK · LOG**

- **LEARN** → full authority page
- **COOK** → recipe collection
- **LOG** → app / deep-link path with animal/cut preselected

Secondary commerce can include:

- **SHOP GEAR**
- **SHOP INGREDIENTS**
- **GET THE POSTER**

## App behavior

Use the same cut artwork/data in a simpler, touch-first reference interface.

The app does not need the full SEO page. It needs fast answers and the bridge into a cook log.

---

# 10. RECIPES AS A FIRST-CLASS CONTENT PRODUCT

Pit Log should develop a recognizable recipe canon, not merely aggregate generic web recipes.

Planned recipe families:

- brisket
- pork shoulder
- ribs
- steaks
- lamb shoulder / rack
- goat shoulder
- chicken
- salmon
- sauces
- rubs
- sides later

Current planned Pit Log house recipes include:

- Pit Log Central Texas Brisket
- Coffee-Chile Smoked Chuck Roast
- Reverse-Seared Ribeye with Ember Butter
- Santa Maria-Inspired Tri-Tip
- Pepper-Bark Beef Short Ribs
- Pit Log Ember Citrus BBQ Sauce
- Pit Log House Brisket Rub
- Pit Log Competition Pork Rub
- Carolina-style vinegar sauce
- Alabama white sauce
- future lamb/goat/chicken/salmon signatures

**Official house recipes must be kitchen-tested before being labeled OFFICIAL.**

Until tested:
`TEST_V1`, `TEST_V2`, etc.

Recipe pages should support:

- ingredients
- yield
- prep
- cook
- temperatures
- wood
- step-by-step method
- notes
- substitutions where safe
- equipment
- "Start this cook in Pit Log"
- printable recipe card
- book/PDF cross-link
- ingredient shopping
- gear shopping

Use Recipe structured data only when the visible page actually contains the corresponding content.

---

# 11. AMAZON ASSOCIATES + AMAZON FRESH / GROCERY COMMERCE

The website should monetize both **equipment** and **ingredients** where useful.

## Gear commerce

Natural product categories include:

- instant-read thermometers
- leave-in probes
- wireless thermometers
- smokers
- grills
- charcoal / pellets / wood chunks
- butcher paper
- foil
- knives
- cutting boards
- gloves
- tongs
- cast iron
- Dutch ovens
- cedar planks
- meat claws
- coolers / holding gear
- vacuum sealers
- marinade tools
- rub/sauce tools

Amazon should be a broad underlying commerce layer.

Also research stronger direct affiliate relationships where economics are meaningfully better and the merchant is reputable. Potential categories include thermometers, smokers/grills, knives and specialty BBQ suppliers.

Do not replace a superior direct affiliate merely to force Amazon.

## Recipe ingredient commerce

Every recipe can support a useful **SHOP THIS RECIPE** module.

Examples:

- spices
- brown sugar
- mustard
- Worcestershire
- apple cider vinegar
- honey
- molasses
- soy sauce
- pepper
- kosher salt
- sauces/condiments
- shelf-stable ingredients

Fresh/perishable meat availability varies by user and location. Do not promise an exact Amazon Fresh product is available everywhere.

Use current Amazon Associates-compliant linking methods and verify at implementation time.

Potential UI:

```text
SHOP THIS RECIPE

[ ] Kosher salt
[ ] Coarse black pepper
[ ] Apple cider vinegar
[ ] Brown sugar
[ ] Worcestershire
[ ] Smoked paprika

Shop ingredients on Amazon
```

If viable under current Amazon terms, provide an Amazon Fresh / Grocery path for eligible ingredients.

Do not fabricate cart functionality that Amazon does not officially support.

Do not hard-code unverified ASINs.

## Current program research note — MUST REVERIFY BEFORE SHIPPING

As of the brief date, Amazon Associates' published standard commission schedule lists **Amazon Fresh and Grocery at 1%**, and lists a **$1 special commission for an eligible Prime customer's first Amazon Fresh purchase**.

Treat this as changing program data; Claude must verify the current program terms before production implementation and document the verification.

---

# 12. AFFILIATE INTEGRITY

Permanent rules:

- exact product identity where an exact product is claimed
- no fake star ratings
- no fake pricing
- no stale price copy
- no broken affiliate links
- no cloaking that violates program rules
- required Amazon disclosure visible
- contextual placements, not spam
- affiliate clicks use the existing measurement contract
- no paid-ad traffic directly to Amazon if disallowed under current Associates terms
- verify links before deployment

Build reusable commerce modules instead of hand-coding affiliate boxes into individual articles.

---

# 13. FREE DOWNLOADABLE FIELD GUIDE

The lead magnet should be upgraded from a basic reference card into a premium Pit Log field guide.

Working concept:

# PIT LOG MEAT CUTS, TEMPS & SMOKE FIELD GUIDE

Potential 12–16 page format:

- cover / Pit Log doctrine
- safe temp vs preferred finish
- beef
- pork
- lamb
- goat
- chicken
- salmon
- smoke wood pairing chart
- master temperature reference
- smoking planning cheat sheet
- signature sauce/rub teaser
- cook-log page
- CTA to app
- CTA to book
- CTA to interactive guides

This should look valuable enough that a user would have paid for it.

It remains the email-capture asset.

Use the current portfolio email infrastructure; do not create a separate email stack just for Pit Log.

After capture, nurture can naturally include:

- recipe of the week
- wood/cut education
- app CTA
- gear recommendations
- poster releases
- book launch
- future sauce/rub products

---

# 14. PROPERTY THREE — KDP BOOK

The PDF is the seed. The book is the expanded premium product.

Working book concept:

# PIT LOG
## The BBQ Cuts, Temps & Smoking Field Guide

Alternative final title may evolve during KDP positioning.

## Core book promise

A visual, practical field guide that helps backyard pitmasters understand the meat, choose the right method and wood, manage temperature, troubleshoot the cook, and record what worked.

## Proposed structure

### Part I — Fire, Temperature & Smoke
- safety vs doneness vs tenderness
- thermometer technique
- pit temperature
- carryover
- resting and holding
- stall
- wrapping
- smoke quality
- wood pairing guide

### Part II — Beef
- anatomy
- primal cuts
- doneness
- each major cut
- recipes
- troubleshooting

### Part III — Pork
Same architecture.

### Part IV — Lamb

### Part V — Goat

### Part VI — Chicken

### Part VII — Salmon

### Part VIII — Pit Log House Recipes
- sauces
- rubs
- key meat recipes
- side dishes later if useful

### Part IX — Cook Logs
Printable/physical tracking pages.

The book must reuse the same canonical content records and source-controlled artwork as the website/PDF.

Do not let the KDP manuscript become an independently maintained fact set.

---

# 15. PRINT-ON-DEMAND POSTER / ART BUSINESS

This creative work is strong enough to become its own physical product layer.

Integrate POD into pitlog.app rather than launching an unrelated storefront initially.

## Initial poster families

### A. Full infographic field guides
- Beef Cuts & Cooking Guide
- Pork Cuts & Cooking Guide
- Lamb Cuts & Cooking Guide
- Goat Cuts & Cooking Guide
- Chicken Cuts & Cooking Guide
- Salmon Cuts & Cooking Guide
- Smoke Wood Pairing Guide

### B. Minimal butcher-chart art
- Beef Cuts — Know Your Cuts
- Pork Cuts
- Lamb Cuts
- Goat Cuts
- Chicken Cuts
- Salmon anatomy

### C. Future reference posters
- BBQ Temperature Guide
- Brisket Timeline
- Rib Guide
- Smoke Woods
- Steak Doneness
- Sauce Families
- Rub Flavor Wheel
- "Smoke. Log. Master." brand art

## Provider research

Compare **Gelato vs Printful** for:

- US print quality
- poster sizes
- framed print options
- matte vs premium paper
- shipping economics
- API / ecommerce integration
- fulfillment reliability
- international fulfillment
- margins
- white-label packaging where available

Choose one initial provider unless there is a compelling reason for dual providers.

**Do not build an unnecessary abstraction framework for two POD APIs before choosing the first provider.**

## Product experience

Site routes could include:

```text
/posters
/posters/beef-cuts
/posters/smoke-wood-pairing
```

Each product page should include:

- high-quality product mockup
- size choices
- paper/framing options
- price
- shipping estimate when available
- educational context
- link to interactive guide
- link to app
- link to KDP book

POD art should use production-ready, high-resolution, properly typeset files — not low-resolution generation outputs.

Preserve editable source/master assets.

---

# 16. SEO / AIO AUTHORITY STRATEGY

Pit Log should be structured for both search engines and LLM retrieval.

Requirements:

- clear semantic page hierarchy
- authoritative answer-first introductions
- factual tables
- primary-source citations
- author/editor information
- source methodology page
- updated/reviewed dates
- internal links across the knowledge graph
- crawlable text alternatives for graphics
- image alt text
- canonical URLs
- breadcrumbs
- XML sitemap
- clean structured data
- no hidden answer content
- no thin auto-generated doorway pages

Use structured data accurately:

- Recipe for real recipes
- Product for Pit Log's own POD products where appropriate
- BreadcrumbList
- Article where relevant
- ItemList for genuine visible lists

Do not add FAQ schema simply because a page can be expressed as questions.

## AIO design principle

For important questions, include concise self-contained answer blocks that can be understood without navigating an interactive component.

Example:

> **What temperature is brisket done?**  
> Brisket commonly becomes tender around 195–205°F, but temperature is only a checkpoint. Finish when a probe enters the flat with very little resistance. USDA safety guidance and barbecue tenderness targets are different concepts.

Then provide the deeper guide.

---

# 17. CONTENT EXPANSION ROADMAP

Do not mass-produce this immediately, but architect for eventual authority clusters such as:

### Beef
- brisket done temp
- brisket stall
- brisket wrap temp
- flat vs point
- brisket rest
- ribeye doneness
- tri-tip temperature
- short ribs
- chuck vs brisket
- slice against grain

### Pork
- shoulder temp
- ribs done
- pork chop temp
- loin vs tenderloin
- belly/burnt ends

### Chicken
- breast vs thigh temperature
- whole chicken
- wings
- spatchcock
- smoke wood pairings

### Lamb / Goat
- cut maps
- shoulder
- rack/chops
- leg
- low-and-slow techniques

### Salmon
- salmon temperature
- smoking salmon
- alder vs fruitwood
- center vs tail cut
- cedar plank

### Shared
- smoke wood guide
- rubs
- sauces
- thermometer guides
- smoker guides
- butcher paper
- charcoal/pellet guides

---

# 18. DATA MODEL — REUSABLE ACROSS ALL SURFACES

Animal/cut records should support at minimum:

```text
animal
slug
name
primal
short_description
long_description
tenderness_score
richness_score
best_methods[]
common_retail_cuts[]
safe_temp_guidance
doneness_ranges[]
pitmaster_finish_guidance
planning_time_guidance
rest_guidance
slice_direction
best_woods[]
common_mistakes[]
recipe_refs[]
gear_category_refs[]
ingredient_refs[]
source_refs[]
review_status
updated_at
```

Recipe records should support:

```text
slug
title
status
animal
cuts[]
description
yield
prep_time
cook_time_guidance
pit_temp_guidance
finish_guidance
wood_refs[]
ingredient_groups[]
steps[]
equipment[]
safety_notes[]
source_refs[]
related_cut_refs[]
related_recipe_refs[]
shop_ingredient_refs[]
shop_gear_refs[]
app_log_prefill
review_status
```

Wood records:

```text
slug
name
strength
flavor_character
best_animals[]
best_cuts[]
blend_ideas[]
avoid_or_use_lightly_with[]
source_refs[]
```

POD records:

```text
slug
title
art_master
print_sizes[]
variants[]
provider_product_id
pricing
fulfillment_status
seo_copy
related_content_refs[]
```

---

# 19. ANALYTICS / MEASUREMENT

Use the existing portfolio measurement contract.

Track useful funnel events such as:

- `animal_select`
- `cut_select`
- `wood_select`
- `recipe_open`
- `recipe_print`
- `shop_ingredients_click`
- `affiliate_click`
- `pod_view`
- `pod_add_to_cart`
- `pod_purchase`
- `pdf_cta`
- `lead_capture`
- `app_cta`
- `book_cta`

Do not create a new analytics stack if a portfolio standard already exists.

Privacy disclosures must match actual tracking.

---

# 20. THREE-PROPERTY IMPLEMENTATION PLAN

Claude should work on the three primary properties in parallel but keep shared content centralized.

## LANE A — WEBSITE

Begin immediately:

- reconnaissance of pitlog.app
- shared content schema
- route architecture
- interactive diagram component
- beef implementation as proving animal
- wood guide architecture
- recipe engine
- affiliate/product module architecture
- ingredient-commerce module
- POD catalog architecture
- lead magnet integration
- SEO/AIO foundation

## LANE B — APP

Begin with reconnaissance and architecture; implement safely depending on current portfolio store gates:

- map existing Pit Master Log code
- design Cuts & Temps / Recipes adapter
- shared content import
- animal/cut quick reference
- recipe → Log This Cook prefill contract
- deep-link contract between site and app

Do not submit/release a new app binary merely because this content work started.

## LANE C — KDP / BOOK SOURCE

Begin building the manuscript/source architecture in parallel:

- chapter map
- shared-content ingestion plan
- high-res asset requirements
- source/citation system
- recipe chapter structure
- log-page structure
- crosswalk between PDF and book

This milestone does not require KDP upload.

---

# 21. PRINTABLE / GRAPHIC ASSET PIPELINE

GPT continues creating graphics on mobile/ChatGPT.

Claude should provide a clear asset-ingestion contract:

- master filename
- target web dimensions
- target app dimensions
- print master requirements
- transparent vs opaque needs
- alt text
- source/provenance
- version
- checksum if helpful

For interactive diagrams, Claude should be able to take an approved raster/master art file and overlay coordinate hotspots without requiring GPT to recreate it as SVG immediately.

Later, high-resolution print masters can be rebuilt or vectorized as needed for POD/KDP quality.

---

# 22. PROVIDER / PROGRAM VERIFICATION

Before enabling production commerce, verify live:

- Amazon Associates terms
- Amazon Grocery / Fresh commission and linking support
- direct affiliate programs
- Gelato vs Printful
- KDP book specs
- App Store / Google Play implications of any app-to-commerce links

Document source URLs and date checked.

Do not rely on remembered commission rates or old program docs.

---

# 23. WHAT NOT TO DO

Do not:

- redesign Pit Master Log from scratch
- build a general-purpose CMS
- duplicate canonical food-safety facts across repos
- let AI-generated poster text become the factual database
- auto-generate hundreds of thin SEO pages
- invent ASINs
- invent product prices/reviews
- create fake recipe ratings
- call untested Pit Log recipes "official"
- overbuild POD provider abstraction
- add affiliate clutter to the app
- break existing app/site launch work
- write routine status chatter back to ARCH

Material portfolio state changes can go through the normal canonical portfolio handoff process.

---

# 24. MILESTONE 0 — RECON + FOUNDATION

Start with one controlled milestone across the ecosystem.

## Deliverables

### Website
- current repo audit
- proposed route map
- shared content schema
- beef interactive prototype/scaffold
- recipe schema
- wood schema
- affiliate module inventory
- ingredient-commerce approach
- POD architecture
- SEO/AIO gap analysis

### App
- current repo audit
- proposed Cuts & Temps architecture
- recipe → log prefill contract
- site/app deep-link plan
- no forced release

### KDP
- book architecture
- canonical-content reuse plan
- art/print specification requirements
- PDF → book crosswalk

### Commerce
- Amazon Associates/Fresh current-term verification
- relevant direct-affiliate shortlist
- Gelato vs Printful recommendation
- implementation dependency map

---

# 25. REQUIRED HANDOFF

Save outside customer-facing repos:

`PITLOG_MASTER_ECOSYSTEM_M0_REVIEW.md`

Include:

1. Executive verdict
2. Current repo/property state
3. Shared content architecture
4. Website plan
5. App plan
6. KDP/book plan
7. PDF/lead-magnet plan
8. Interactive diagram system
9. Recipe system
10. Amazon/Amazon Fresh strategy
11. Direct affiliate strategy
12. POD strategy and provider recommendation
13. SEO/AIO authority architecture
14. Analytics
15. Safety/provenance controls
16. Exact implementation work completed
17. Remaining inputs required from GPT
18. Risks / blockers
19. Recommended M1 scope
20. Scope compliance

**Terminal summary only:**
- verdict
- handoff path
- work completed
- blockers
- next recommended milestone

STOP after the handoff. Do not begin mass content generation or a store submission without review.

---

# 26. THE PRODUCT STANDARD

Pit Log should ultimately feel like three things at once:

**A trusted barbecue field guide.**  
**A practical cook-history tool.**  
**A commerce ecosystem where every recommendation is genuinely useful to the cook.**

The content is the moat.

The app captures behavior and history.

The site captures discovery and commerce.

The PDF captures the email relationship.

The KDP book captures Amazon/search authority and premium reference value.

The posters turn the knowledge system into physical decor.

The recipes create proprietary Pit Log intellectual property.

All of it should compound instead of being built as separate projects.
