# opsx-capture-skill Specification

## Purpose
TBD - created by archiving change add-capture-workflow-and-wiki. Update Purpose after archive.

## Requirements

### Requirement: Capture workflow

The system SHALL provide an `/opsx:capture` skill that records the current conversation into the project wiki at `openspec/wiki/`, whether or not explore was used earlier in the conversation.

#### Scenario: Capture after explore

- **WHEN** the user runs `/opsx:capture` after an explore session
- **THEN** the agent records what was discussed into the wiki
- **AND** reports which wiki pages it created or updated

#### Scenario: Capture without prior explore

- **WHEN** the user runs `/opsx:capture` in a conversation that never used explore
- **THEN** the agent captures the conversation the same way

#### Scenario: Optional step

- **WHEN** the user goes from explore, or from nothing, directly to propose
- **THEN** the workflow proceeds without requiring capture

#### Scenario: Nothing worth capturing

- **WHEN** the conversation contains no project knowledge
- **THEN** the agent says so and writes nothing

### Requirement: Wiki is updated, not duplicated

The skill SHALL read the existing wiki before writing and update existing pages in place where the topic is already covered.

#### Scenario: Repeat capture on the same topic

- **WHEN** the topic was captured before
- **THEN** the agent updates the existing page and its index entries
- **AND** does not create a second page for the same topic

#### Scenario: Conflicting information

- **WHEN** the conversation contradicts a wiki page
- **THEN** the agent updates the page to the newer information
- **AND** states in the page that it replaces earlier information, and tells the user

### Requirement: Wiki structure stays navigable

The skill SHALL audit the entire wiki after each capture and refactor it as needed to preserve its structural and navigation rules.

#### Scenario: Existing wiki needs restructuring

- **WHEN** a capture finds missing or inaccurate indexes, unreachable pages or assets, or broken internal links anywhere in the wiki
- **THEN** the agent repairs the structure and links, including moving or reorganizing pages when needed
- **AND** preserves unique information and hand edits
- **AND** reports pages moved or removed

### Requirement: Reference material is preserved

The skill SHALL copy reference files the conversation relies on into the wiki and SHALL record links as wiki entries, including source and capture date.

#### Scenario: Referenced file

- **WHEN** the conversation relies on an image, video, audio file, PDF, Word document, or other file
- **THEN** the agent copies the file under the wiki's assets
- **AND** the page that uses it links to the copy and records the original source and capture date

#### Scenario: Referenced link

- **WHEN** the conversation relies on a web link
- **THEN** the agent records the link, its title, and the date in the relevant page

#### Scenario: File cannot be copied

- **WHEN** a referenced file is not accessible to the agent
- **THEN** the agent records the reference and its original location
- **AND** tells the user it was not copied

### Requirement: Confirm very large files

The skill SHALL ask the user before copying a very large reference file into the wiki.

#### Scenario: User approves

- **WHEN** a referenced file is very large
- **THEN** the agent states the file's size and asks whether to copy it
- **AND** copies it only after the user agrees

#### Scenario: User declines

- **WHEN** the user declines
- **THEN** the agent records the reference and its original location without copying the file

### Requirement: Lazy Git LFS setup

Before copying the first binary reference file, the skill SHALL check whether Git LFS is installed and configured to track the wiki's assets, and SHALL configure it if it is not, telling the user what it changed. Text-only captures SHALL NOT trigger any LFS check.

#### Scenario: LFS already configured

- **WHEN** Git LFS is installed and tracks the wiki's assets
- **THEN** the agent copies the file without changing Git configuration

#### Scenario: LFS available but not configured

- **WHEN** Git LFS is installed but does not track the wiki's assets
- **THEN** the agent enables LFS tracking for the wiki's assets before copying the file
- **AND** tells the user which Git files it changed

#### Scenario: LFS not installed

- **WHEN** Git LFS is not installed
- **THEN** the agent does not copy the binary file
- **AND** tells the user how to install Git LFS
- **AND** records the reference and its original location in the wiki

#### Scenario: Not a Git repository

- **WHEN** the project is not a Git repository
- **THEN** the agent copies the file without any LFS setup

#### Scenario: Existing history untouched

- **WHEN** the agent configures LFS
- **THEN** it does not rewrite existing Git history or migrate files already committed

### Requirement: Safe project root

The skill SHALL NOT create `openspec/` as a side effect when the project has no OpenSpec root, and SHALL write the wiki in the root it resolves, including a selected store.

#### Scenario: No OpenSpec root

- **WHEN** the project has no OpenSpec root
- **THEN** the agent writes nothing and tells the user to set the project up first

### Requirement: Capture does not change specs or code

The skill SHALL write only under `openspec/wiki/` and the Git files needed for LFS.

#### Scenario: Capture leaves specs untouched

- **WHEN** capture runs
- **THEN** no file under `openspec/specs/`, `openspec/changes/`, or the project's source is modified
