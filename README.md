# DevContracts Spec

This tool handles the definition, validation, and manipulation of the project **structure** as defined in the `contracts.toml` file.

It ensures that the directory and file layout of the project adheres to the standards specified in the central development contract.

## Features

- Validate existing structure against the contract.
- Generate missing directories/files defined in the contract.
- Add untracked files/directories to the contract.
- Prune non-existent entries from the contract.
- Sort contract structure definitions.

## Usage

Refer to the main project's `mise` tasks, such as:
- `mise run contracts-validate-structure`
- `mise run contracts-generate-structure`
- `mise run contracts-add-untracked`
- `mise run contracts-prune-structure`
- `mise run contracts-sort-structure`

# Test change
