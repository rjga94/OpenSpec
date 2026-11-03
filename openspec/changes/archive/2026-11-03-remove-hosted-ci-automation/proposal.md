# Proposal

## Why

The repository currently relies on GitHub-hosted workflows and Dependabot automation for validation, security checks, releases, binary builds, and dependency updates. Removing those hosted processes makes the repository rely on work that contributors can run locally, while preserving the existing local development and test commands.

## What Changes

- **BREAKING** Remove all GitHub Actions workflow definitions, including CI checks, Nix validation, security audits, release preparation, and binary builds.
- Remove Dependabot configuration, the `act` configuration and workflow instructions, and the README CI badge.
- Remove the `ci-nix-validation` requirements that promise hosted CI execution or local `act` workflow support.
- Preserve ordinary local build, test, maintenance, and release commands, along with CI-aware runtime behavior and its tests.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `ci-nix-validation`: remove requirements for hosted Nix validation and local execution of GitHub workflows with `act`.

## Impact

This affects repository automation and related documentation/configuration under `.github/`, the root `.actrc`, the README badge, and the `ci-nix-validation` specification. It does not change the OpenSpec CLI, local package scripts, test suite, or Nix build/update tools.
