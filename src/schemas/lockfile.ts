import { z } from "zod";

/**
 * Placeholder schema for the `contracts.toml.lock` file.
 * This will contain the resolved, tokenized state of all contracts
 * at the time the lock file was generated.
 *
 * TODO: Define the actual structure based on how resolution works.
 * It will likely involve mapping original refs (URLs/paths) to
 * canonical, immutable references (e.g., commit hashes for git repos,
 * content hashes for files/URLs).
 */
export const LockfileSchema = z.object({
  version: z.literal(1).describe("Lockfile format version."),
  // TODO: Define structure for resolved contracts/imports
  resolved: z.record(z.string(), z.any())
    .describe("Map of original references to their resolved, immutable state."),
}).strict();

export type Lockfile = z.infer<typeof LockfileSchema>;
