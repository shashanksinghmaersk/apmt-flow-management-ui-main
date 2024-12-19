import { spawnSync } from 'child_process';
import { existsSync, mkdirSync, PathLike } from 'fs';
import path, { resolve } from 'path';

export type CreateCombinedReportProps = {
  lcovFile?: PathLike;
  outputDir?: PathLike;
};

export const createCombinedReport = ({ lcovFile, outputDir }: CreateCombinedReportProps) => {
  let createCombinedReportHasError = false;
  let createCombinedReportError = '';

  // Resolve paths to ensure they work from the project root
  const resolvedLcovFile = lcovFile ? resolve(lcovFile.toString()) : undefined;
  const resolvedOutputDir = outputDir ? resolve(outputDir.toString()) : undefined;

  if (resolvedLcovFile && !existsSync(resolvedLcovFile)) {
    createCombinedReportHasError = true;
    createCombinedReportError = 'No lcov file found';
  } else if (!resolvedLcovFile) {
    createCombinedReportHasError = true;
    createCombinedReportError = 'No lcov file given to base report on';
  }

  if (resolvedOutputDir && !existsSync(resolvedOutputDir)) {
    mkdirSync(resolvedOutputDir);
  } else if (!resolvedOutputDir) {
    createCombinedReportHasError = true;
    createCombinedReportError = 'No output directory for report given';
  }

  if (!createCombinedReportHasError) {
    try {
      const execPath = path.normalize('node_modules/genhtml-js/lib/html.js');

      spawnSync(`${execPath}`, [`-o`, `${resolvedOutputDir}`, `${resolvedLcovFile}`], {
        shell: false,
      });
    } catch (err) {
      createCombinedReportHasError = true;
      createCombinedReportError = 'Error creating the report for combined lcov';
    }
  }

  return { createCombinedReportHasError, createCombinedReportError };
};
