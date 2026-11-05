# Proposal

## Why

Screenshots and other visual references supplied while proposing a change can shape its requirements and design, but the proposal workflow currently does not make those images durable in the change. When the Apply workflow later captures project knowledge, it may have only a textual description rather than the original reference to preserve in the wiki.

## What Changes

- When a user-provided image informs a proposal created by Propose or Fast Forward, preserve a copy within the change and link it from the relevant proposal or design artifact with a useful description of what it illustrates.
- Make the proposal and capture workflows carry those change-local references through Apply capture into wiki assets, with a relevant wiki page explaining the design context and linking to each copy.
- Report when a referenced image cannot be persisted, rather than silently dropping it or creating a broken link; leave proposals without relevant images unchanged.

## Capabilities

### New Capabilities

- `opsx-propose-skill`: Preserve user-provided visual references in the change artifacts created by the proposal workflow.

### Modified Capabilities

- `opsx-capture-skill`: Discover proposal references persisted in a change and carry them into the wiki during capture.

## Impact

- Proposal and capture workflow templates and their generated skill/command surfaces.
- The `opsx-propose-skill` and `opsx-capture-skill` specifications and focused template tests.
- No CLI command behavior or application source code changes are expected.
