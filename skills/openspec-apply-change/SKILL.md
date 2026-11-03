---
name: openspec-apply-change
description: Implement tasks from an OpenSpec change. Use when the user wants to start implementing, continue implementation, or work through tasks. Also use when the user says "openspec apply", "opsx apply", or "openspec implement".
allowed-tools: Bash(openspec:*)
license: MIT
compatibility: Requires openspec CLI.
metadata:
  author: openspec
  version: "1.0"
---

Implement tasks from an OpenSpec change.

**Store selection:** If the user names a store (a store is a standalone OpenSpec repo registered on this machine) or the work lives in one, run `openspec store list --json` to discover registered store ids, then pass `--store <id>` on the commands that read or write specs and changes (`new change`, `status`, `instructions`, `list`, `show`, `validate`, `archive`, `doctor`, `context`, `schemas`, `view`). Once selected, treat `--store <id>` as sticky for the rest of the workflow. Every unscoped example of those commands below is shorthand: before running it, append the flag. For example, run `openspec status --change "<name>" --json --store "<id>"`, not the unscoped form shown below. Other commands do not take the flag. Hints printed by commands already carry the flag; keep it on follow-ups. Without a store, commands act on the nearest local `openspec/` root.

**Project check:** These steps expect a project that already uses OpenSpec. Before the first step that writes anything (`new change`, `archive`, `sync specs`, or authoring an artifact file), confirm the project has a root: run `openspec list --json` (with `--store <id>` when a store is selected, since the store is then the root) and read `root`. A root object means the project is set up. `"root": null` means it is not - there is no `openspec/` directory here, and a write such as `openspec new change` would create one as a side effect. The command also exits non-zero, which is that answer rather than a broken CLI, so read the JSON instead of retrying or working around it.

One `"root": null` is not about setup: when a `status` error message starts with `Declared in` or `Invalid store declaration in` and names this project's `openspec/config.yaml` (or `config.yml`), the project does use OpenSpec through a store it declares, which this machine cannot resolve (the store is not registered, or the `store:` line is malformed). Do not treat it as uninitialized and skip the branches below: stop before writing and show the user that error's `message` and `fix`.

Otherwise, with no root, what happens next depends on how this workflow was reached:

- **Auto-selected**: you chose this workflow yourself, without the user naming OpenSpec, naming this skill, or running its slash command. Stop using OpenSpec and answer the request normally, as you would with no OpenSpec installed. Do not ask them to set anything up and do not mention OpenSpec setup.
- **Explicit OpenSpec request**: the user named OpenSpec, named this skill, or ran its slash command. Stop before writing and ask how to proceed: set this project up (`openspec init`), target a store they already have (`--store <id>`), or continue without OpenSpec for this request. Wait for their answer.

In both branches, never create the root as a side effect: do not run `openspec init` until the user asks for it, do not hand-create `openspec/` files, and do not let a command create it.

**Input**: Optionally specify a change name (e.g., `/openspec-apply-change add-auth`). If omitted, check if it can be inferred from conversation context. If vague or ambiguous you MUST prompt for available changes.

**Steps**

1. **Select the change**

   If a name is provided, use it. Otherwise:
   - Infer from conversation context if the user mentioned a change
   - Auto-select if only one active change exists
   - If ambiguous, run `openspec list --json` to get available changes and ask the user to select one

   Always announce: "Using change: <name>" and how to override (e.g., `/openspec-apply-change <other>`).

2. **Check status to understand the schema**
   ```bash
   openspec status --change "<name>" --json
   ```
   Parse the JSON to understand:
   - `schemaName`: The workflow being used (e.g., "spec-driven")
   - `planningHome`, `changeRoot`, and `actionContext`: planning scope and edit constraints
   - Which artifact contains the tasks (typically "tasks" for spec-driven, check status for others)

3. **Get apply instructions**

   ```bash
   openspec instructions apply --change "<name>" --json
   ```

   This returns:
   - `contextFiles`: artifact ID -> array of concrete file paths (varies by schema - could be proposal/specs/design/tasks or spec/tests/implementation/docs)
   - Progress (total, complete, remaining)
   - Task list with status, source path, and source line
   - Dynamic instruction based on current state
   - Optional `context`: current required project instruction input from the selected root
   - Optional `operationGuidance`: current advisory guidance for apply
   - `missingArtifacts` (when present): required artifact ids with no output

   **Handle states:**
   - If `state: "blocked"`: show the message and pause implementation.
     - If `missingArtifacts` is non-empty: suggest using `/openspec-continue-change` to create them.
     - Otherwise, follow the CLI instruction to create or repair the schema-configured tracking file from existing planning artifacts. Do not assume another artifact is ready or start implementation while blocked.
   - If `state: "all_done"`: defer completion handling until step 8 distinguishes tracked Apply completion tasks from legacy task files
   - Otherwise: proceed to implementation

   Treat `context` as a required prompt-level input. Read and consider it, and
   apply relevant project facts, conventions, and constraints while implementing.
   Treat `operationGuidance` as optional additive advice. Read and consider every
   entry, and follow entries that are applicable and compatible with the built-in
   workflow.

   Keep both fields separate from CLI-returned state, missing artifacts, tasks,
   progress, `contextFiles`, and the built-in `instruction`. They are not
   evidence of task completion, do not replace the built-in instruction, and do
   not permit bypassing a blocked state. If context conflicts with the built-in
   instruction, an explicit user choice, or a CLI-controlled value, report the
   conflict and preserve the controlling value. If guidance is inapplicable or
   conflicts with those controlling inputs, do not follow it and explain why.
   These are prompt-level behavior contracts, not enforceable checks.

4. **Read context files**

   Read every file path listed under `contextFiles` from the apply instructions output.
   The files depend on the schema being used:
   - **spec-driven**: proposal, specs, design, tasks
   - Other schemas: follow the contextFiles from CLI output

   Do not copy `context` or `operationGuidance` verbatim into implementation
   files or planning artifacts unless the user separately asks for that content.

5. **Check Git commit readiness**

   This workflow commits its completed work. Before editing, confirm the current
   directory is inside a Git repository and inspect `git status --short`,
   including staged, unstaged, and untracked files. If there is no Git repository
   or the index already contains staged changes, stop before implementation and
   explain why the automatic commit cannot safely proceed. Record pre-existing
   working-tree changes so they can be excluded from this workflow's commit.
   Never clean, stash, reset, or discard them.

6. **Show current progress**

   Display:
   - Schema being used
   - Progress: "N/M tasks complete"
   - Remaining tasks overview
   - Dynamic instruction from CLI

7. **Implement tasks (loop until done or blocked)**

   For each pending task:
   - Show which task is being worked on
   - Make the code changes required, or perform the requested workflow action for a task in the final `## N. Apply completion` group
   - Keep changes minimal and focused
   - Before editing, confirm the checkbox at the returned `sourcePath` and `line` still matches the task description; if it does not, rerun the apply instructions and use the refreshed location
   - Mark the task complete at its returned `sourcePath` and `line`: `- [ ]` → `- [x]`
   - Rerun the apply instructions and confirm that task is now done and progress changed
   - Continue to next task

   **Tracked Apply completion group**

   If the task file has a final numbered heading ending in `Apply completion`,
   its four checkboxes are real tasks. Do not wait for `state: "all_done"` before
   executing them. Complete them in order, and do not start this group until
   every task before it is complete:

   1. **Sync delta specs**: run `/openspec-sync-specs "<name>"` and verify the main specs reflect every delta requirement. If there are no delta specs, verify that none exist and mark this task complete as a no-op.
   2. **Capture wiki knowledge**: run `/openspec-capture` to apply the canonical capture procedure to this change. If there is nothing new to record, report that and mark this task complete as a no-op.
   3. **Archive the change**: only after the sync and capture tasks are checked, run `openspec archive "<name>" --skip-specs --yes` (include the selected store flag when applicable). The explicit sync task has already merged and verified the delta specs, so `--skip-specs` prevents a second merge. `--yes` allows the still-pending commit task to remain tracked during archive. Verify the archive destination, then locate the moved tasks file, check the archive task there, and continue using that archived path. Do not rerun apply instructions after the change is archived.
   4. **Commit the work**: stage only files changed for this change by implementation, task progress, sync, wiki capture, or archive. Do not use `git add .` or `git add -A`, and do not include pre-existing changes. Mark the commit checkbox in the archived tasks file as part of preparing this commit, stage that file, then commit with a concise message and verify the commit hash. Treat the task as complete only after the commit succeeds; if it fails, restore the checkbox to incomplete and report the error.



   For sync and capture tasks, mark their checkbox after verification and refresh
   apply instructions as usual. After archive moves the change, update the task
   checkbox in the archived file instead; the active-change instructions no
   longer apply. Leave all later lifecycle tasks unchecked if a step fails.

   **Pause if:**
   - Task is unclear → ask for clarification
   - Implementation reveals a design issue → suggest updating artifacts
   - A task needs work beyond what the spec and tasks describe, or you are tempted to drop, narrow, defer, or accept exceptions to specified behavior to make it fit → surface the added scope and ask; do not absorb it silently
   - Error or blocker encountered → report and wait for guidance
   - User interrupts

   If implementation stops while tasks before the Apply completion group remain
   incomplete, report progress and do not start that group. If a lifecycle task
   fails, report progress and do not run any later lifecycle task.

8. **Finish tracked Apply completion tasks or legacy closeout**

   If the task file has the final numbered `Apply completion` group, its sync,
   wiki capture, archive, and commit actions are already executed through the
   tracked task loop. Verify the archived task checkboxes and successful commit;
   do not run the automatic closeout again.

   For older task files without that group, retain the automatic closeout:
   re-run `openspec instructions apply --change "<name>" --json` and continue
   only when it reports `state: "all_done"` and zero remaining tasks. If any
   task is incomplete, stop without starting closeout.

   Pass the exact **Apply completion mode** handoff to the archive workflow:
   "run `/openspec-archive-change "<name>"` in Apply completion mode: sync its delta specs, archive it, and do not ask for confirmation". The archive workflow syncs delta specs before moving the
   change and does not ask for confirmation in this mode. If sync, archive, or
   verification fails or reports a blocker, stop; do not commit.

   After archive succeeds, stage only files changed for this change by
   implementation, task progress, sync, or archive. Do not use `git add .` or
   `git add -A`, and do not include pre-existing changes. If a changed file
   contains unrelated pre-existing edits that cannot be isolated safely, stop
   before committing and report it.

   Generate a concise commit message from the change's intent and completed work
   (for example, `feat: complete <change-name>`), then commit without asking
   for confirmation. Verify that the commit succeeded. If staging or committing
   fails, report the error and do not claim the pipeline completed.

9. **On completion or pause, show status**

   Display:
   - Tasks completed this session
   - Overall progress: "N/M tasks complete"
   - If all done: report the sync and wiki capture results, archive location, generated commit message, and commit hash
   - If paused: explain why and wait for guidance

**Output During Implementation**

```
## Implementing: <change-name> (schema: <schema-name>)

Working on task 3/7: <task description>
[...implementation happening...]
✓ Task complete

Working on task 4/7: <task description>
[...implementation happening...]
✓ Task complete
```

**Output On Completion**

```
## Implementation Complete

**Change:** <change-name>
**Schema:** <schema-name>
**Progress:** 7/7 tasks complete ✓

### Completed This Session
- [x] Task 1
- [x] Task 2
...

All tracked tasks are complete, including sync, wiki capture, archive, and commit.
```

**Output On Pause (Issue Encountered)**

```
## Implementation Paused

**Change:** <change-name>
**Schema:** <schema-name>
**Progress:** 4/7 tasks complete

### Issue Encountered
<description of the issue>

No later lifecycle tasks were run after the blocker. Resolve it and run
`/openspec-apply-change` again to continue; completed task checkboxes remain checked.
```

**Guardrails**
- Keep going through tasks until done or blocked
- Always read context files before starting (from the apply instructions output)
- If task is ambiguous, pause and ask before implementing
- If implementation reveals issues, pause and suggest artifact updates
- Keep code changes minimal and scoped to each task
- Update task checkbox immediately after completing each task
- Pause on errors, blockers, or unclear requirements - don't guess
- When a task needs work beyond what the spec describes, surface the added scope and pause - never silently narrow, defer, or simplify away specified behavior
- Only mark a task `- [x]` when its specified behavior is fully implemented, not when it is partially done or deferred
- Use contextFiles from CLI output, don't assume specific file names
- Use each task's sourcePath and line to update its exact checkbox
- Do not use context or operation guidance as proof that a task is complete
- Apply relevant project context; report conflicts with controlling workflow inputs
- Consider every guidance entry; explain any inapplicable or conflicting advice
- Do not copy runtime context or operation guidance into implementation files or planning artifacts
- Preserve CLI-controlled blocked/ready/all-done behavior and completion criteria
- For a tracked Apply completion group, run each lifecycle action only after all preceding tasks are complete; for legacy task files, use automatic closeout only at `state: "all_done"`
- Do not repeat sync, wiki capture, archive, or commit after a tracked Apply completion group succeeds
- Preserve unrelated staged, unstaged, and untracked work; commit only this change's completed work

**Fluid Workflow Integration**

This skill supports the "actions on a change" model:

- **Can be invoked anytime**: Before all artifacts are done (if tasks exist), after partial implementation, interleaved with other actions
- **Allows artifact updates**: If implementation reveals design issues, suggest updating artifacts - not phase-locked, work fluidly
