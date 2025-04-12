import { zodToJsonSchema } from "zod-to-json-schema";
import { ContractSchema, LockfileSchema } from "../src/mod.ts";

// --- Contract Schema --- 
// TODO: Replace with the actual canonical URL to this file in the repository
const CONTRACT_SCHEMA_ID = "https://example.com/devcontracts/spec/contract-schema.json";
const CONTRACT_SCHEMA_FILE = "contract-schema.json";

// Generate the schema using the definition name
const contractBaseSchema = zodToJsonSchema(ContractSchema, "ContractSchema");

// Manually add the $id to the root of the schema object
const contractFinalSchema = {
  $id: CONTRACT_SCHEMA_ID,
  ...contractBaseSchema,
};

console.log(`Generating Contract schema (${CONTRACT_SCHEMA_ID}) in ${CONTRACT_SCHEMA_FILE}...`);

await Deno.writeTextFile(
  CONTRACT_SCHEMA_FILE,
  JSON.stringify(contractFinalSchema, null, 2) + "\n", // Use the final schema
);

console.log(`✅ Contract Schema successfully written to ${CONTRACT_SCHEMA_FILE}`);

// --- Lockfile Schema --- 
// TODO: Replace with the actual canonical URL to this file in the repository
const LOCKFILE_SCHEMA_ID = "https://example.com/devcontracts/spec/lockfile-schema.json";
const LOCKFILE_SCHEMA_FILE = "lockfile-schema.json";

// Generate the schema using the definition name
const lockfileBaseSchema = zodToJsonSchema(LockfileSchema, "LockfileSchema");

// Manually add the $id to the root of the schema object
const lockfileFinalSchema = {
  $id: LOCKFILE_SCHEMA_ID,
  ...lockfileBaseSchema,
};

console.log(`Generating Lockfile schema (${LOCKFILE_SCHEMA_ID}) in ${LOCKFILE_SCHEMA_FILE}...`);

await Deno.writeTextFile(
  LOCKFILE_SCHEMA_FILE,
  JSON.stringify(lockfileFinalSchema, null, 2) + "\n", // Use the final schema
);

console.log(`✅ Lockfile Schema successfully written to ${LOCKFILE_SCHEMA_FILE}`); 
