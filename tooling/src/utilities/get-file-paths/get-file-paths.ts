import { Glob } from 'glob';

export const getFilePaths = (paths: string[], typeGlob = 'tsx,ts,jsx,js') => {
  let filePathsError = false;
  let filePaths: string[] = [];

  try {
    paths.forEach((folder) => {
      const glob = new Glob(`${folder}/**/*.{${typeGlob}}`, {});
      filePaths = [...filePaths, ...glob];
    });
  } catch (err) {
    filePathsError = true;
  }

  return { filePaths, filePathsError };
};
