# opsx-apply-skill Specification

## Purpose
Defines how the apply skill reads the current apply inputs for a change while keeping the existing apply workflow behavior.

## Requirements

### Requirement: Consume current apply operation inputs

The `/opsx:apply` skill SHALL consume current project context and apply operation guidance returned by `openspec instructions apply --change "<name>" --json` while preserving its existing state-driven workflow.

#### Scenario: Apply context and guidance are configured

- **WHEN** apply instruction output contains `context` and `operationGuidance`
- **THEN** the skill treats context as a required prompt-level instruction input
- **AND** tells the agent to read it and apply relevant project facts, conventions, and constraints
- **AND** treats operation guidance as optional additive advice
- **AND** tells the agent to read and consider it and follow entries that are applicable and compatible with the built-in workflow

#### Scenario: Apply operation inputs are absent

- **WHEN** apply instruction output omits context and operation guidance
- **THEN** the skill continues with its existing apply workflow

#### Scenario: Runtime instructions conflict with apply state

- **WHEN** context or operation guidance conflicts with CLI-returned state, missing artifacts, tasks, progress, context files, or built-in instruction
- **THEN** the generated skill keeps required project context and advisory operation guidance separate from the CLI-returned apply fields
- **AND** tells the agent to report context conflicts
- **AND** tells the agent to explain why conflicting or inapplicable operation guidance was not followed
- **AND** this change does not modify the CLI-returned state, missing artifacts, tasks, progress, context files, or built-in instruction
- **AND** the template tells the agent that neither field is evidence of task completion or permission to bypass a blocked state
- **AND** the system does not represent that prompt-level precedence as an enforceable check

#### Scenario: Apply consumes runtime instructions without copying them

- **WHEN** the skill receives context or operation guidance
- **THEN** it does not copy those fields verbatim into implementation files or planning artifacts unless separately requested by the user

### Requirement: Preserve apply workflow behavior

The `/opsx:apply` skill template and CLI contract SHALL keep their existing change selection, context loading, task progression, pause-on-blocker behavior, and completion reporting structure while allowing focused verification of the active change.

#### Scenario: Runtime inputs are consumed

- **WHEN** apply instructions return configured operation inputs
- **THEN** no CLI-controlled apply state transition, required implementation task, or completion criterion is added, removed, or replaced solely by this change

#### Scenario: Apply permits change-scoped verification

- **WHEN** the agent implements a task and needs evidence that the changed behavior works
- **THEN** the Apply workflow allows it to choose and run proportionate verification for that behavior using suitable methods for the software, including launching it in its environment and using UI or other relevant checks
- **AND** the checks remain focused on the active change's requirements and acceptance criteria

#### Scenario: Verification-only checks stay temporary

- **WHEN** the agent runs checks solely to verify the active change and those checks are not themselves a requested deliverable
- **THEN** it may use existing project tests or temporary, disposable verification code or setup
- **AND** it does not add or retain permanent project test files or test infrastructure solely for those checks
- **AND** the workflow's existing change selection, context loading, task progression, pause-on-blocker behavior, and completion reporting remain unchanged

#### Scenario: Verification environment is unavailable

- **WHEN** the software or a suitable verification method cannot be run in the available environment
- **THEN** the agent reports the limitation and uses other relevant evidence without claiming an unperformed check succeeded

### Requirement: Preserve archive task completion when archiving

During Apply completion, the archive task MUST be recorded as complete before the change is moved, so the archived task list retains its completed status.

#### Scenario: Archive succeeds

- **WHEN** Apply is ready to archive a change after its sync and wiki-capture tasks are complete
- **THEN** it records the archive task as complete in the active task list before archiving
- **AND** verifies that the archived task list retains the checked status before continuing to commit

#### Scenario: Archive fails while the change remains active

- **WHEN** the archive operation fails and the change remains active
- **THEN** Apply restores the archive task to incomplete
- **AND** stops before committing and reports the archive error
