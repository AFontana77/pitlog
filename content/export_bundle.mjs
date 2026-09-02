// Bundles content/*.json into one file for consumers that cannot import the
// site's TypeScript: the Pit Master Log app (Expo) and the Python PDF/KDP tools.
//
//   node content/export_bundle.mjs            -> content-dist/pitlog-content.json
//
// The bundle is generated, never edited. It carries the git SHA and the
// validator's pass so a consumer can refuse a stale or unvalidated bundle.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const read = (rel) => JSON.parse(readFileSync(join(here, rel), "utf8"));

let sha = "unknown";
try {
  sha = execSync("git rev-parse --short HEAD", { cwd: here }).toString().trim();
} catch {}

const bundle = {
  _meta: {
    generated_at: new Date().toISOString(),
    git_sha: sha,
    contract: "pitlog content spine v1. Read content/README.md before consuming.",
    kinds: ["SAFETY_MINIMUM", "CULINARY_PREFERENCE", "PITMASTER_TENDERNESS"],
  },
  sources: read("sources/sources.json").sources,
  animals: read("animals/animals.json").animals,
  cuts: Object.fromEntries(
    ["beef", "pork", "lamb", "goat", "chicken", "salmon"].map((a) => [a, read(`cuts/${a}.json`).regions]),
  ),
  temperatures: {
    safety_minimums: read("temperatures/safety_minimums.json").records,
    culinary_doneness: read("temperatures/culinary_doneness.json").records,
    pitmaster_targets: read("temperatures/pitmaster_targets.json").records,
    handling: read("temperatures/handling.json").records,
  },
  woods: read("woods/woods.json").woods,
  recipes: read("recipes/recipes.json").recipes,
  gear_categories: read("gear/gear_categories.json").categories,
  graphics: read("graphics/masters.json").masters,
};

const outDir = join(here, "..", "content-dist");
mkdirSync(outDir, { recursive: true });
const out = join(outDir, "pitlog-content.json");
writeFileSync(out, JSON.stringify(bundle, null, 2));
console.log(`wrote ${out} (${sha})`);
