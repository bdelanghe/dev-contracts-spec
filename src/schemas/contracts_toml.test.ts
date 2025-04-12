// import { Deno } from "deno"; // Removed unused import
import {
  // assert, // Removed unused import
  assertEquals,
  assertThrows,
} from "jsr:@std/assert";
import { z } from "zod";
import { ContractEntrySchema, ContractSchema } from "./contracts_toml.ts";

Deno.test("ContractSchema: Validates a minimal correct structure", () => {
  const validData = {
    contracts: {
      "my-service": {
        ref: "./service-contract.ts",
      },
      "another-contract": {
        ref: "https://example.com/contract.json",
      },
    },
  };

  const parsed = ContractSchema.parse(validData);
  assertEquals(parsed, validData); // Check if parsing returns the same structure
});

Deno.test("ContractSchema: Throws on invalid structure (missing ref)", () => {
  const invalidData = {
    contracts: {
      "bad-service": {
        // ref is missing
      },
    },
  };

  assertThrows(
    () => ContractSchema.parse(invalidData),
    z.ZodError,
    "Required", // Expecting ZodError with message indicating 'ref' is required
  );
});

Deno.test("ContractSchema: Throws on invalid structure (extra property due to strict)", () => {
  const invalidData = {
    contracts: {
      "my-service": {
        ref: "./service-contract.ts",
        extraField: "should not be here", // Violates ContractEntrySchema.strict()
      },
    },
  };

  assertThrows(
    () => ContractSchema.parse(invalidData),
    z.ZodError,
    "Unrecognized key(s) in object: 'extraField'", // Expecting ZodError about unrecognized keys
  );
});

Deno.test("ContractSchema: Throws on invalid structure (extra top-level property due to strict)", () => {
  const invalidData = {
    contracts: {
      "my-service": {
        ref: "./service-contract.ts",
      },
    },
    otherStuff: "not allowed", // Violates ContractSchema.strict()
  };

  assertThrows(
    () => ContractSchema.parse(invalidData),
    z.ZodError,
    "Unrecognized key(s) in object: 'otherStuff'",
  );
});

Deno.test("ContractEntrySchema: Validates a correct structure", () => {
  const validData = { ref: "./path/to/contract.json" };
  const parsed = ContractEntrySchema.parse(validData);
  assertEquals(parsed, validData);
});

Deno.test("ContractEntrySchema: Throws on missing ref", () => {
  const invalidData = {}; // ref is missing
  assertThrows(
    () => ContractEntrySchema.parse(invalidData),
    z.ZodError,
    "Required",
  );
});

Deno.test("ContractEntrySchema: Throws on non-string ref", () => {
  const invalidData = { ref: 123 }; // ref is not a string
  assertThrows(
    () => ContractEntrySchema.parse(invalidData),
    z.ZodError,
    "Expected string, received number",
  );
});

Deno.test("ContractEntrySchema: Throws on extra property due to strict", () => {
  const invalidData = {
    ref: "./path/to/contract.json",
    extra: "not allowed",
  };
  assertThrows(
    () => ContractEntrySchema.parse(invalidData),
    z.ZodError,
    "Unrecognized key(s) in object: 'extra'",
  );
});
