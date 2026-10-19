import type { PathLike } from 'node:fs';

export interface FileInfo {
  path: PathLike;
  exists: boolean;
}

export const checkFile = (file: FileInfo): boolean => {
  return file.exists;
};
