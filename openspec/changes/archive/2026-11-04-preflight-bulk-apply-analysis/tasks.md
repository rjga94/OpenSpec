# Tasks

## 1. Preflight and reconcile selected changes

- [x] 1.1 Update `src/core/templates/workflows/bulk-apply-change.ts` so batch selection is followed by a pre-implementation comparison of all selected changes' available planning artifacts and relevant current code and tests; verify the focused template test confirms preflight precedes implementation.
- [x] 1.2 Add automatic, schema-aware plan reorganization for moving work between existing changes or creating a complete new survivor and deleting fully absorbed change directories; preserve each proposal's intent and completed task progress, and verify focused template tests cover both paths.
- [x] 1.3 Define and test the intent-preservation boundary so the workflow pauses before refactoring only when the necessary change would alter or omit a proposal's initial idea or intent; verify existing blocked-change, ordering, and per-change Apply safeguards remain present.
- [x] 1.4 Update `test/core/templates/bulk-apply-change.test.ts` to cover batch-wide analysis, automatic reorganization and consolidation, the intent-change pause, and parity between skill and command instructions; verify `pnpm test -- test/core/templates/bulk-apply-change.test.ts` passes.

## 2. Generated skill and validation

- [x] 2.1 Regenerate `skills/openspec-bulk-apply-change/SKILL.md` with `pnpm generate:skills` and verify `pnpm test -- test/core/templates/skill-templates-parity.test.ts` passes.
- [x] 2.2 Run `pnpm test -- test/core/templates/bulk-apply-change.test.ts test/core/templates/skill-templates-parity.test.ts` and `openspec validate preflight-bulk-apply-analysis`; verify both commands pass.

## 3. Apply completion

- [x] 3.1 Sync the delta spec into the main spec and verify the preflight requirement and scenarios are present.
- [x] 3.2 Capture durable project knowledge to the wiki and verify relevant pages and indexes, or report that nothing new needed capture.
- [x] 3.3 Archive the change after sync and wiki capture, then verify its archive path.
- [x] 3.4 Commit the completed work and verify the resulting commit hash.
