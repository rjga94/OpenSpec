## ADDED Requirements

### Requirement: Capture workflow installation

The system SHALL generate the `capture` skill and `/opsx:capture` command like other workflows, include `capture` in the default (core) profile, and offer it in the workflow picker.

#### Scenario: Default profile

- **WHEN** a user runs `openspec init` with the default profile
- **THEN** the capture skill and command are generated for each selected tool

#### Scenario: Custom profile without capture

- **WHEN** a custom profile omits `capture`
- **THEN** no capture skill or command is generated
- **AND** generated archive, explore, and propose instructions contain no references to `/opsx:capture`

#### Scenario: Existing projects

- **WHEN** a user with the default profile runs `openspec update` after upgrading
- **THEN** the capture skill and command are added

#### Scenario: Skills.sh distribution

- **WHEN** the skills.sh distribution is generated
- **THEN** it includes `openspec-capture`
