# Tasks

## 1. Implement the shared bulk-apply workflow

- [x] 1.1 Add the shared `/opsx:bulk-apply` skill and command template for resolving batch scope, choosing dependency-informed order, reporting progress, and applying changes sequentially; before each later change, compare its plan with prior completed changes and current code, automatically adapt its implementation-facing plan and implementation only while preserving its original proposal intent, requirements, and prior contracts, preserve completed task progress, and refresh Apply instructions. Stop before edits if adaptation would materially change the proposal's scope or intended outcome or an earlier contract.
- [x] 1.2 Add focused workflow-template tests for all-active and named batches, dependency ordering, blocked-change behavior, stopping after an implementation error, automatic compatible plan adaptation with refreshed instructions, and separate stop cases for prior-contract breaks and material proposal-intent drift; verify with `pnpm test -- test/core/templates/bulk-apply-change.test.ts`.

## 2. Register and publish the workflow

- [x] 2.1 Register `bulk-apply` in the core and available workflow profiles, skill and command generation, configuration, initialization, tool detection, cleanup, and onboarding surfaces; verify the generated workflow is present for the default core profile with `pnpm test`.
- [x] 2.2 Update the relevant user-facing workflow documentation and regenerate committed skill and command outputs; verify `pnpm generate:skills` and `pnpm run regen:parity-hashes` succeed and the generated `/opsx:bulk-apply` command is present.

## 3. Verify cross-platform integration

- [x] 3.1 Add cross-platform coverage for generated command paths using `path.join()` and verify the relevant Windows CI job passes.
- [x] 3.2 Run `pnpm test`, `pnpm run lint`, and `pnpm run build`; verify the batch workflow is generated through the supported command adapters without changing `/opsx:apply`.

## 4. Apply completion

- [x] 4.1 Sync delta specs into main specs and verify the intended requirements are present
- [x] 4.2 Capture durable project knowledge to the wiki and verify relevant pages and indexes, or report that nothing new needed capture
- [x] 4.3 Archive the change after sync and wiki capture, then verify its archive path
- [x] 4.4 Commit the completed work and verify the resulting commit hash
