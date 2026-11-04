# Proposal

## Why

Bulk Apply currently reconciles each later change only after earlier changes have been implemented. That can uncover incompatible plans, duplicated work, or opportunities to consolidate proposals after implementation has already begun. A batch-wide preflight can prepare the selected changes together and avoid unnecessary or conflicting work.

## What Changes

- Analyze the complete selected batch before implementation, comparing each change's proposal, requirements, design, and tasks with the other selected changes and relevant current code and tests.
- Identify implementation dependencies, incompatible plans, overlapping or duplicated work, and opportunities to merge related proposals.
- Automatically refactor selected change plans as needed to prepare a coherent batch, including consolidating changes into one surviving change when appropriate. Preserve the initial idea and intent of every proposal in the resulting plan.
- Pause for user guidance only when a necessary refactor would change a proposal's initial idea or intent. Continue to use the existing per-change Apply lifecycle and operational safeguards after preflight.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `opsx-bulk-apply-skill`: Add batch-wide analysis and intent-preserving automatic reconciliation before implementation.

## Impact

- `src/core/templates/workflows/bulk-apply-change.ts` will define the shared instructions for generated Bulk Apply surfaces.
- The `opsx-bulk-apply-skill` specification and bulk-apply template tests will cover preflight analysis, automatic plan reconciliation, and the intent-preservation boundary.
- Generated skill output and its parity checks will need to remain synchronized with the shared template.
