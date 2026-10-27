## ADDED Requirements

### Requirement: Archive captures to the wiki

The archive skill SHALL capture the conversation into `openspec/wiki/` before moving the change, using the same behavior as `/opsx:capture`, whether or not the user ran capture earlier and whether or not `capture` is installed as its own workflow.

#### Scenario: Capture runs before the move

- **WHEN** the user archives a change
- **THEN** the agent captures new knowledge from the conversation into the wiki before moving the change out of its active location

#### Scenario: Already captured

- **WHEN** the conversation was already captured and nothing new was discussed
- **THEN** archive writes nothing to the wiki and does not ask the user about it

#### Scenario: Capture installed separately or not

- **WHEN** `capture` is not part of the user's installed workflows
- **THEN** archive performs the capture itself inline

#### Scenario: Capture cannot complete

- **WHEN** capture stops, for example because Git LFS is not installed
- **THEN** archive reports it and continues archiving, since capture is not a precondition for archiving

#### Scenario: Bulk archive

- **WHEN** the user archives several changes together
- **THEN** capture runs once for the conversation before the first change is moved
