export async function createSymlinkOrSkip(
  createSymlink: () => void | Promise<void>,
  skip: (reason?: string) => never
): Promise<void> {
  try {
    await createSymlink();
  } catch (error) {
    const code = error instanceof Error ? (error as NodeJS.ErrnoException).code : undefined;
    if (code === 'EPERM' || code === 'EACCES') {
      skip('The current environment does not permit symbolic link creation.');
    }
    throw error;
  }
}
