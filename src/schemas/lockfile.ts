import { z } from "zod";

/** Represents the parsed content of a `contracts.toml.lock` file. */
export type Lockfile = {
  version: 1;
};

/**
 * Placeholder schema for the `contracts.toml.lock` file.
 * Simplified to only include the version.
 */
export const LockfileSchema: z.ZodType<Lockfile> = z.object({
  version: z.literal(1).describe("Lockfile format version."),
}).strict();
