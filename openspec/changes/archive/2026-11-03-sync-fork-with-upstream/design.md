# Design

## Context

See proposal.md for the motivation. The checkout uses `origin` for `rjga94/OpenSpec`, has no configured upstream remote, and is currently on `main`. At planning time, the fork's remote `main` is 19 commits behind upstream and contains 10 fork-only commits; the local `main` is pushed to `origin/main`. Recheck all refs and local state when applying because they can change.

The package provides `pnpm test`, `pnpm lint`, and `pnpm build`. This maintenance change does not alter a product behavior contract, so its metadata sets `skip_specs: true`.

## Goals / Non-Goals

**Goals:**
- Integrate upstream `main` while retaining the fork's existing commit history.
- Keep the operation local and preserve the current branch and remote configuration.
- Validate the merged checkout using the repository's existing commands on Windows.

**Non-Goals:**
- Rebase, reset, force-push, or otherwise rewrite existing commits.
- Add or change Git remotes, create or switch branches, or push the merge to `origin`.
- Resolve ambiguous merge conflicts by choosing one side without review.

## Decisions

### Fetch upstream directly, then merge

Fetch `main` from `https://github.com/Fission-AI/OpenSpec.git` by URL and merge the fetched `FETCH_HEAD` into the current fork `main`. This avoids persisting an `upstream` remote and makes the chosen source explicit. Use Git merge rather than rebase so both upstream and fork-specific history remain reachable. Allow a fast-forward only if the refs have changed into that relationship by apply time.

Before fetching or merging, verify the current branch, compare local `HEAD` with the freshly fetched `origin/main`, and confirm the only worktree changes are the active OpenSpec planning artifacts. If another local change or unexpected branch movement exists, stop and ask rather than absorbing it into the merge.

### Pause on unresolved conflicts

Resolve conflicts only where the intended result is clear from the surrounding source and history. If a conflict affects behavior and cannot be resolved confidently, leave the merge uncommitted, report the files and context, and ask for guidance. Do not select `ours` or `theirs` globally.

### Validate locally without publishing

Run the full test suite, lint, and build on the Windows host after the merge. Verify that the result retains the local pre-merge commit and includes the fetched upstream commit, and leave the merge local. Do not push or trigger a remote CI run.

## Risks / Trade-offs

- **Upstream changes may conflict with fork-only work** -> Inspect both sides and pause for user input when intent is ambiguous.
- **The upstream branch may move after proposal creation** -> Re-fetch and inspect the current commit at apply time; treat the planning-time divergence count as informational.
- **Windows validation cannot prove every platform-specific behavior** -> Run the full repository suite locally and report the absence of a remote CI run because the merge is intentionally not pushed.

## Migration Plan

1. Recheck branch, remotes, local commit, and worktree before modifying Git history.
2. Fetch upstream `main` directly from its HTTPS URL and record the fetched commit.
3. Merge the fetched commit into the current fork `main`; pause if conflicts need a decision.
4. Run `pnpm test`, `pnpm lint`, and `pnpm build` on Windows.
5. Verify the merge and leave it local without pushing. If validation fails after a merge commit exists, stop and report rather than rewriting history automatically.
