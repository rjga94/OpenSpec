# OpenSpec architecture

## Runtime and package

The published package is an ESM Node.js CLI. The package manifest sets Node.js `>=20.19.0`, exposes the `openspec` binary, and uses Commander for command parsing ([package.json](../../package.json)).

## CLI and command handlers

`src/cli/index.ts` defines the Commander command surface. Command actions dynamically import their handlers, keeping command implementations and their dependencies out of startup paths such as `--help` and `--version`. Handlers are organized under `src/commands/`; workflow-facing CLI operations such as status, instructions, templates, schemas, and change creation are grouped under `src/commands/workflow/` ([CLI entry point](../../src/cli/index.ts), [workflow command exports](../../src/commands/workflow/index.ts)).

## Schema-driven planning

Workflow schemas define artifacts and their dependencies. The artifact-graph layer loads and validates schemas, computes build order, determines which artifacts are ready, and reports completion or unmet dependencies ([artifact-graph exports](../../src/core/artifact-graph/index.ts), [ArtifactGraph](../../src/core/artifact-graph/graph.ts)).

The workflow instruction handler resolves the planning root and schema, loads change context, then generates artifact instructions from the graph and project configuration ([instructions.ts](../../src/commands/workflow/instructions.ts)). Root and store selection are shared core concerns rather than workflow-specific path logic ([root-selection.ts](../../src/core/root-selection.ts), [planning-home.ts](../../src/core/planning-home.ts)).

## Agent workflow surfaces

Agent-facing instructions are authored as workflow-specific TypeScript templates under `src/core/templates/workflows/` and re-exported through [skill-templates.ts](../../src/core/templates/skill-templates.ts). The package also provides generation scripts for committed skill outputs and parity hashes ([package scripts](../../package.json)). Capture's shared procedure lives in [wiki.ts](../../src/core/templates/workflows/wiki.ts); the CLI does not manage wiki content, which is written by the agent under the resolved OpenSpec root.

## Main project areas

- `src/cli/` — command registration and CLI startup.
- `src/commands/` — command handlers, including workflow and configuration operations.
- `src/core/` — shared domain logic, schemas, stores, root resolution, and templates.
- `openspec/specs/` — product behavior contracts.
- `openspec/changes/` — active and archived planning artifacts.
- `docs-lab/` and `website/` — authored documentation and its publishing site; see [documentation ownership](documentation.md).

