# Proposal

## Why

Apply guidance does not make clear whether an agent may launch the software or choose a suitable verification method while implementing a change. Explicitly permitting focused verification will improve confidence in the requested behavior while keeping ad-hoc checks separate from permanent project tests.

## What Changes

- Clarify that Apply may run focused, proportionate verification for the active change, choosing a suitable method for the software, including launching it in its environment and using UI or other relevant checks.
- Keep verification limited to the changed behavior and its acceptance criteria; do not create or retain permanent project test files or test infrastructure solely for these checks.
- Keep the generated Apply skill and command instructions consistent.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `opsx-apply-skill`: Define permission and boundaries for change-scoped verification during Apply.

## Impact

- Shared Apply instructions in `src/core/templates/workflows/apply-change.ts` and their generated skill/command outputs.
- Apply skill specification and existing template-generation/parity validation.
