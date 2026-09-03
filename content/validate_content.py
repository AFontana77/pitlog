"""
Pit Log content spine gate.

Parsing clean proves the files are JSON. This checks the substance:

  - every source_ref resolves to sources/sources.json
  - every record carries review_status (enum) and updated_at (ISO date)
  - every SAFETY_MINIMUM and SAFETY_HANDLING record cites at least one tier-1 source
  - every CULINARY_PREFERENCE tier below its animal's SAFETY_MINIMUM is flagged
    below_safety_minimum and its record carries the disclosure sentence
  - no CULINARY_PREFERENCE record describes a below-minimum figure as "safe"
  - every PITMASTER_TENDERNESS window sits at or above its safety minimum
  - every cut region's safe_temp_ref / doneness_refs / tenderness_target_ref /
    wood refs / recipe refs / gear refs resolve
  - every recipe has a legal status and no recipe is OFFICIAL without kitchen_tested
  - every master named in animals/ and recipes/ exists in graphics/masters.json and
    every recipe a master names exists in recipes/
  - every master below print resolution is not marked as having a print_master
  - every POD product's art_master resolves and none is live without a print master

Run:  py -3.11 content/validate_content.py        (from the pitlog repo root)
Exit 1 on any failure. Extend it; never weaken it.
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REVIEW = {"DRAFT", "NEEDS_SOURCE", "SOURCED", "REVIEWED", "RETIRED"}
RECIPE_STATUS = {"PLANNED", "TEST_V1", "TEST_V2", "TEST_V3", "OFFICIAL", "RETIRED"}
DATE_RX = re.compile(r"^\d{4}-\d{2}-\d{2}$")
fails, warns = [], []


def load(rel):
    with open(os.path.join(HERE, rel), encoding="utf-8") as f:
        return json.load(f)


def fail(msg):
    fails.append(msg)


def warn(msg):
    warns.append(msg)


# ------------------------------------------------------------------ load all
S = load("sources/sources.json")
SOURCES = {s["id"]: s for s in S["sources"]}
A = load("animals/animals.json")["animals"]
CUTS = {a["slug"]: load(f"cuts/{a['slug']}.json") for a in A}
SAFE = load("temperatures/safety_minimums.json")["records"]
DONE = load("temperatures/culinary_doneness.json")["records"]
TARG = load("temperatures/pitmaster_targets.json")["records"]
HAND = load("temperatures/handling.json")["records"]
WOODS = load("woods/woods.json")["woods"]
RECIPES = load("recipes/recipes.json")["recipes"]
GEAR = load("gear/gear_categories.json")["categories"]
MASTERS = load("graphics/masters.json")["masters"]
POD = load("pod/catalog.json")

SAFE_BY_ID = {r["id"]: r for r in SAFE}
DONE_BY_ID = {r["id"]: r for r in DONE}
TARG_BY_ID = {r["id"]: r for r in TARG}
HAND_BY_ID = {r["id"]: r for r in HAND}
WOOD_IDS = {w["slug"] for w in WOODS}
RECIPE_IDS = {r["slug"] for r in RECIPES}
GEAR_IDS = {g["slug"] for g in GEAR}
MASTER_IDS = {m["id"] for m in MASTERS}
FINISH_IDS = set(SAFE_BY_ID) | set(DONE_BY_ID) | set(TARG_BY_ID)
TEMP_IDS = FINISH_IDS | set(HAND_BY_ID)


# ------------------------------------------------------------ generic checks
def check_common(rec, where, require_source=True):
    rid = rec.get("id") or rec.get("slug") or "?"
    rs = rec.get("review_status")
    if rs not in REVIEW:
        fail(f"{where}:{rid} review_status {rs!r} not in {sorted(REVIEW)}")
    ua = rec.get("updated_at", "")
    if not DATE_RX.match(str(ua)):
        fail(f"{where}:{rid} updated_at {ua!r} is not an ISO date")
    refs = rec.get("source_refs", [])
    for ref in refs:
        if ref not in SOURCES:
            fail(f"{where}:{rid} source_ref {ref!r} does not resolve")
    if require_source and not refs and rs in {"SOURCED", "REVIEWED"}:
        fail(f"{where}:{rid} is {rs} but cites no source")
    return [SOURCES[r] for r in refs if r in SOURCES]


def has_tier1(srcs):
    return any(s["tier"] == 1 for s in srcs)


# ------------------------------------------------------------------ sources
for s in S["sources"]:
    for k in ("id", "org", "title", "url", "tier", "accessed", "update_sensitivity", "supports"):
        if k not in s:
            fail(f"sources:{s.get('id')} missing {k}")
    if not DATE_RX.match(s.get("accessed", "")):
        fail(f"sources:{s['id']} accessed date malformed")
    if not s.get("supports"):
        fail(f"sources:{s['id']} supports[] is empty; a source must say what it supports")

# ------------------------------------------------------------------- safety
for r in SAFE:
    srcs = check_common(r, "safety")
    if r.get("kind") != "SAFETY_MINIMUM":
        fail(f"safety:{r['id']} kind must be SAFETY_MINIMUM")
    if not has_tier1(srcs):
        fail(f"safety:{r['id']} has no tier-1 source")
    if not isinstance(r.get("temp_f"), (int, float)):
        fail(f"safety:{r['id']} temp_f missing")
    if r["review_status"] not in {"SOURCED", "REVIEWED"}:
        fail(f"safety:{r['id']} must be SOURCED or REVIEWED, is {r['review_status']}")

for r in HAND:
    srcs = check_common(r, "handling")
    if r.get("kind") == "SAFETY_HANDLING" and not has_tier1(srcs):
        fail(f"handling:{r['id']} SAFETY_HANDLING without a tier-1 source")

# ------------------------------------------------------------------ culinary
SAFE_WORD = re.compile(r"\bsafe\b", re.I)
for r in DONE:
    check_common(r, "doneness")
    if r.get("kind") != "CULINARY_PREFERENCE":
        fail(f"doneness:{r['id']} kind must be CULINARY_PREFERENCE")
    sref = r.get("safety_ref")
    if sref not in SAFE_BY_ID:
        fail(f"doneness:{r['id']} safety_ref {sref!r} does not resolve")
        continue
    floor = SAFE_BY_ID[sref]["temp_f"]
    any_below = False
    for t in r.get("tiers", []):
        lo = t.get("temp_f_min")
        below = lo is not None and lo < floor
        if below:
            any_below = True
        if below and not t.get("below_safety_minimum"):
            fail(f"doneness:{r['id']} tier {t.get('label')!r} min {lo} < {floor} but not flagged below_safety_minimum")
        if not below and t.get("below_safety_minimum"):
            fail(f"doneness:{r['id']} tier {t.get('label')!r} flagged below minimum but {lo} >= {floor}")
        # a label may not call a below-minimum tier safe
        if below and SAFE_WORD.search(t.get("label", "")) and "not" not in t.get("label", "").lower():
            fail(f"doneness:{r['id']} tier label {t.get('label')!r} calls a below-minimum figure safe")
    if any_below:
        if not r.get("below_safety_minimum"):
            fail(f"doneness:{r['id']} has tiers below {floor} but record-level below_safety_minimum is not true")
        d = r.get("disclosure") or ""
        if "USDA" not in d or "governs" not in d:
            fail(f"doneness:{r['id']} below-minimum record lacks the USDA-governs disclosure")
    else:
        if r.get("below_safety_minimum"):
            fail(f"doneness:{r['id']} flagged below minimum but no tier is")

# ---------------------------------------------------------------- pitmaster
for r in TARG:
    check_common(r, "target", require_source=False)
    if r.get("kind") != "PITMASTER_TENDERNESS":
        fail(f"target:{r['id']} kind must be PITMASTER_TENDERNESS")
    sref = r.get("safety_ref")
    if sref is None:
        continue
    if sref not in SAFE_BY_ID:
        fail(f"target:{r['id']} safety_ref {sref!r} does not resolve")
        continue
    floor = SAFE_BY_ID[sref]["temp_f"]
    w = r.get("window_f") or {}
    if w.get("min") is not None and w["min"] < floor:
        fail(f"target:{r['id']} window min {w['min']} is below the safety floor {floor}; a tenderness target can never sit under the minimum")
    if r.get("planning_time") and "pproximate" not in r["planning_time"]:
        fail(f"target:{r['id']} planning_time must be labelled approximate")

# -------------------------------------------------------------------- woods
for w in WOODS:
    check_common(w, "woods", require_source=False)
    if w.get("strength") not in {"mild", "medium", "strong"}:
        fail(f"woods:{w['slug']} strength invalid")

# ------------------------------------------------------------------ animals
for a in A:
    check_common(a, "animals")
    if a.get("safety_ref") not in SAFE_BY_ID:
        fail(f"animals:{a['slug']} safety_ref does not resolve")
    for wr in a.get("wood_refs", []):
        if wr not in WOOD_IDS:
            fail(f"animals:{a['slug']} wood_ref {wr!r} does not resolve")
    for key in ("master_graphic", "secondary_graphic"):
        mg = a.get(key)
        if mg and mg not in MASTER_IDS:
            fail(f"animals:{a['slug']} {key} {mg!r} not in graphics/masters.json")
    regions = {r["slug"] for r in CUTS[a["slug"]]["regions"]}
    scheme = set(a["primal_scheme"]["regions"])
    if regions != scheme:
        fail(f"animals:{a['slug']} primal_scheme regions {sorted(scheme)} != cuts file regions {sorted(regions)}")

# --------------------------------------------------------------------- cuts
for animal, doc in CUTS.items():
    for reg in doc["regions"]:
        where = f"cuts/{animal}"
        check_common(reg, where)
        rid = reg["slug"]
        if reg.get("safe_temp_ref") not in SAFE_BY_ID:
            fail(f"{where}:{rid} safe_temp_ref does not resolve")
        for d in reg.get("doneness_refs", []):
            if d not in DONE_BY_ID:
                fail(f"{where}:{rid} doneness_ref {d!r} does not resolve")
        t = reg.get("tenderness_target_ref")
        if t and t not in TARG_BY_ID:
            fail(f"{where}:{rid} tenderness_target_ref {t!r} does not resolve")
        for rc in reg.get("retail_cuts", []):
            fin = rc.get("finish")
            if fin not in FINISH_IDS:
                fail(f"{where}:{rid}/{rc.get('slug')} finish {fin!r} does not resolve to a temperature record")
        for wref in reg.get("best_woods", []):
            slug = wref.split(" ")[0].lower()
            if slug not in WOOD_IDS:
                fail(f"{where}:{rid} best_wood {wref!r} does not start with a wood slug")
        for rr in reg.get("recipe_refs", []):
            if rr not in RECIPE_IDS:
                fail(f"{where}:{rid} recipe_ref {rr!r} does not resolve")
        for gr in reg.get("gear_category_refs", []):
            if gr not in GEAR_IDS:
                fail(f"{where}:{rid} gear_category_ref {gr!r} does not resolve")
        for k in ("tenderness_score", "richness_score"):
            v = reg.get(k)
            if not isinstance(v, int) or not 1 <= v <= 5:
                fail(f"{where}:{rid} {k} must be an int 1..5")
        ptg = reg.get("planning_time_guidance") or ""
        if ptg and "pproximate" not in ptg and "Cooks with" not in ptg:
            fail(f"{where}:{rid} planning_time_guidance must be labelled approximate")

# ------------------------------------------------------------------ recipes
for r in RECIPES:
    check_common(r, "recipes", require_source=False)
    if r.get("status") not in RECIPE_STATUS:
        fail(f"recipes:{r['slug']} status {r.get('status')!r} invalid")
    if r.get("status") == "OFFICIAL" and not r.get("kitchen_tested"):
        fail(f"recipes:{r['slug']} is OFFICIAL without kitchen_tested evidence")
    if r.get("status") == "PLANNED":
        # A quantity is a number followed by a unit. A grind size ("16-mesh") or
        # a cut spec ("2-inch") is not a quantity and is allowed as direction.
        QTY_RX = re.compile(r"\d+(\.\d+)?\s*(cups?|tbsp|tsp|tablespoons?|teaspoons?|oz|ounces?|lbs?|pounds?|g|grams?|kg|ml|l|liters?|quarts?|pints?|cloves?|sticks?)\b", re.I)
        for ing in r.get("concept_ingredients", []):
            if QTY_RX.search(ing):
                fail(f"recipes:{r['slug']} PLANNED recipe carries a quantity in concept_ingredients ({ing!r}); quantities arrive at TEST_V1")
    if r.get("status") not in ("PLANNED", "RETIRED"):
        # From TEST_V1 up a recipe is a real recipe: quantities, steps, yield.
        groups = r.get("ingredient_groups") or []
        if not groups or not any(g.get("items") for g in groups):
            fail(f"recipes:{r['slug']} is {r['status']} without ingredient_groups")
        if not r.get("steps"):
            fail(f"recipes:{r['slug']} is {r['status']} without steps")
        if not r.get("yield"):
            fail(f"recipes:{r['slug']} is {r['status']} without yield")
        if r.get("kitchen_tested") is None:
            fail(f"recipes:{r['slug']} is {r['status']} without an explicit kitchen_tested flag")
        # A recipe that touches a safety minimum must say the number, and may not
        # tell the cook to pull under it. Cheap regex, deliberately blunt.
        text = " ".join(r.get("steps", [])).lower()
        if r.get("animal") == "chicken" and "165" not in text:
            fail(f"recipes:{r['slug']} chicken recipe never states 165 F")
        if r.get("animal") == "salmon" and "145" not in text:
            fail(f"recipes:{r['slug']} salmon recipe never states 145 F")
        if r.get("animal") in ("beef", "pork", "lamb", "goat") and "145" not in text:
            fail(f"recipes:{r['slug']} red-meat recipe never states the 145 F minimum")
    for k in ("pit_temp_ref", "finish_ref"):
        v = r.get(k)
        if v and v not in TEMP_IDS:
            fail(f"recipes:{r['slug']} {k} {v!r} does not resolve")
    for sref in r.get("safety_refs", []):
        if sref not in TEMP_IDS:
            fail(f"recipes:{r['slug']} safety_ref {sref!r} does not resolve")
    for wr in r.get("wood_refs", []):
        if wr not in WOOD_IDS:
            fail(f"recipes:{r['slug']} wood_ref {wr!r} does not resolve")
    for er in r.get("equipment_refs", []):
        if er not in GEAR_IDS:
            fail(f"recipes:{r['slug']} equipment_ref {er!r} does not resolve")
    pg = r.get("promised_by_graphic")
    if pg and pg not in MASTER_IDS:
        fail(f"recipes:{r['slug']} promised_by_graphic {pg!r} not a master")
    if r.get("cook_time_guidance") and re.search(r"\d\s*(h|hour|min)", r["cook_time_guidance"]) and "estimate" not in r["cook_time_guidance"].lower() and "simmer" not in r["cook_time_guidance"].lower():
        fail(f"recipes:{r['slug']} cook_time_guidance carries a duration without 'estimate'")

# ----------------------------------------------------------------- graphics
for m in MASTERS:
    check_common(m, "masters", require_source=False)
    path = os.path.join(HERE, "..", m["file"])
    if not os.path.exists(path):
        fail(f"masters:{m['id']} file missing: {m['file']}")
    for rr in m.get("names_recipes", []):
        if rr not in RECIPE_IDS:
            fail(f"masters:{m['id']} names recipe {rr!r} that has no record")
    px = m.get("px", [0, 0])
    if px[0] < 5400 and "OPEN" in m.get("publish_gate", "") and "print" in m.get("publish_gate", "").lower():
        fail(f"masters:{m['id']} cannot be open for print below 5400 px wide")
    open_safety = [d for d in m.get("defects", []) if d.get("severity") == "safety"]
    if open_safety and m.get("publish_gate", "").startswith("OPEN"):
        fail(f"masters:{m['id']} has an open safety defect but publish_gate is OPEN")

# ---------------------------------------------------------------------- pod
for p in POD["products"]:
    check_common(p, "pod", require_source=False)
    am = p.get("art_master")
    if am and am not in MASTER_IDS:
        fail(f"pod:{p['slug']} art_master {am!r} does not resolve")
    if p.get("fulfillment_status") not in {"NOT_CREATED", "DRAFT_IN_PROVIDER", "LIVE", "RETIRED"}:
        fail(f"pod:{p['slug']} fulfillment_status invalid")
    if p.get("fulfillment_status") == "LIVE" and not p.get("print_master"):
        fail(f"pod:{p['slug']} is LIVE without a print master")

# --------------------------------------------------------- product manifest
# Built by tools/gear/build_asin_manifest.py. These checks defend the two
# properties the site relies on and the build script cannot enforce by itself:
# that a shipped pick carries its evidence, and that no price ever gets in.
MANIFEST_PATH = os.path.join(HERE, "gear", "product_manifest.json")
if os.path.exists(MANIFEST_PATH):
    MAN = load("gear/product_manifest.json")
    GEAR_SLUGS = {g["slug"] for g in GEAR}
    seen_asins = {}
    n_products = 0
    for family in ("gear", "ingredients"):
        for slug, entry in MAN.get(family, {}).items():
            if family == "gear" and slug not in GEAR_SLUGS:
                fail(f"manifest:{slug} is not a gear category in gear_categories.json")
            status = entry.get("status")
            if status not in {"VERIFIED", "NO_VERIFIED_PRODUCT", "NO_CANDIDATES", "NOT_SOURCED"}:
                fail(f"manifest:{slug} status {status!r} is not a known state")
            products = entry.get("products") or []
            if status == "VERIFIED" and not products:
                fail(f"manifest:{slug} claims VERIFIED with no products")
            if status != "VERIFIED" and products:
                fail(f"manifest:{slug} is {status} but carries products")
            for pr in products:
                n_products += 1
                asin = pr.get("asin", "")
                if not re.fullmatch(r"[A-Z0-9]{10}", asin):
                    fail(f"manifest:{slug} {asin!r} is not an ASIN")
                # Every claim a pick makes must travel with the evidence for it.
                for field in ("keepa_title", "brand", "category_tree", "sales_rank"):
                    if pr.get(field) in (None, "", []):
                        fail(f"manifest:{slug}:{asin} shipped without {field}")
                if pr.get("is_redirect_asin"):
                    fail(f"manifest:{slug}:{asin} is a redirect ASIN and must not ship")
                if asin in seen_asins:
                    fail(f"manifest:{asin} appears in both {seen_asins[asin]} and {slug}")
                seen_asins[asin] = slug
    # No price, anywhere. The Operating Agreement only permits displaying price
    # data from the Product Advertising API refreshed within 24 hours, and a
    # price frozen into a JSON file is stale the day after it is written.
    blob = json.dumps(MAN)
    for banned in ("\"price\"", "\"price_from\"", "\"list_price\"", "\"current_price\""):
        if banned in blob:
            fail(f"manifest carries {banned}; no price may be stored or displayed")
else:
    MAN, n_products = {"gear": {}, "ingredients": {}}, 0

# -------------------------------------------------------------------- report
counts = {
    "sources": len(SOURCES), "animals": len(A),
    "regions": sum(len(d["regions"]) for d in CUTS.values()),
    "retail_cuts": sum(len(r.get("retail_cuts", [])) for d in CUTS.values() for r in d["regions"]),
    "safety_minimums": len(SAFE), "handling_rules": len(HAND),
    "culinary_doneness": len(DONE), "pitmaster_targets": len(TARG),
    "woods": len(WOODS), "recipes": len(RECIPES), "gear_categories": len(GEAR),
    "masters": len(MASTERS), "pod_products": len(POD["products"]),
    "verified_products": n_products,
}
ns = sum(1 for d in CUTS.values() for r in d["regions"] if r["review_status"] == "NEEDS_SOURCE")
ns += sum(1 for r in DONE + TARG + WOODS if r["review_status"] == "NEEDS_SOURCE")
print("PIT LOG CONTENT SPINE")
for k, v in counts.items():
    print(f"  {k:<20} {v}")
print(f"  {'NEEDS_SOURCE':<20} {ns}  (craft records awaiting a tier 1-3 source; allowed, labelled)")
for w in warns:
    print("  [WARN]", w)
print()
if fails:
    print(f"FAILED {len(fails)} CHECK(S):")
    for f in fails:
        print("  -", f)
    sys.exit(1)
print("ALL CONTENT SPINE CHECKS PASS.")
