import { readFileLines } from '../../../../utilities/read-file-lines/read-file-lines';
import { getFilePaths } from '../../../../utilities/get-file-paths/get-file-paths';
import { Options } from '../../config';
import path from 'path';
import { writeFileSync } from 'fs';

export const createExportFiles = async ({ distPath, assetsPath, sizes }: Options) => {
  let exportFilesError = false;

  for (const sizeIndex in sizes) {
    const indexMap: Record<string, string> = {};
    const size = sizes[sizeIndex];
    const parentFolder = `${distPath}/${assetsPath}/${size}px`;
    const { filePaths, filePathsError } = getFilePaths([parentFolder]);

    try {
      if (!filePathsError) {
        for (const filePathIndex in filePaths) {
          const filePath = filePaths[filePathIndex];

          await readFileLines(filePath, ({ lineNumber, lineText }) => {
            if (lineNumber === 1) {
              const svgString = lineText.trim().substring(15);
              const iconName = path.parse(filePath).name;

              indexMap[iconName] = svgString;
            }
          });
        }

        writeFileSync(
          `${parentFolder}/index.js`,
          `export default ${JSON.stringify(indexMap, null, 2)}`
        );
      }
    } catch (err) {
      exportFilesError = true;
    }
  }

  return { exportFilesError };
};
