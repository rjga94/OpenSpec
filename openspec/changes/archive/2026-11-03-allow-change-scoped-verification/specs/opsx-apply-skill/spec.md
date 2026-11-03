# Spec Delta

## MODIFIED Requirements

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
