# Spec Delta

## MODIFIED Requirements

### Requirement: Reference material is preserved

The skill SHALL preserve reference files and links relied on by the conversation or relevant project evidence, recording their source and capture date in the wiki.

#### Scenario: Referenced file

- **WHEN** the conversation or a relevant project artifact refers to an image, video, audio file, PDF, Word document, or other file that supports captured knowledge
- **THEN** the agent copies the file under the wiki's assets when accessible
- **AND** the page that uses it links to the copy and records the original source and capture date
- **AND** repository-relative asset links resolve on Windows, macOS, and Linux

#### Scenario: Proposal image retained in a change

- **WHEN** a proposal artifact links to a user-provided image retained in that change
- **AND** capture records knowledge about the change
- **THEN** the agent copies the linked image under the wiki's assets
- **AND** links to the copy from a wiki page that describes the decision or requirement the image informed
- **AND** records the source change, reference path, and capture date without relying on a path that becomes invalid when the change is archived

#### Scenario: Referenced link

- **WHEN** the conversation or a relevant project artifact relies on a web link
- **THEN** the agent records the link, its title, and the date in the relevant page

#### Scenario: File cannot be copied

- **WHEN** a referenced file is not accessible to the agent
- **THEN** the agent records the reference and its original location
- **AND** tells the user it was not copied
