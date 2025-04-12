# `src/schemas`

This directory contains the core Zod schema definitions for the DevContracts
specification.

## Organization

Schemas are organized by the artifact they represent:

- **`common.ts`**: Contains shared, reusable schema components (like
  `RefSchema`).
- **`contracts_toml.ts`**: Defines the schema for the main `contracts.toml`
  file.
- **`lockfile.ts`**: Defines the schema for the `contracts.toml.lock` file.

Additional schemas might be added here as needed (e.g., for specific contract
types if they have complex, distinct structures).
