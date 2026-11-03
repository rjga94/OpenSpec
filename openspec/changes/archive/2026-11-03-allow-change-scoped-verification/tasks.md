# Tasks

## 1. Update Apply verification guidance

- [x] 1.1 Update the shared Apply template to permit proportionate checks of the active change, including launching the software and using UI or other suitable methods; keep checks scoped to the change and report unavailable verification honestly. Verify both the skill and command templates expose the same guidance.
- [x] 1.2 Regenerate the committed Apply instruction outputs and refresh their existing parity data; verify the generated skill and command surfaces include the updated guidance.
- [x] 1.3 Update existing template contract/parity coverage for the allowed methods, change scope, and temporary nature of verification-only checks; run `pnpm exec vitest run test/core/templates/skill-templates-parity.test.ts test/core/templates/apply-defer-guardrail.test.ts`. Do not add permanent product tests solely for verification.

## 2. Apply completion

- [x] 2.1 Sync delta specs into main specs and verify the intended requirements are present
- [x] 2.2 Capture durable project knowledge to the wiki and verify relevant pages and indexes, or report that nothing new needed capture
- [x] 2.3 Archive the change after sync and wiki capture, then verify its archive path
- [x] 2.4 Commit the completed work and verify the resulting commit hash
