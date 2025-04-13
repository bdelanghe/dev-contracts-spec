import { z } from "zod";

// --- Type Definitions ---

/**
 * Represents the structure of a single resolved token.
 */
export type ResolvedToken = {
  path: string;
  value: unknown;
};

/**
 * Represents the structure of a collection of resolved tokens (key-value pairs).
 */
export type ResolvedTokenCollection = Record<string, unknown>;

// --- Zod Schemas ---

/**
 * Zod schema for a single, resolved configuration token.
 * This is intended to be stored in the lockfile.
 */
export const ResolvedTokenSchema: z.ZodType<ResolvedToken> = z.object({
  /**
   * A unique identifier or path for the token, indicating where it applies.
   * Example: "$.metadata.license", "$.linters.deno.enable"
   * Using JSONPath-like syntax is a possibility.
   */
  path: z.string().describe(
    "Unique identifier/path for the token (e.g., using JSONPath syntax).",
  ),
  /**
   * The resolved value of the token.
   */
  value: z.unknown().describe("The resolved value of the token."),
  // TBD: Add metadata? Source location in contract? Type information?
}).describe("A single resolved configuration token.");

/**
 * Zod schema for a collection of resolved tokens, likely stored in the lockfile.
 */
export const ResolvedTokenCollectionSchema: z.ZodType<ResolvedTokenCollection> =
  z
    .record(
      // The key could be the token path for easy lookup
      z.string().describe("Token path/identifier"),
      z.unknown(), // Store only the resolved value, path is the key
    ).describe("A collection of resolved tokens, keyed by their path.");

// Note: We still need to define how tokens are *declared* within the
// ContractSchema itself. This might involve a different schema structure
// or a way to mark existing fields as tokenizable.
