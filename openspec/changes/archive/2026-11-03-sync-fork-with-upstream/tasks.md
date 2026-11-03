# Tasks

## 1. Verify the fork state

- [x] 1.1 Confirm the current branch is `main` and the worktree contains no changes outside this proposal; fetch `origin/main` and verify local `HEAD` matches it, pausing if the branch or worktree has unexpected changes
- [x] 1.2 Fetch `main` directly from `https://github.com/Fission-AI/OpenSpec.git`, record the fetched commit, and verify the fetched history is the intended upstream before merging

## 2. Merge upstream

- [x] 2.1 Merge the fetched upstream commit into the current `main` without rebasing or switching branches; resolve only clear conflicts, pause on ambiguous ones, and verify both fork and upstream histories are reachable from `HEAD`

## 3. Validate the merge

- [x] 3.1 Run `pnpm test` on Windows and verify the full test suite passes
- [x] 3.2 Run `pnpm lint` and `pnpm build` on Windows and verify both pass
- [x] 3.3 Review the final merge state, verify the local branch is still `main`, and confirm no push or remote configuration change occurred

## 4. Apply completion

- [x] 4.1 Verify `.openspec.yaml` sets `skip_specs: true` and no delta specs exist; mark spec sync complete as a no-op
- [x] 4.2 Run the canonical wiki capture procedure and verify it either made only appropriate wiki updates or reported that nothing new needed capture
- [x] 4.3 Archive the change after sync and wiki capture, then verify its archive path
- [x] 4.4 Commit the completed work and verify the resulting commit hash; do not push to `origin`
