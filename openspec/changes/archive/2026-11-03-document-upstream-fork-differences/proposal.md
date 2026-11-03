# Proposal

## Why

This checkout is a personal fork of Fission-AI/OpenSpec, but its README currently reads as a general introduction to the upstream project. A concise fork-specific README will make the relationship and the meaningful differences clear while directing users to the upstream repository for canonical project information.

## What Changes

- Replace duplicated upstream-facing README content with a brief description of this fork and its purpose.
- Document only user-relevant differences from Fission-AI/OpenSpec, based on the fork's actual divergence at implementation time.
- Link to the upstream repository and its documentation for general OpenSpec information.
- Update another documentation surface only if it duplicates the same upstream material and is necessary to keep the repository's entry points consistent.
- Treat committed fork changes as the comparison baseline; exclude local uncommitted work.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None. This is a documentation-only change with no product behavior requirements; the change opts out of delta specs.

## Impact

- Repository root `README.md`; possibly another directly relevant repository entry-point document if inspection confirms duplicated upstream-facing content.
- No code, API, dependency, or runtime behavior changes.
- The upstream reference is `https://github.com/Fission-AI/OpenSpec`.
