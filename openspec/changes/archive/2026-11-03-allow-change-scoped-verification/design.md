# Design

## Context

The Apply skill and command are rendered from a shared instruction template, and the committed skill output is generated from that template. See proposal.md for the motivation and the delta spec for the behavior contract.

## Goals / Non-Goals

**Goals:**
- Keep verification guidance consistent across the shared Apply skill and command surfaces.
- Let agents select checks appropriate to the software and environment while keeping verification focused on the active change.

**Non-Goals:**
- Add a CLI test runner or prescribe a particular testing framework.
- Leave permanent project test files or infrastructure that exist solely for verification checks.
- Change Apply's CLI-controlled task state or completion criteria.

## Decisions

- Author the guidance in the shared Apply template rather than separate skill and command text. Both surfaces already render the same instruction core, and the existing parity checks protect that relationship.
- Describe the verification outcome and boundaries instead of prescribing tools. Projects differ, so agents can use available methods such as launching the software or interacting with its UI when they fit the change.
- Prefer existing tests. Any additional code or setup used solely for verification is temporary and removed after the check; persistent tests remain a separate project deliverable, not a side effect of verification.

## Risks / Trade-offs

- Verification depends on the available environment → report unavailable methods and never claim an unperformed check passed.
- Method flexibility could encourage broad or unrelated testing → keep checks tied to the active change's requirements and acceptance criteria.
