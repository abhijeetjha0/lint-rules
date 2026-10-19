import path from 'node:path';

export const getCleanPath = (inputPath) => {
  if (!inputPath) {
    return '';
  }

  return path.normalize(inputPath);
};
