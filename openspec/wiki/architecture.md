# OpenSpec architecture

## Runtime and package

The published package is an ESM Node.js CLI. The package manifest sets Node.js `>=22.12.0`, exposes the `openspec` binary, and uses Commander for command parsing ([package.json](../../package.json)).

## CLI and command handlers

`src/cli/index.ts` defines the Commander command surface. Command actions dynamically import their handlers, keeping command implementations and their dependencies out of startup paths such as `--help` and `--version`. Handlers are organized under `src/commands/`; workflow-facing CLI operations such as status, instructions, templates, schemas, and change creation are grouped under `src/commands/workflow/` ([CLI entry point](../../src/cli/index.ts), [workflow command exports](../../src/commands/workflow/index.ts)).

## Schema-driven planning

Workflow schemas define artifacts and their dependencies. The artifact-graph layer loads and validates schemas, computes build order, determines which artifacts are ready, and reports completion or unmet dependencies ([artifact-graph exports](../../src/core/artifact-graph/index.ts), [ArtifactGraph](../../src/core/artifact-graph/graph.ts)).

The workflow instruction handler resolves the planning root and schema, loads change context, then generates artifact instructions from the graph and project configuration ([instructions.ts](../../src/commands/workflow/instructions.ts)). Root and store selection are shared core concerns rather than workflow-specific path logic ([root-selection.ts](../../src/core/root-selection.ts), [planning-home.ts](../../src/core/planning-home.ts)).

## Agent workflow surfaces

Agent-facing instructions are authored as workflow-specific TypeScript templates under `src/core/templates/workflows/` and re-exported through [skill-templates.ts](../../src/core/templates/skill-templates.ts). The package also provides generation scripts for committed skill outputs and parity hashes ([package scripts](../../package.json)). Capture's shared procedure lives in [wiki.ts](../../src/core/templates/workflows/wiki.ts); the CLI does not manage wiki content, which is written by the agent under the resolved OpenSpec root.

### Update workflow authorization

The update command and skill share the instructions in [update-change.ts](../../src/core/templates/workflows/update-change.ts), with behavior covered by [template tests](../../test/core/templates/update-change.test.ts) and specified in the [update workflow contract](../specs/opsx-update-skill/spec.md). Step 4 reads and reconciles artifacts; step 5 is the only write phase.

An explicit `/opsx:update` or direct update-skill invocation authorizes the requested in-scope planning edits and necessary coherence corrections without per-artifact confirmation, including eligible companion files under a partly populated glob artifact. When the workflow is selected implicitly, the assistant presents proposed edits and waits for confirmation. Material ambiguity or an intent change still requires clarification or a new change; path containment, refreshed status/instructions, no-overwrite, and planning-only safeguards remain. Invocation mode is expressed in agent-facing instructions rather than enforced by the CLI.

### Apply completion lifecycle

The shared Apply template drives both the skill and command surfaces. For changes with a tracked Apply completion group, its lifecycle is spec sync, wiki capture, archive, then commit. Before archiving, Apply saves the archive task as complete in the active task list; if archiving fails while the change remains active, it restores that checkbox. After a successful move, it verifies the checkbox in the archived task list before continuing to commit. The behavior is specified in the [Apply skill specification](../specs/opsx-apply-skill/spec.md), authored in [apply-change.ts](../../src/core/templates/workflows/apply-change.ts), and covered by [completion tests](../../test/core/templates/propose-apply-automation.test.ts). This describes the workflow as implemented on 2026-11-03.

### Bulk Apply orchestration

Bulk Apply is a separate generated workflow that coordinates batch selection and dependency-informed ordering around the existing single-change Apply instructions; it does not change `/opsx:apply`. It applies each change's full Apply lifecycle before starting the next. Before each later change, it reconciles implementation-facing planning with completed changes and current code, adapting only within the proposal's intent and requirements and earlier completed contracts; it pauses if either boundary would need to change. These safeguards are agent-facing instructions, not CLI-enforced behavior ([bulk-apply-change.ts](../../src/core/templates/workflows/bulk-apply-change.ts), [template tests](../../test/core/templates/bulk-apply-change.test.ts), [Bulk Apply specification](../specs/opsx-bulk-apply-skill/spec.md)).

Before implementation, Bulk Apply also compares all selected changes' available planning artifacts with one another and relevant current code and tests. After the blocked-change and Git-readiness checks, it automatically reconciles eligible plans: overlapping work can move between existing changes, or a coherent batch can become a new survivor with complete proposal, specs, design, and tasks while fully absorbed source change directories are deleted. The refactor preserves each proposal's initial intent and completed task progress; it pauses before refactoring if any intent would have to change or be omitted. It refreshes status and Apply instructions for the resulting changes, then runs their normal Apply lifecycles in dependency-informed order. This preflight and reconciliation are also agent-facing instructions, not CLI-enforced behavior ([bulk-apply-change.ts](../../src/core/templates/workflows/bulk-apply-change.ts), [template tests](../../test/core/templates/bulk-apply-change.test.ts), [Bulk Apply specification](../specs/opsx-bulk-apply-skill/spec.md)). This describes the workflow as implemented on 2026-11-04.

### Apply verification

The shared Apply instructions ask agents to verify behavior against the active change using proportionate methods that fit the software and environment, including launching it and using UI interaction where useful. Checks stay within the change's acceptance criteria; existing tests are preferred, and any code or setup created solely for verification is temporary and removed afterward. If the software or a suitable method cannot be run, the limitation is reported rather than treating the check as passed ([Apply skill specification](../specs/opsx-apply-skill/spec.md), [apply-change.ts](../../src/core/templates/workflows/apply-change.ts), [committed Apply skill](../../skills/openspec-apply-change/SKILL.md)).

## Local verification and hosted automation

The repository does not maintain GitHub Actions workflows or Dependabot configuration. Contributors can run the package's build, test, and lint commands locally; Nix packaging and its update script also remain available ([package.json](../../package.json), [flake.nix](../../flake.nix), [update-flake.sh](../../scripts/update-flake.sh)). Release automation is no longer provided by repository workflows, though the package's local release scripts remain.

This does not remove the CLI's CI-environment awareness. The shared `CI` detector still informs telemetry, version checks, and CI-aware tips ([ci.ts](../../src/utils/ci.ts), [telemetry](../../src/telemetry/index.ts), [version-check.ts](../../src/core/version-check.ts), [completion-tip.ts](../../src/core/completion-tip.ts), [standalone-tip.ts](../../src/core/standalone-tip.ts)). The `.github/` directory retains issue templates, `CODEOWNERS`, and the pull request template.

## Main project areas

- `src/cli/` — command registration and CLI startup.
- `src/commands/` — command handlers, including workflow and configuration operations.
- `src/core/` — shared domain logic, schemas, stores, root resolution, and templates.
- `openspec/specs/` — product behavior contracts.
- `openspec/changes/` — active and archived planning artifacts.
- `docs-lab/` and `website/` — authored documentation and its publishing site; see [documentation ownership](documentation.md).
