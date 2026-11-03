# Tasks

## 1. Update authorization and regression coverage

- [x] 1.1 Update the shared update template so explicit invocations authorize requested and in-scope coherence edits without per-artifact confirmation, while implicitly selected use still confirms; keep step 4 read-only and preserve the planning-only, intent, path, and no-overwrite safeguards
- [x] 1.2 Update `test/core/templates/update-change.test.ts` to cover both skill and command surfaces for explicit and implicit invocations, including coherence edits and populated-glob companion creation
- [x] 1.3 Run `pnpm exec vitest run test/core/templates/update-change.test.ts` and verify the update workflow regression tests pass

## 2. Specification and generated skill

- [x] 2.1 Update the `opsx-update-skill` main-spec Purpose to describe explicit authorization and implicit confirmation; verify the Purpose no longer claims all edits require confirmation
- [x] 2.2 Run `pnpm run build`, `pnpm run generate:skills`, and `pnpm run regen:parity-hashes` in that order; verify the generated update skill and parity hash reflect the shared template
- [x] 2.3 Run `pnpm exec vitest run test/core/templates/skill-templates-parity.test.ts` and verify generated skill parity passes
- [x] 2.4 Verify the focused update workflow tests pass on Windows, including cross-platform artifact-path handling (user-approved local Windows validation in place of CI)

## 3. Apply completion

- [x] 3.1 Sync delta specs into main specs and verify the intended requirements are present
- [x] 3.2 Capture durable project knowledge to the wiki and verify relevant pages and indexes, or report that nothing new needed capture
- [x] 3.3 Archive the change after sync and wiki capture, then verify its archive path
- [x] 3.4 Commit the completed work and verify the resulting commit hash
