# Tasks

## 1. Apply completion behavior

- [x] 1.1 Update the shared Apply instruction core and its skill/command regression assertions so Apply saves the archive task as checked before archiving, restores it only if archiving fails and the change remains active, and verifies the archived checkbox before commit; verify the focused completion test covers both surfaces and preserves lifecycle order
- [x] 1.2 Run `pnpm exec vitest run test/core/templates/propose-apply-automation.test.ts` and verify the updated completion tests pass

## 2. Generated skill and cross-platform verification

- [x] 2.1 Run `pnpm run generate:skills` and `pnpm run regen:parity-hashes`; verify the checked-in Apply skill and its parity hash reflect the updated shared instructions
- [x] 2.2 Run `pnpm exec vitest run test/core/templates/skill-templates-parity.test.ts` and verify generated skill parity passes
- [x] 2.3 Verify the focused Apply completion and parity tests pass on Windows, including assertions for the active-to-archived task-file instructions

## 3. Apply completion

- [x] 3.1 Sync delta specs into main specs and verify the intended requirements are present
- [x] 3.2 Capture durable project knowledge to the wiki and verify relevant pages and indexes, or report that nothing new needed capture
- [x] 3.3 Archive the change after sync and wiki capture, then verify its archive path and checked archive-task status
- [x] 3.4 Commit the completed work and verify the resulting commit hash
