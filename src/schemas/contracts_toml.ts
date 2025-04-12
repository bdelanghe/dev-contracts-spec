import { z } from "zod";
import { RefSchema } from "./common.ts";

/**
 * Schema for a single task definition within a contract.
 * Mirrors Deno task structure (simple string or object with cwd).
 */
const TaskDefinitionSchema = z.union([
  z.string(),
  z.object({
    cmd: z.string(),
    cwd: z.string().optional(),
    // TODO: Add env vars, etc.?
  }),
]);

/**
 * Schema for a single contract definition within `contracts.toml`.
 */
const ContractEntrySchema = z.object({
  description: z.string().optional()
    .describe("Optional description of the contract."),
  ref: RefSchema.describe(
    "Reference (URL or path) to the contract definition.",
  ),
  tasks: z.record(TaskDefinitionSchema).optional()
    .describe("Contract-specific Deno tasks."),
  // TODO: Add dependencies? Runtime args?
  // dependencies: z.record(RefSchema).optional(),
}).strict(); // Disallow unknown keys

/**
 * Main schema for the `contracts.toml` file.
 */
export const ContractsTomlSchema = z.object({
  devcontracts: z.object({
    version: z.string().regex(/^\d+\.\d+\.\d+$/).optional()
      .describe("Version of the DevContracts spec this file adheres to."),
  }).optional().describe("Metadata about the DevContracts usage."),

  imports: z.record(RefSchema).optional()
    .describe("Mapping of import aliases to contract references (URLs/paths)."),

  tasks: z.record(TaskDefinitionSchema).optional()
    .describe("Global Deno tasks available to all contracts."),

  contracts: z.record(ContractEntrySchema)
    .describe("Definitions of individual contracts."),
})
  .strict(); // Disallow unknown keys at the root

export type ContractsToml = z.infer<typeof ContractsTomlSchema>;
export type ContractEntry = z.infer<typeof ContractEntrySchema>;
export type TaskDefinition = z.infer<typeof TaskDefinitionSchema>;
