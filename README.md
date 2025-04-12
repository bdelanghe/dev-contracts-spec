# DevContracts Spec

This project defines and validates the Zod schemas used throughout the
`DevContracts` framework.

## Overview

`dev-contracts-spec` is a core component of the larger `DevContracts` project.
Its sole responsibility is to provide the canonical Zod type definitions that
represent the structure and constraints of the `contracts.toml` specification
and related artifacts used within the DevContracts ecosystem.

Think of this repository as the declarative schema specification for the
`DevContracts` system. It ensures that the types used by other tools within the
framework are consistent, correct, and valid according to Zod's rules.

## Purpose

The primary goals of this project are to:

1. **Define:** Provide clear, reusable Zod schemas for all data structures
   managed or processed by `DevContracts`.
2. **Validate:** Ensure that these Zod schemas themselves are valid and
   correctly defined.

This project **does not** contain runtime logic for interacting with specific
`contracts.toml` files or validating actual project states against a contract.
That functionality resides in other tools within the `DevContracts` ecosystem.
This project focuses strictly on the **type definitions** themselves.

## Usage

The Zod schemas defined here are intended to be imported and utilized by other
tools within the `DevContracts` framework (e.g., validation scripts, code
generators, schema bridge tools) to ensure type safety and consistency when
processing contract-related data.

## Project Structure

```
.
├── .gitignore
├── deno.jsonc                 # Deno configuration (tasks, lint, fmt, check)
├── import_map.json            # Dependency management
├── README.md                  # This file
├── src/
│   ├── schemas/             # Zod schema definitions
│   │   └── README.md        # Schema organization details/questions
│   └── mod.ts               # Main module entrypoint
├── examples/                  # Example data (valid/invalid)
└── ... (test files will live alongside source files)
```

- **`deno.jsonc`**: Defines standard Deno tasks (`fmt`, `lint`, `test`,
  `check`), compiler options, and points to the `import_map.json`.
- **`import_map.json`**: Manages external dependencies (like Zod).
- **`src/schemas/`**: Contains all Zod schema definitions. See the `README.md`
  within this directory for organization details.
- **`src/mod.ts`**: Exports the public API (the schemas) of this package.
- **`examples/`**: Will contain example data structures that conform to (or
  intentionally violate) the defined schemas, useful for testing and
  documentation.
- **Tests**: Test files (e.g., `foo.test.ts`) reside next to the source files
  they are testing (e.g., `foo.ts`), following Deno conventions.

## Development Workflow

This project emphasizes a strict, iterative development process:

1. **Define/Refine Schema**: Add or modify Zod schemas in `src/schemas/`.
2. **Add Examples**: Create corresponding valid and invalid examples in
   `examples/`.
3. **Write Tests**: Create/update tests (`*.test.ts`) to validate the schema
   against the examples and cover edge cases.
4. **Run Checks**: Use Deno tasks to ensure quality:
   - `deno task fmt`: Format code.
   - `deno task lint`: Lint code for potential issues.
   - `deno task check`: Perform type checking.
   - `deno task test`: Run all tests.
5. **Fix & Iterate**: Address any issues found during checks or testing.
6. **Document**: Update TSDoc comments and relevant `README.md` files.

Always aim to leave the project in a working state after each iteration.
