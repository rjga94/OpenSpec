# Proposal

## Why

The update workflow currently asks for confirmation before every planning-artifact edit, even when the user explicitly invokes the update command or skill. Treating that invocation as authorization for in-scope edits avoids a redundant approval step while preserving clarification when scope or intent is unclear.

## What Changes

- Treat an explicit `/opsx:update` or update-change skill invocation as authorization to apply the requested revision and necessary coherence edits to existing planning artifacts without per-artifact confirmation.
- Apply the same rule to an in-scope companion file created under a partially populated glob artifact, while retaining the existing fresh status, instruction, containment, and no-overwrite checks.
- Keep confirmation for update workflows selected implicitly, and retain clarification, intent-change, planning-only, and build-frontier safeguards.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `opsx-update-skill`: Make edit authorization depend on whether the update workflow was explicitly invoked.

## Impact

- `src/core/templates/workflows/update-change.ts`, its skill and command surfaces, and related template tests.
- The `opsx-update-skill` specification, including its purpose and confirmation-related requirements.
- Generated update-skill output and template parity hashes.
