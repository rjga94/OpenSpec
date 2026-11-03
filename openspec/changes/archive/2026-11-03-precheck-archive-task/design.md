# Design

## Context

See proposal.md for motivation and specs/opsx-apply-skill/spec.md for the behavior contract. The Apply template currently instructs the agent to mark the archive task in the moved task file, after the archive command has relocated it.

## Goals / Non-Goals

**Goals:**
- Keep the archive task's checked state in the task file that moves into the archive.
- Avoid leaving an active change falsely marked complete if archiving fails before moving it.

**Non-Goals:**
- Change the order of sync, wiki capture, archive, and commit.
- Change archive command behavior, commit task handling, or legacy automatic closeout.

## Decisions

- Update the shared Apply instruction core so both the skill and command surfaces describe the same pre-archive checkbox update, save, and post-archive verification.
- Before archiving, check and save only the archive task in the active task file. If the operation reports failure, inspect whether the change is still active: restore and verify the unchecked state only when it remains active; if it has moved, inspect the archived task file and preserve the checked state rather than undoing a completed move.
- Keep commit-checkbox handling in the existing commit step. It remains unchecked until preparing the commit, and the archived task file is still the file staged for that commit.
- Add assertions to the existing shared-surface completion tests, regenerate the checked-in Apply skill, and refresh its parity hash.

## Risks / Trade-offs

- A failed write or rollback could leave the task state uncertain. Verify each save and report the operation and current task-file state explicitly rather than claiming success.
- A partial archive may move the change despite returning an error. Inspect the active and archive locations before deciding whether to restore the checkbox.

## Migration Plan

No data migration is needed. Regenerate the checked-in skill output from the template and run focused completion and parity tests.
