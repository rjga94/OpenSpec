# Proposal

## Why

Applying several OpenSpec changes one at a time requires users to repeatedly select and start each change, and can implement dependent work in an unhelpful order. A batch workflow should coordinate that work while preserving Apply's safeguards and completion lifecycle.

## What Changes

- Add the `/opsx:bulk-apply` workflow to the default core profile; it applies all active changes by default or only explicitly named changes when names are supplied.
- Determine implementation order from proposal scope, prerequisites, and dependencies rather than change creation dates.
- Report and skip blocked changes in the default all-active batch; stop when an explicitly requested change is blocked.
- Apply selected changes sequentially using the existing Apply behavior and completion lifecycle.
- Before applying each subsequent change, compare its plan with earlier completed changes and the resulting code; automatically adapt its design, tasks, and implementation only while preserving that change's original proposal intent and requirements and all prior contracts. Pause if adaptation would materially change the proposal's scope or intended outcome, or an earlier contract.

## Capabilities

### New Capabilities
- `opsx-bulk-apply-skill`: Implement multiple OpenSpec changes in a dependency-informed sequence with clear batch scope and blocked-change handling.

### Modified Capabilities

## Impact

- Adds an agent-facing batch workflow and its generated command surfaces.
- Reuses the existing per-change Apply instructions and completion behavior.
- Adds workflow contract and template coverage for change selection, ordering, and blocked states.
