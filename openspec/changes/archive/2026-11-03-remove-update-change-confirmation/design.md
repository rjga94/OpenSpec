# Design

## Context

See proposal.md for motivation and specs/opsx-update-skill/spec.md for the behavior contract. The skill and command surfaces share instructions from `src/core/templates/workflows/update-change.ts`. The current template makes confirmation a universal gate, including for coherence edits and companion files under populated glob artifacts.

## Goals / Non-Goals

**Goals:**
- Treat an explicit update-workflow invocation as authorization for requested and necessary in-scope planning-artifact edits.
- Preserve per-edit confirmation when the update workflow is selected implicitly.
- Retain clarification, path-safety, no-overwrite, planning-only, and no-build-frontier protections.

**Non-Goals:**
- Change how changes or artifacts are selected, read, reconciled, or reported.
- Authorize edits to implementation code, main specs during the update workflow, or artifacts outside the selected change.

## Decisions

- Express explicit versus implicit invocation in the shared instruction template so both delivery surfaces use the same policy. An explicit command or direct skill invocation authorizes in-scope requested edits and coherence corrections; assistant-selected use continues to require confirmation.
- Keep step 4 read-and-reconcile only. Step 5 remains the sole write phase, applying revisions directly for explicit invocation and presenting them for confirmation for implicit invocation. Ask for clarification when material details are unresolved or the requested work changes the change's intent.
- Apply the explicit authorization to companion-file creation only for a partially populated glob artifact and only after refreshing status and instructions, validating a concrete path inside `changeRoot`, and ensuring creation fails if the destination appeared. Implicit use retains confirmation.
- Update the capability's existing confirmation-related requirements and its main-spec Purpose. Purpose is not part of a delta merge, so implementation must update it directly while spec sync merges the delta requirements.
- Extend the shared-surface tests to cover explicit and implicit paths, including companion creation, while retaining the existing scope and no-code guardrails.

## Risks / Trade-offs

- Invocation mode is expressed as agent-facing guidance rather than a CLI-enforced state. Keep the explicit and implicit branches prominent and test both skill and command renderings so they cannot silently drift.
- Removing the prompt can expose an incorrect interpretation of a request. Preserve clarification for material ambiguity and intent changes instead of treating explicit invocation as permission to guess or broaden scope.

## Migration Plan

No data migration is needed. Update the shared template and specification, regenerate the skill output and parity hashes, then run focused template and parity tests.
