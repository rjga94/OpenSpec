# Spec Delta

## ADDED Requirements

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
