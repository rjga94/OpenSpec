# Design

## Context

See [proposal.md](./proposal.md) for motivation and [specs/opsx-bulk-apply-skill/spec.md](./specs/opsx-bulk-apply-skill/spec.md) for the observable behavior contract.

The existing `/opsx:apply` instructions are shared by the generated skill and command surfaces in `src/core/templates/workflows/apply-change.ts`. Workflow availability and generated skill/command registration are maintained across the profile and skill-generation modules. The existing bulk-archive workflow provides a pattern for coordinating several changes, but its archive-specific chronological conflict resolution does not define implementation order.

## Goals / Non-Goals

**Goals:**
- Add `/opsx:bulk-apply` as a first-class generated workflow in the default core profile.
- Coordinate the scope, ordering, and per-change outcomes while preserving single-change Apply behavior.
- Keep each change's existing Apply completion lifecycle as the unit of work.

**Non-Goals:**
- Change `/opsx:apply` behavior or add an `openspec` CLI subcommand.
- Add automatic rollback of changes that completed before a later batch item blocks or fails.
- Use change age as an implementation priority.

## Decisions

### Add a separate shared workflow template

Create a dedicated bulk-apply workflow template that provides both the generated skill and command content. Register it through the existing template facade and skill/command generation paths. Keep the single-change Apply template intact so the new orchestration cannot weaken its task, context, git, or completion safeguards.

Because the user chose default availability, register `bulk-apply` in both the available workflow set and the core profile, and update the related profile/configuration, installation, generated-skill, command, and onboarding registries that enumerate workflows. Use the existing command-generation adapters so supported tools receive their normal command format.

### Plan the batch before implementation

Resolve the planning root once and derive the batch from `openspec list --json`: all active changes when no names were supplied, or exactly the named changes otherwise. Validate explicit names before starting. Gather current status and apply instructions for the batch, then inspect the selected changes' planning artifacts and relevant project context to identify prerequisite relationships.

Order prerequisites before selected changes that depend on them. For otherwise independent changes, use agent judgment grounded in scope and implementation context; do not sort by creation date. Report the resulting order and rationale. If evidence does not support a safe order, ask before making implementation edits.

### Execute one existing Apply lifecycle at a time

Process each ordered change with its current Apply instructions, refreshing state when the change is reached. Complete its task loop and Apply completion actions—including sync, capture, archive, and commit—before starting the next change. Do not treat an earlier change's Apply response or cached task state as current state for a later change.

For a default all-active batch, report and skip changes that remain blocked, then continue with applicable changes. For an explicitly named batch, stop when the ordered run reaches a blocked change. An implementation error or material ambiguity stops later work in either mode, consistent with Apply's pause behavior. Previously completed changes remain completed; the workflow reports partial progress rather than attempting rollback.

Before starting each later change, compare its existing planning artifacts with all earlier completed changes and the resulting code, including relevant tests. Automatically adapt the remaining implementation and its implementation-facing planning artifacts (for example, design and task details) as needed, while preserving the later change's original proposal scope and intended outcome, its requirements, and all earlier completed contracts. Preserve completed task progress and refresh status and Apply instructions after adapting the plan. If the required adaptation would materially change the later proposal's original scope or intended outcome, or an earlier completed change's externally observable behavior or contract, stop before modifying the plan or code, explain the divergence or impact, and ask the user how to proceed.

### Preserve root and worktree safety

Use the existing store-selection and project-root guidance. Let CLI-returned paths, context files, task locations, and state control each Apply iteration. Preserve Apply's safeguards for staged and pre-existing work, and commit only files attributable to the current change.

## Risks / Trade-offs

- [Dependency inference is uncertain] -> Ground ordering in change artifacts and project evidence, explain the order, and ask when ambiguity could materially change implementation.
- [A later item blocks or fails after earlier items completed] -> Stop at the problem, report completed and skipped items, and leave the earlier committed changes intact.
- [Adapting a later change could drift from its original proposal] -> Compare the adaptation with the proposal's scope and intended outcome, and ask before any material deviation.
- [Adding the workflow to core increases the default command set] -> Keep it as a separate command so users continue to invoke single-change Apply explicitly when they want that behavior.

## Migration Plan

No persisted data migration is required. Add the workflow to the existing registries and generation tests, then regenerate the committed skill/command outputs using the repository's existing generation process. Existing installations can receive the new core workflow through the normal `openspec update` flow.
