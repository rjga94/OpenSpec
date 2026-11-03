# Spec Delta

## REMOVED Requirements

### Requirement: Nix Flake Build Validation
**Reason**: The repository will no longer run hosted CI validation for Nix flake builds.
**Migration**: Contributors may run `nix build` locally when validating Nix changes.

### Requirement: Update Script Validation
**Reason**: The repository will no longer run hosted validation of the Nix update script.
**Migration**: Contributors may run `scripts/update-flake.sh` locally when validating changes to the script or flake.

### Requirement: CI Job Integration
**Reason**: Pull requests and pushes will no longer trigger GitHub Actions validation or required checks.
**Migration**: Contributors and maintainers must run relevant local checks before merging.

### Requirement: Local Testing Support
**Reason**: The repository will no longer provide a GitHub Actions workflow for local execution through `act`.
**Migration**: Use the repository's local package scripts and direct Nix commands instead of `act`.

### Requirement: Nix Installation in CI
**Reason**: No hosted CI environment will be configured to install Nix for validation.
**Migration**: Contributors who validate Nix changes locally must use their own Nix installation.

### Requirement: CI Performance Optimization
**Reason**: There will be no hosted Nix validation job whose runtime or parallel scheduling needs optimization.
**Migration**: No replacement CI performance behavior is provided.
