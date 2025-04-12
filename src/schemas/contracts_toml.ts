import { z } from "zod";
import { type Ref, RefSchema } from "./common.ts";

/** The definition of a task (command string). */
export type TaskDefinition = string;

/**
 * Schema for a single task definition within a contract.
 * Simplified to just a command string.
 */
export const TaskDefinitionSchema: z.ZodType<TaskDefinition> = z.string();

/** A single contract entry definition. */
export type ContractEntry = {
  ref: Ref;
};

/**
 * Schema for a single contract definition within `contracts.toml`.
 * Simplified to only include the required ref.
 */
export const ContractEntrySchema: z.ZodType<ContractEntry> = z.object({
  ref: RefSchema.describe(
    "Reference (URL or path) to the contract definition.",
  ),
}).strict();

/** Represents the parsed content of a `contracts.toml` file. */
export type Contract = {
  contracts: Record<string, ContractEntry>;
};

/**
 * Main schema for the `contracts.toml` file.
 * Simplified to only include the contracts map.
 */
export const ContractSchema: z.ZodType<Contract> = z.object({
  contracts: z.record(ContractEntrySchema)
    .describe("Definitions of individual contracts."),
}).strict();
