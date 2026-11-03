# Design

## Context

See proposal.md for the motivation and confirmed scope. The repository has four workflow files for validation, security, releases, and binary builds; Dependabot also updates package and GitHub Actions dependencies. The Nix validation capability additionally promises local workflow execution through `act`. Local package scripts, Nix tooling, and CI-aware CLI behavior exist independently of these hosted automation definitions.

## Goals / Non-Goals

**Goals:**

- Remove the hosted automation definitions and their `act`-specific configuration and instructions.
- Keep the repository's ordinary local commands and runtime behavior available.
- Keep the specification consistent with the removal of CI and local workflow support.

**Non-Goals:**

- Introduce a replacement CI provider or another hosted automation service.
- Change local build, test, security-audit, release, or Nix maintenance commands.
- Remove runtime checks that detect CI environments.

## Decisions

- **Remove all workflow files rather than selectively retaining jobs.** The confirmed scope removes all workflow YAML and `act` support, including validation, security, release, and binary automation. Retaining `ci.yml` for `act` was considered but rejected because the user explicitly chose to remove all workflows and local workflow support.
- **Remove workflow-specific references and configuration together.** Delete the README CI badge, `.actrc`, workflow-local testing instructions, and Dependabot configuration so no repository files continue to direct contributors to removed automation.
- **Retire the existing CI capability requirements rather than replace them with a new automation contract.** The `ci-nix-validation` delta removes the guarantees for hosted Nix validation, required checks, CI setup/optimization, and `act` execution. Its local Nix commands remain available outside the spec.
- **Preserve local scripts and runtime CI detection.** Package scripts, Nix build/update tools, tests, and CLI behavior that suppresses telemetry or version checks in CI are independent of GitHub-hosted workflow execution and remain in scope as local functionality.

## Risks / Trade-offs

- [Risk] Pull requests and pushes will no longer receive automated validation or merge-blocking checks. → [Mitigation] Contributors and maintainers can run the relevant local package and Nix commands before merging; no automated replacement is included.
- [Risk] Security, dependency-update, release, and binary-build work will no longer happen on a schedule or through GitHub workflows. → [Mitigation] These activities become manual; the existing local commands and release assets tooling remain available where applicable.

## Migration Plan

Remove the workflow/configuration/documentation files and update the CI capability delta in the same change. The change is reversible by reverting the commit; there is no data migration or runtime rollout.
