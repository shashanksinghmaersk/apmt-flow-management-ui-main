import { existsSync } from 'fs';

export const pathExists = (path: string) => {
  let pathExists = false;

  try {
    pathExists = existsSync(path);
  } catch (error) {
    pathExists = false;
  }

  return pathExists;
};
