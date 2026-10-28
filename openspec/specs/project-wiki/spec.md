# project-wiki Specification

## Purpose
TBD - created by archiving change add-capture-workflow-and-wiki. Update Purpose after archive.

## Requirements

### Requirement: Wiki location

The project wiki SHALL live at `openspec/wiki/`, always under that name, in the same OpenSpec root as the project's specs and changes.

#### Scenario: Wiki folder name

- **WHEN** any workflow reads or writes the wiki
- **THEN** it uses `openspec/wiki/`
- **AND** never another folder name

#### Scenario: Created on first capture

- **WHEN** capture runs and `openspec/wiki/` does not exist
- **THEN** the agent creates it
- **AND** `openspec init` does not create it

### Requirement: Navigable structure

The wiki SHALL be a multi-level knowledge base organized by the agent so information is easy to find and edit, with an `index.md` at the wiki root and in every folder that lists its contents with a one-line description each. Its organization SHALL be content-led rather than a fixed taxonomy: examples may guide categorization, but no category or folder is mandatory.

#### Scenario: Reaching a page from the root

- **WHEN** a reader starts at `openspec/wiki/index.md`
- **THEN** every page and folder in the wiki is reachable through the indexes

#### Scenario: New page registered

- **WHEN** the agent adds a page or folder
- **THEN** it adds the entry to the index of its parent folder in the same capture

#### Scenario: Content-led organization

- **WHEN** the agent organizes captured knowledge
- **THEN** it chooses categories and page boundaries that fit the content
- **AND** treats suggested topics as examples, not required sections
- **AND** does not create empty folders or placeholder pages to satisfy a template
- **AND** keeps an existing layout when it still works

#### Scenario: Reorganization

- **WHEN** the structure no longer fits the content
- **THEN** the agent may move or merge pages
- **AND** updates indexes and links so none are broken

### Requirement: Plain, editable content

Wiki pages SHALL be Markdown that people can read and edit directly, and any layout is valid as long as it satisfies the navigation requirement.

#### Scenario: Human edits

- **WHEN** a person edits or adds a page
- **THEN** later captures preserve the edit and respect the existing organization

### Requirement: Assets

Reference files SHALL be stored under an `assets/` folder inside the wiki, and each file SHALL be referenced by at least one page that records its source and capture date.

#### Scenario: Asset has an owner page

- **WHEN** an asset exists in the wiki
- **THEN** a page links to it and states where it came from and when it was captured

### Requirement: Separate from specs

The wiki SHALL be a knowledge layer separate from `openspec/specs/`. Capture SHALL NOT merge wiki content into specs, and archive SHALL NOT require wiki content to match specs.

#### Scenario: Proposals draw on the wiki

- **WHEN** the user runs propose
- **THEN** the agent consults the wiki for relevant knowledge
- **AND** writes proposals and specs through the normal change workflow

### Requirement: Explore and propose consult the wiki

Explore and propose SHALL consult the wiki before starting, when it exists, and SHALL work normally when it does not. Explore SHALL NOT write to the wiki.

#### Scenario: Wiki exists

- **WHEN** the user runs explore or propose and `openspec/wiki/` exists
- **THEN** the agent reads the root index and the pages relevant to the topic
- **AND** says which pages informed its answer

#### Scenario: No wiki

- **WHEN** `openspec/wiki/` does not exist
- **THEN** explore and propose proceed without it and without error

#### Scenario: Explore stays read-only for the wiki

- **WHEN** the user is in explore and asks to save something to the wiki
- **THEN** the agent points to `/opsx:capture` instead of writing it
