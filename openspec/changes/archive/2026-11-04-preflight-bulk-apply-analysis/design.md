# Design

## Context

See `proposal.md` for the motivation and `specs/opsx-bulk-apply-skill/spec.md` for the behavior contract. Bulk Apply instructions are authored in `src/core/templates/workflows/bulk-apply-change.ts`; that shared template generates both the skill and command surfaces. The committed skill output is checked against the template by parity tests.

Today, the template orders selected changes before implementation but only reconciles a later change after earlier changes have completed. Preflight reconciliation can edit OpenSpec artifacts, so Git readiness must be checked before those edits as well as before implementation.

## Goals / Non-Goals

**Goals:**

- Reconcile the complete selected batch before implementation and keep its existing dependency-informed ordering and Apply safeguards.
- Automatically remove duplicated work and reshape proposal artifacts while preserving every selected proposal's initial intent.
- Use a new survivor when the full set of work forms one coherent proposal; otherwise reorganize work among existing proposals and keep the distinct outcomes.
- Run each resulting proposal through the regular Apply lifecycle.

**Non-Goals:**

- Change single-change Apply behavior or add a new CLI command.
- Refactor unselected changes.
- Preserve absorbed proposal directories after their complete scope has been incorporated into a survivor.
- Resolve a plan by silently dropping a requirement or changing a proposal's initial intent.

## Decisions

### Analyze first, then make a coherent plan

After resolving the batch, inspect each selected change's available scope-defining and implementation-planning artifacts, task state, and relevant current code and tests. Compare the changes as a set to identify dependencies, incompatible assumptions, duplicate work, and work that belongs together. Use those findings to select an implementation order and determine the smallest coherent set of resulting changes; do not use creation dates or task counts to choose that structure.

Build the complete reconciliation plan before editing any artifact. If that plan would alter or omit any selected proposal's initial idea or intent, stop before applying the refactor and explain the affected intent. Otherwise, make the planned changes automatically without asking for approval.

### Choose the resulting change structure from the work

- When the selected proposals form one coherent outcome, create a new change through the OpenSpec CLI. Give it a complete proposal, delta specs, design, and task list that preserve the combined intent; delete the fully absorbed source change directories as part of the merge so they are not selected in later all-active batches. Treat the new change as the sole batch entry and apply it normally.
- When only some work overlaps, move or consolidate the relevant requirements and tasks into the proposal that best owns that work. Update affected proposals, specs, designs, and task lists, preserve completed task status, and retain separate changes for distinct outcomes.
- Keep any resulting proposal that is selected for Apply complete under its active schema. Do not hand-create change scaffolding or assume artifact paths; use CLI-reported paths and refresh status and Apply instructions after refactoring.

This keeps a merge from being synonymous with creating a new change: the plan may instead be a task or requirement moving between existing proposals.

### Keep safety checks ahead of refactoring

The workflow's Git readiness check must happen before any automatic proposal edits, removals, or implementation. The intent-preservation check is a precondition to applying the prepared refactor, so a failed check leaves the selected planning artifacts unchanged. Existing blocked-change handling and other Apply operational safeguards remain in effect.

### Preserve the regular Apply lifecycle

The resulting ordered changes use the existing single-change Apply procedure, including its task progression, verification, spec sync, wiki capture, archive, and commit behavior. For a newly merged survivor, its own tasks track that normal lifecycle; absorbed changes are not independently applied.

## Risks / Trade-offs

- **A merge could lose a proposal's original outcome** → Prepare the full reconciliation before editing, carry every original intent into the result, and pause if any intent would have to change or disappear.
- **Refactoring can leave stale paths or task references** → Use current status and instruction output for artifact paths, then refresh both after edits and verify the resulting task lists before Apply.
- **Removing absorbed changes can obscure their prior shape in the working tree** → Keep the survivor's proposal and planning artifacts complete; the Git commit records the consolidation as part of the survivor's normal lifecycle.
- **Different schemas may organize requirements and tasks differently** → Use each selected change's returned schema and artifact paths rather than assuming spec-driven filenames.
