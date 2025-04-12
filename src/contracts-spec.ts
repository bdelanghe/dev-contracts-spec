import { z } from "zod";

// --- Primitive/Reusable Types ---
const FileType = z.enum(["file", "directory", "symlink"]);
const IgnoreType = z.enum(["git", "contract"]);

// --- Section Schemas ---

// [schemas]
const SchemasSectionSchema = z.record(
    z.string().describe("Key name for the schema"),
    z.string().url().describe("URL or path to the JSON schema definition")
).describe("Collection of reusable schema definitions");

// [quality.lint.*]
const LinterQualitySchema = z.object({
    depends: z.array(z.string()).optional().describe("Dependencies for the linter (e.g., trunk)"),
    version: z.string().optional().describe("Specific version of the linter"),
}).catchall(z.any()); // Allow other specific configurations per linter

// [quality]
const QualitySectionSchema = z.object({
    lint: z.record(
        z.string().describe("Linter name (e.g., standardrb, yamllint)"),
        LinterQualitySchema
    ).optional().describe("Linting tool configurations"),
    // TODO: Add format, test, etc.
}).catchall(z.any()).describe("Defines configurations for code quality tools");

// [rules.structure]
const StructureRulesSchema = z.object({
    allow_empty_directory: z.boolean().optional().default(false).describe("If true, empty directories defined in the structure are allowed"),
    validate_schema: z.boolean().optional().default(true).describe("If true, validate files against their specified schemas during structure validation"),
}).catchall(z.any()); // Allow other structure-related rules

// [rules]
const RulesSectionSchema = z.object({
    structure: StructureRulesSchema.optional().describe("Rules specific to the [structure] validation"),
    // TODO: Add other rule categories
}).catchall(z.any()).describe("Defines rules for various validation and generation processes");

// [structure.*]
const StructureEntrySchema = z.object({
  type: FileType,
  purpose: z.string().optional().describe("Description of the file/directory purpose"),
  schema: z.string().optional().describe("Path to a schema for this specific file (overrides schema_ref)"),
  schema_ref: z.string().optional().describe("Reference to a key in the top-level [schemas] object"),
  types: z.string().optional().describe("Path to generated TypeScript types for this entry"),
  depends_on: z.array(z.string()).optional().describe("List of other structure keys this entry depends on"),
  affects: z.array(z.string()).optional().describe("List of other structure keys this entry affects"),
  ignores: z.array(IgnoreType).optional().describe("Specifies which validation processes should ignore this entry (e.g., git, contract structure checks)"),
}).catchall(z.string().or(z.array(z.string())).or(z.boolean())); // Allow custom metadata

// [structure]
const StructureSectionSchema = z.record(
    z.string().describe("Path relative to the project root"),
    StructureEntrySchema
).describe("Defines the expected project file structure");

// --- Top-Level Contract Schema ---
export const ContractsSchema = z.object({
    schema: z.string().optional().describe("Path to the meta-schema validating this contracts.toml file itself"),
    schemas: SchemasSectionSchema.optional(),
    quality: QualitySectionSchema.optional(),
    rules: RulesSectionSchema.optional(),
    structure: StructureSectionSchema,
    // TODO: Add [tools] section mirroring mise [tools]?
    // TODO: Add [tasks] section mirroring mise [tasks]?
}).catchall(z.any()); // Allow other top-level sections

// --- Exported Type ---
export type Contracts = z.infer<typeof ContractsSchema>;

// --- Example Usage (Commented Out) ---
/*
import { ContractsSchema } from './contracts-spec';
import * as path from 'path';
import * as fs from 'fs';
import TOML from '@iarna/toml';

try {
    const filePath = path.resolve(__dirname, '../../../../contracts.toml'); // Adjust path as needed
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = TOML.parse(fileContent);
    const validatedData = ContractsSchema.parse(data);
    console.log("contracts.toml is valid!");
    // console.log(JSON.stringify(validatedData, null, 2));
} catch (error) {
    if (error instanceof z.ZodError) {
        console.error("Validation failed:", error.errors);
    } else {
        console.error("Error reading or parsing contracts.toml:", error);
    }
}
*/ 
