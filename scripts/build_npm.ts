import { build, emptyDir } from "https://deno.land/x/dnt@0.40.0/mod.ts";
import denoJson from "../deno.json" with { type: "json" };

await emptyDir("./npm");

const GITHUB_REPOSITORY = Deno.env.get("GITHUB_REPOSITORY");
if (!GITHUB_REPOSITORY) {
  throw new Error("GITHUB_REPOSITORY environment variable not set.");
}
const [owner, repo] = GITHUB_REPOSITORY.split('/');

await build({
  entryPoints: [denoJson.exports],
  outDir: "./npm",
  shims: {
    // Provide compatibility for Deno specific APIs like Deno.env
    deno: true,
  },
  // Ensure import_map.json is used for mapping dependencies
  importMap: denoJson.importMap,
  package: {
    // Output package.json
    name: denoJson.name, // Use the name from deno.json
    version: denoJson.version, // Use the version from deno.json
    description: "Dev Contracts Specification types and schemas.", // Add a description
    license: denoJson.license, // Use the license from deno.json
    repository: {
      type: "git",
      url: `git+https://github.com/${owner}/${repo}.git`,
    },
    bugs: {
      url: `https://github.com/${owner}/${repo}/issues`,
    },
    // Point to the JSR package for the canonical source
    // See: https://jsr.io/docs/publishing-packages/npm-compatibility#packagejson-properties
    jsr: `@${denoJson.name.substring(1)}@${denoJson.version}` 
  },
  scriptModule: false, // Don't create a UMD module
  typeCheck: "both", // Run type checking during build
  test: false, // Don't run tests as part of build
  declaration: "separate", // Generate separate .d.ts files
  // Filter out test files from the final package
  filterDiagnostic(_diagnostic) {
    // TODO: Add filtering if needed, e.g., ignore specific TS errors
    return true; 
  },
  // postBuild steps
  postBuild() {
    // Copy necessary files like LICENSE and README to the output directory
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
}); 
