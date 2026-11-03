# Proposal

## Why

The `rjga94/OpenSpec` fork has diverged from `Fission-AI/OpenSpec`: the fork's `main` is behind upstream while retaining fork-only commits. A one-time merge will bring upstream changes into the fork without rewriting or discarding its history.

## What Changes

- Merge `Fission-AI/OpenSpec`'s `main` into the fork's current `main` using Git merge, preserving existing fork commits.
- Keep the result local; do not push to `origin`, add or change remotes, or switch branches.
- Recheck branch and worktree state before merging, pause on unresolved conflicts, and validate the merged project.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None. This is a one-time repository maintenance operation and does not change product behavior; `.openspec.yaml` sets `skip_specs: true`.

## Impact

- Git history and working tree for the `rjga94/OpenSpec` checkout.
- Source, tests, documentation, generated skills, and dependency files may change as part of the upstream merge.
- The merge is validated with the repository's existing test, lint, and build commands on Windows.
