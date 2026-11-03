# OpenSpec overview

OpenSpec is an AI-native, spec-driven development framework distributed as a command-line tool. It helps people and AI assistants agree on a change before implementation, keep that plan reviewable, and carry the resulting behavior back into the project's specs. The project describes its approach as fluid, iterative, lightweight, and brownfield-first ([README](../../README.md), [concepts](../../docs/concepts.md)).

## Core model

- **Specs** in `openspec/specs/` describe agreed system behavior and serve as the project's current specification.
- **Changes** in `openspec/changes/` collect one unit of proposed work. Depending on the selected schema, a change can contain a proposal, delta specs, design, and tasks.
- **Delta specs** describe only requirements being added, modified, or removed. Archiving applies those deltas to the main specs and moves the completed change into the archive.

These are product concepts described in the [workflow overview](../../docs/overview.md) and [workflow guide](../../docs/workflows.md); the CLI's archive behavior is implemented in [archive.ts](../../src/core/archive.ts).

## How people use it

The common loop is optional exploration, proposal and review, implementation, then archive. Exploration is a no-stakes way to investigate an idea; users who already know the change can propose directly. Capture is a separate, optional action for durable project knowledge: it writes to `openspec/wiki/`, not to specs or source, and the wiki is context rather than a source of requirements ([capture contract](../../openspec/specs/opsx-capture-skill/spec.md), [wiki contract](../../openspec/specs/project-wiki/spec.md)).

OpenSpec supplies deterministic scaffolding, status, and instructions through the CLI; the AI assistant interprets those instructions and edits planning or implementation files ([workflow guide](../../docs/workflows.md)).

## Knowledge boundaries

- Treat main specs as the behavior contract and change artifacts as plans or history.
- Verify claims about current implementation against source and configuration; label a proposal or design as planned or historical unless current evidence confirms it.
- Use the wiki for broader project context and references without merging its content into specs.

These boundaries are part of the [wiki specification](../../openspec/specs/project-wiki/spec.md) and the shared [capture procedure](../../src/core/templates/workflows/wiki.ts).
