# DevContracts Spec

This project defines and validates the Zod schemas used throughout the `DevContracts` framework.

## Overview

`dev-contracts-spec` is a core component of the larger `DevContracts` project. Its sole responsibility is to provide the canonical Zod type definitions that represent the structure and constraints of the `contracts.toml` specification and related artifacts used within the DevContracts ecosystem.

Think of this repository as the declarative schema specification for the `DevContracts` system. It ensures that the types used by other tools within the framework are consistent, correct, and valid according to Zod's rules.

## Purpose

The primary goals of this project are to:

1.  **Define:** Provide clear, reusable Zod schemas for all data structures managed or processed by `DevContracts`.
2.  **Validate:** Ensure that these Zod schemas themselves are valid and correctly defined.

This project **does not** contain runtime logic for interacting with specific `contracts.toml` files or validating actual project states against a contract. That functionality resides in other tools within the `DevContracts` ecosystem. This project focuses strictly on the **type definitions** themselves.

## Usage

The Zod schemas defined here are intended to be imported and utilized by other tools within the `DevContracts` framework (e.g., validation scripts, code generators, schema bridge tools) to ensure type safety and consistency when processing contract-related data.
