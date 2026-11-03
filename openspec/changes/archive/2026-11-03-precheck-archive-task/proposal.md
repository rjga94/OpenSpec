# Proposal

## Why

The Apply workflow currently archives a change before marking its archive task complete. Because archive moves the task list, the open file at its former path can still show the archive and commit tasks as incomplete. Recording archive completion before the move keeps the status visible in the task list that is carried into the archive.

## What Changes

- Update the tracked Apply completion flow to save the archive task as checked immediately before invoking archive.
- If archive fails and the change remains active, restore the checkbox to incomplete and stop; after success, verify the archived task list retains the checked status.
- Preserve the existing sync, capture, archive, and commit order, including current commit handling.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `opsx-apply-skill`: Record and preserve archive-task completion across the archive move.

## Impact

- `src/core/templates/workflows/apply-change.ts` and generated Apply-skill output.
- Apply completion template tests and `openspec/specs/opsx-apply-skill/spec.md`.
- No CLI behavior or application dependencies.
