# Spec Delta

## MODIFIED Requirements

### Requirement: Task Completion Check

The skill SHALL check the selected change's task completion using `totalTasks` and `completedTasks` from `openspec list --json`, with the same selected-root flags used for the rest of the workflow. It SHALL match the change by name and use the CLI's schema-aware task resolution in both single and bulk archive workflows. Direct archive SHALL warn and request confirmation when tasks are incomplete. In Apply completion mode, incomplete task counts SHALL NOT alone stop the archive or trigger a prompt.

#### Scenario: Incomplete tasks found

- **WHEN** the selected change has `totalTasks` greater than `completedTasks`
- **AND** archive is not running in Apply completion mode
- **THEN** display a warning showing the count of incomplete tasks
- **AND** prompt the user for confirmation to continue
- **AND** proceed if the user confirms

#### Scenario: Incomplete tasks in Apply completion mode

- **WHEN** the selected change has `totalTasks` greater than `completedTasks`
- **AND** archive is running in Apply completion mode
- **THEN** continue without prompting or stopping solely because tasks remain unchecked
- **AND** report the incomplete task count in the archive summary

#### Scenario: All tasks complete

- **WHEN** the selected change has equal `totalTasks` and `completedTasks`
- **THEN** proceed without a task-related warning

#### Scenario: No tracked tasks

- **WHEN** the CLI reports `totalTasks` as zero for the selected change
- **THEN** proceed without a task-related warning

#### Scenario: Custom task artifact or output path

- **WHEN** the schema tracks tasks under a custom artifact name, output path, or glob
- **THEN** use the CLI totals across the schema-resolved files
- **AND** do not infer completion from artifact existence, an artifact id of `tasks`, or the absence of a top-level `tasks.md`

#### Scenario: Task output paths are resolved across platforms

- **WHEN** the schema tracks task files with custom output paths on Windows, macOS, or Linux
- **THEN** use the CLI totals for files resolved with that platform's path rules

#### Scenario: Task progress lookup unavailable

- **WHEN** the list command fails, returns invalid JSON, omits or duplicates a selected change, or reports invalid task counts
- **THEN** report the lookup problem and stop before syncing or archiving
- **AND** do not treat the missing progress as zero tasks
