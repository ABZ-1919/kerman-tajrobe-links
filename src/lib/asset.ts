/**
 * Prefixes paths to files in /public with the basePath.
 * Next.js applies basePath to its own links and scripts automatically,
 * but not to URLs we write by hand in <img src> or metadata.
 */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;
