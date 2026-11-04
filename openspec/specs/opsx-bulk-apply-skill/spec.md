# opsx-bulk-apply-skill Specification

## Purpose

The `/opsx:bulk-apply` workflow helps users implement multiple active OpenSpec changes in a useful sequence. It preserves the safeguards and completion behavior of applying each change individually while making batch scope and blocked changes visible.

## Requirements

### Requirement: Include batch apply in the core workflow profile
The default core workflow profile SHALL make `/opsx:bulk-apply` available through the generated surfaces supported by the selected tool.

#### Scenario: Install the default core profile
- **WHEN** a user initializes or updates OpenSpec with the default core profile
- **THEN** the generated workflow set includes `/opsx:bulk-apply`

#### Scenario: Install the default core profile on Windows
- **WHEN** a user initializes or updates OpenSpec on Windows with the default core profile
- **THEN** the generated workflow set includes `/opsx:bulk-apply` at a tool-recognized path using Windows-compatible path handling

### Requirement: Resolve the batch change set
The `/opsx:bulk-apply` workflow SHALL apply all active changes by default or only the changes explicitly named by the user.

#### Scenario: No change names are supplied
- **WHEN** the user invokes `/opsx:bulk-apply` without naming changes
- **THEN** the workflow considers every active change in the selected planning root
- **AND** reports that no changes are available and stops when the root has no active changes

#### Scenario: Change names are supplied
- **WHEN** the user invokes `/opsx:bulk-apply` with one or more change names
- **THEN** the workflow considers exactly those changes
- **AND** reports unknown or duplicate names and stops before implementation

### Requirement: Order changes by implementation dependencies
The `/opsx:bulk-apply` workflow SHALL choose a useful implementation order from the selected changes' scope, prerequisites, and dependencies.

#### Scenario: A selected change depends on another selected change
- **WHEN** the workflow identifies an implementation dependency between selected changes
- **THEN** it places the prerequisite before the dependent change
- **AND** does not use change creation dates to determine implementation order

#### Scenario: The workflow determines an implementation order
- **WHEN** the workflow is ready to start a batch
- **THEN** it reports the ordered changes and the rationale for that order
- **AND** asks the user to clarify before implementation if a material dependency cannot be resolved safely

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

### Requirement: Handle blocked changes according to batch scope
The `/opsx:bulk-apply` workflow SHALL report blocked changes and handle them differently according to whether the batch was explicitly named.

#### Scenario: A default all-active batch contains a blocked change
- **WHEN** the user supplied no change names and one or more active changes are blocked
- **THEN** the workflow reports and skips each blocked change
- **AND** continues with the remaining applicable changes in the determined order

#### Scenario: An explicitly named change is blocked
- **WHEN** the user supplied change names and the workflow reaches a named change that is blocked
- **THEN** the workflow reports the blocker and stops the batch at that change
- **AND** does not process later changes in the ordered batch

### Requirement: Apply each change using the existing Apply lifecycle
The `/opsx:bulk-apply` workflow SHALL process changes sequentially using the existing per-change Apply safeguards and completion behavior.

#### Scenario: A change completes successfully
- **WHEN** a selected change is applicable and its implementation tasks complete
- **THEN** the workflow completes that change's existing Apply lifecycle before starting the next change
- **AND** reports progress and the outcome for each change

#### Scenario: Implementation encounters an error or ambiguity
- **WHEN** implementation of a change encounters an error or material ambiguity
- **THEN** the workflow pauses and reports the issue
- **AND** does not start later changes in the batch

### Requirement: Reconcile subsequent changes with completed work
Before applying each later change, the workflow SHALL compare its proposal and implementation plan with earlier completed changes and current code, and adapt its implementation and implementation-facing planning artifacts only while preserving its original intent and requirements and earlier completed contracts.

#### Scenario: A later change can be adapted compatibly
- **WHEN** a later selected change is next after one or more batch changes complete
- **THEN** the workflow reviews its planning artifacts against the completed changes and current code
- **AND** automatically adapts its implementation and applicable planning artifacts while preserving its original proposal intent, requirements, and earlier completed contracts
- **AND** refreshes the change's apply instructions before continuing

#### Scenario: Adaptation would break an earlier completed contract
- **WHEN** adapting a later change would alter an earlier completed change's externally observable behavior or contract
- **THEN** the workflow stops before making the incompatible change
- **AND** explains the affected contract and asks the user how to proceed

#### Scenario: Adaptation would change the later proposal's original intent
- **WHEN** completing a later change would require materially changing the scope or intended outcome in its proposal or equivalent scope-defining artifact
- **THEN** the workflow stops before making that adaptation
- **AND** explains how the adaptation diverges from the original intent and asks the user how to proceed
