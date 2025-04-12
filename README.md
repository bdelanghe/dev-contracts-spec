# DevContracts Spec

This project defines and validates the Zod schemas used throughout the
`DevContracts` framework.

## Overview

`dev-contracts-spec` is a core component of the larger `DevContracts` project.
Its primary responsibility _at this stage_ is to provide the canonical Zod type
definitions that represent the structure and constraints of the `contracts.toml`
specification, drawing inspiration from well-established configuration schemas
like ESLint's `.eslintrc`.

Think of this repository as the declarative schema specification for the core
`DevContracts` configuration. It ensures that the types used by other tools
within the framework are consistent, correct, and valid according to Zod's
rules. While future iterations may expand the scope, the current focus is solely
on these foundational Zod types.

## Purpose

The primary goals of this project _currently_ are to:

1. **Define:** Provide clear, reusable Zod schemas for the `contracts.toml` data
   structure and related artifacts.
2. **Validate:** Ensure that these Zod schemas themselves are valid, correctly
   defined, and pass Deno's type checking (`deno check`).

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

## Debugging

Deno utilizes the V8 Inspector Protocol, allowing debugging with tools like
Chrome DevTools, Edge DevTools, and IDEs (VSCode, JetBrains).

To enable debugging, use one of the following flags when running a Deno script:

- **`--inspect`**: Starts the Deno process with the debugger server active. The
  script begins execution immediately. You can connect a debugger client (like
  Chrome DevTools via `chrome://inspect`) at any time. Best for long-running
  processes.
  ```bash
  deno run --inspect your_script.ts
  ```
- **`--inspect-wait`**: Similar to `--inspect`, but Deno waits for the debugger
  client to connect _before_ executing any script code. Useful for debugging
  startup logic or short scripts where you need to connect before execution
  finishes.
  ```bash
  deno run --inspect-wait your_script.ts
  ```
- **`--inspect-brk`**: Waits for the debugger client to connect and then pauses
  execution on the very first line of code. This is often the most useful flag
  as it allows you to set breakpoints before any application code runs. IDEs
  often use this by default.
  ```bash
  deno run --inspect-brk your_script.ts
  ```

**Connecting with Chrome DevTools:**

1. Run your script with one of the `--inspect` flags (e.g.,
   `deno run --inspect-brk main.ts`).
2. Open Chrome or Edge and navigate to `chrome://inspect`.
3. Your Deno process should appear under "Remote Target". Click "inspect".
4. The DevTools will open, allowing you to set breakpoints, step through code,
   inspect variables, etc.

**IDE Integration:**

- **VSCode:** Use the official `vscode_deno` extension for seamless debugging
  integration.
- **JetBrains IDEs (WebStorm, IntelliJ, etc.):** Use the Deno plugin. You can
  typically right-click a file and select "Debug 'Deno: <filename>'".

**Additional Debugging Flags:**

- `--log-level=debug`: Provides verbose logging from Deno itself, useful for
  diagnosing connection issues or understanding internal behavior.
- `--strace-ops`: Prints a trace of the internal operations (Ops) between the
  JavaScript runtime and Deno's Rust core. Useful for performance profiling or
  debugging hangs.

## Testing

Deno includes a built-in test runner that works seamlessly with TypeScript and
JavaScript. Tests ensure code reliability and functionality without requiring
external dependencies. See the
[Deno Testing Documentation](https://docs.deno.com/runtime/fundamentals/testing/)
for full details.

**Writing Tests:**

Tests are defined using the `Deno.test()` function. You can define synchronous,
asynchronous, and tests requiring specific permissions.

```typescript
// my_module.test.ts
import { assertEquals } from "jsr:@std/assert";
import { expect } from "jsr:@std/expect"; // Optional: for expect-style assertions
import { add } from "./my_module.ts"; // Assuming you have a function to test

// Basic test
Deno.test("add function adds two numbers correctly", () => {
  const result = add(2, 3);
  assertEquals(result, 5); // Using std/assert
  expect(result).toBe(5); // Using std/expect
});

// Async test
Deno.test("async operation test", async () => {
  await someAsyncOperation();
  // add assertions
});

// Test requiring permissions (must be granted at runtime)
Deno.test({
  name: "read file test",
  permissions: { read: ["./data.txt"] }, // Specify required permissions
  fn: () => {
    const data = Deno.readTextFileSync("./data.txt");
    assertEquals(data, "expected content");
  },
});
```

**Running Tests:**

Use the `deno test` command:

```bash
# Run all tests matching {*_,*.,}test.{ts, tsx, mts, js, mjs, jsx} recursively
deno test

# Run tests in a specific directory
deno test src/schemas/

# Run a specific test file
deno test src/schemas/contract.test.ts

# Run tests requiring permissions
deno test --allow-read=./data.txt

# Filter tests by name (string or /regex/)
deno test --filter "add function"

# Get code coverage report
deno test --coverage=./cov_profile
deno coverage ./cov_profile --lcov --output=./cov_profile/lcov.info
```

**Testing Future Behavior:**

To define tests for features not yet implemented (Test-Driven Development
approach):

1. Write the test case for the desired future behavior.
2. Run `deno test`. The test will fail, confirming the feature is missing.
3. Implement the feature.
4. Re-run `deno test` until the test passes.

If implementation is deferred, you can temporarily skip the test using
`Deno.test.ignore` to keep the test suite green while documenting the intent:

```typescript
Deno.test.ignore("future feature test #123", () => {
  // TODO: Implement feature XYZ
  // Assertions for the expected behavior go here
  throw new Error("Test not implemented yet");
});
```

Remember to remove `.ignore` once the feature is implemented.

**Other Features:**

- **Test Steps:** Break down complex tests using `t.step()` within a `Deno.test`
  function.
- **Focusing Tests:** Use `Deno.test.only` to run specific tests during
  development (remember to remove it afterward, as it causes the overall suite
  to fail).
- **Sanitizers:** Deno includes built-in checks for resource leaks, unhandled
  async operations, and unwanted `Deno.exit()` calls (enabled by default).

## Linting and Formatting

This project utilizes Deno's integrated tools to maintain code style consistency
and catch potential issues:

- **`deno fmt`**: An opinionated code formatter for TypeScript/JavaScript,
  Markdown, and JSON. It automatically standardizes code style.
- **`deno lint`**: A static analysis tool that identifies potential errors,
  stylistic problems, and anti-patterns based on configurable rules.

**Usage:**

The primary way to use these tools is through the Deno tasks defined in
`deno.jsonc`:

```bash
# Check if all relevant files are formatted correctly
deno task fmt --check

# Automatically format all relevant files
deno task fmt

# Run the linter to detect issues
deno task lint
```

Running `deno task fmt` and `deno task lint` regularly helps ensure code quality
and consistency throughout the project.

**Configuration:**

Both tools can be configured via the `deno.jsonc` file. This allows for
customization of formatting options (e.g., line width) and lint rules (e.g.,
enabling/disabling specific checks).

```jsonc
// Example snippet from deno.jsonc
{
  "fmt": {
    "options": {
      "lineWidth": 80,
      "indentWidth": 2,
      "singleQuote": false
    }
    // Include/exclude specific files if needed
  },
  "lint": {
    "rules": {
      "tags": ["recommended"],
      "exclude": ["no-explicit-any"] // Example: customize rules
    }
    // Include/exclude specific files if needed
  }
  // ... other configurations
}
```

For more details, refer to the official
[Deno Linting and Formatting Documentation](https://docs.deno.com/runtime/fundamentals/linting_and_formatting/).

## JSON Schema Generation

This project includes the capability to generate a JSON Schema definition
directly from the primary `ContractSchema` Zod object. This is useful for
integration with other tools, documentation, or validation outside of
TypeScript/JavaScript environments.

To generate the JSON Schema:

1. Run the generation script:
   ```bash
   deno task generate-schema
   ```
2. The script will generate/update the `contract-schema.json` file in the
   project root.

**Generated Schema Files:**

- See the [`contract-schema.json`](./contract-schema.json) file for the main
  contract configuration schema.
- See the [`lockfile-schema.json`](./lockfile-schema.json) file for the lockfile
  schema.
