import { describe, it, expect } from "@std/assert";
import { ContractsSchema } from "./contracts-spec.ts";
import { z } from "zod";

describe("ContractsSchema", () => {
  it("should validate a minimal valid contracts object", () => {
    const minimalContract = {
      structure: {
        "README.md": {
          type: "file",
          purpose: "Project documentation",
        },
        "src/": {
          type: "directory",
        },
      },
    };

    expect(() => ContractsSchema.parse(minimalContract)).not.toThrow();
  });

  it("should validate a more complex contracts object", () => {
    const complexContract = {
      schema: "./path/to/meta-schema.json",
      schemas: {
        "my-schema": "https://example.com/schema.json",
      },
      quality: {
        lint: {
          eslint: {
            version: "8.0.0",
            config: ".eslintrc.json", // Example of catchall
          },
        },
      },
      rules: {
        structure: {
          allow_empty_directory: true,
          validate_schema: false,
        },
      },
      structure: {
        "README.md": {
          type: "file",
          purpose: "Docs",
          ignores: ["git"],
        },
        "src/index.ts": {
          type: "file",
          schema_ref: "my-schema",
          depends_on: ["package.json"],
        },
        "node_modules/": {
          type: "directory",
          ignores: ["git", "contract"],
        },
      },
      custom_section: { // Example of root catchall
        foo: "bar",
      }
    };

    expect(() => ContractsSchema.parse(complexContract)).not.toThrow();
  });

  it("should invalidate an object with incorrect structure type", () => {
    const invalidContract = {
      structure: {
        "file.txt": {
          type: "invalid-type", // Incorrect type
        },
      },
    };
    expect(() => ContractsSchema.parse(invalidContract)).toThrow(z.ZodError);
  });

  it("should invalidate an object missing the structure section", () => {
    const invalidContract = {
      schemas: {},
      // structure section is missing
    };
    expect(() => ContractsSchema.parse(invalidContract)).toThrow(z.ZodError);
  });

    it("should invalidate an object with incorrect schema URL", () => {
    const invalidContract = {
      schemas: {
        "bad-schema": "not-a-valid-url-or-path",
      },
      structure: {
        "file.txt": { type: "file" },
      },
    };
    // Using .safeParse to inspect the error without throwing
    const result = ContractsSchema.safeParse(invalidContract);
    expect(result.success).toBe(false);
    if (!result.success) {
        // Check if the error path points to the schemas section
        expect(result.error.errors[0].path).toEqual(["schemas", "bad-schema"]);
    }
  });

}); 
