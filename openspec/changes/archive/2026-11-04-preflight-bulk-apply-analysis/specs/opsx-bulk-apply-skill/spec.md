# Spec Delta

## ADDED Requirements

### Requirement: Preflight and reconcile the selected batch
The `/opsx:bulk-apply` workflow SHALL compare every selected change's available proposal, requirements, design, and tasks with the other selected changes and relevant current code and tests before implementation. It SHALL identify dependencies, incompatible assumptions or contracts, duplicated work, and opportunities to consolidate or redistribute work.

#### Scenario: The selected batch is preflighted
- **WHEN** the workflow has resolved the selected changes
- **THEN** it analyzes the available planning artifacts for every selected change against the rest of the batch and relevant current code and tests before implementation begins
- **AND** determines the dependencies and implementation order for the resulting batch

#### Scenario: Work can be reorganized without changing proposal intent
- **WHEN** the preflight identifies overlapping or duplicated work that can be reconciled while preserving each proposal's initial idea and intent
- **THEN** the workflow automatically reorganizes the selected changes' proposals, requirements, designs, and tasks as needed to prepare a coherent batch
- **AND** may move work between existing changes or consolidate work into a new surviving change
- **AND** preserves the intent and outcomes of every proposal in the resulting change or changes

#### Scenario: Several changes are consolidated into a new survivor
- **WHEN** the preflight determines that several selected changes can be combined without changing any proposal's initial idea or intent
- **THEN** the workflow creates a normal OpenSpec change with a coherent proposal, specs, design, and task list covering the combined work
- **AND** deletes the fully absorbed source change directories so they are no longer active or eligible for a later all-active batch
- **AND** applies the surviving change through the normal single-change Apply lifecycle

#### Scenario: Reorganization would change a proposal's intent
- **WHEN** a necessary refactor would change or omit the initial idea or intent of any selected proposal
- **THEN** the workflow pauses before making that refactor
- **AND** explains the affected proposal intent and asks the user how to proceed

#### Scenario: The batch completes after automatic reorganization
- **WHEN** the reorganized changes are ready for implementation
- **THEN** the workflow reports the resulting ordered changes and rationale before implementation
- **AND** reports any automatic reorganization or consolidation in the final batch results
