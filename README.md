# OpenSpec (rjga94 fork)

This is a personal fork of [Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec). For the project overview, installation, usage, and community information, see the [upstream README](https://github.com/Fission-AI/OpenSpec#readme) and [official documentation](https://openspec.dev/docs).

## Fork-specific differences

- **Update workflow:** An explicitly invoked `/opsx:update` applies the requested planning-artifact edits without per-artifact confirmation. If the workflow is selected implicitly, the agent still asks for confirmation before writing.
- **Apply and archive workflow:** Apply marks the archive task complete before moving a change, so the archived task list retains its completed status.
