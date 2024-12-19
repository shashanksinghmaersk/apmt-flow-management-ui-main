import path from 'path';
import { terminal } from 'terminal-kit';
import { Exit, exitProgram } from '../../utilities/exit-program/exit-program';
import { logger } from '../../utilities/logger/logger';
import { watchPaths } from '../../utilities/watch-paths/watch-paths';
import { Options, config } from './config';
import { createCombinedReport } from './utilities/create-combined-report/create-combined-report';
import { mergeFiles } from './utilities/merge-files/merge-files';
import { sanityCheck } from './utilities/sanity-check/sanity-check';
import { calculateCoverage } from './utilities/calculate-coverage/calculate-coverage';
import { createCombinedHtml } from './utilities/create-combined-html/create-combined-html';

const acceptablePercentage = 80;
const failedPercentage = 50;

// Function to determine color based on coverage percentage
function getCoverageColor(coverage: number, acceptable: number, failed: number): string {
  if (coverage < failed) {
    return 'red';
  } else if (coverage < acceptable) {
    return 'yellow';
  } else {
    return 'green';
  }
}

// Function to format and print the coverage information
function printCoverageInfo(name: string, coverage: number) {
  const color = getCoverageColor(coverage, acceptablePercentage, failedPercentage);

  switch (color) {
    case 'red':
      logger.itemError(`${name}: ${coverage.toFixed(2)}%`);
      break;
    case 'yellow':
      logger.itemWarning(`${name}: ${coverage.toFixed(2)}%`);
      break;
    case 'green':
      logger.itemSuccess(`${name}: ${coverage.toFixed(2)}%`);
      break;
    default:
      break;
  }
}

const fesCoverageMergeExecute = async (quiet: boolean, options: Options) => {
  const { mergeFilesError, mergeFilesHasError } = await mergeFiles({
    fileName: 'lcov.info',
    outputDir: options.coveragePath,
    targetDir: options.coveragePath,
  });

  if (mergeFilesHasError) {
    logger.itemError(mergeFilesError);

    exitProgram({
      type: Exit.FAIL,
      text: 'Exiting - with coverage merging',
      quiet,
    });
  }

  await createCombinedHtml({
    reportDirectoryName: 'lcov-report',
    sourceDirectory: options.coveragePath,
  });

  const { createCombinedReportError, createCombinedReportHasError } = createCombinedReport({
    lcovFile: path.join(options.coveragePath, 'lcov.info'),
    outputDir: options.coveragePath,
  });

  if (createCombinedReportHasError) {
    logger.itemError(createCombinedReportError);
  }

  const { totalBranchCoverage, totalFunctionsCoverage, totalLineCoverage } =
    await calculateCoverage(path.join(options.coveragePath, 'lcov.info'));

  printCoverageInfo('Branch Coverage', totalBranchCoverage);
  printCoverageInfo('Functions Coverage', totalFunctionsCoverage);
  printCoverageInfo('Line Coverage', totalLineCoverage);
};

const fesCoverageMerge = async () => {
  // Initialize commander terminal kit and return parsed normalized options
  // from arguments given to cli
  const options = config();
  const quiet = options.quiet;

  // 1. SANITY CHECK
  // Perform the sanity check of arguments with error messages and early bail
  const { sanityCheckError } = sanityCheck(options);

  if (sanityCheckError) {
    exitProgram({
      type: Exit.FAIL,
      text: 'Exiting - error in configuration',
      quiet,
    });
  }

  const handleFileChange = async (_: string, path?: string) => {
    const timestamp = new Date();
    const timestampFormatted = timestamp.toLocaleTimeString('en-US', { hour12: false });

    terminal
      .white(`  ✏️  [${timestampFormatted}] `)
      .brightWhite(`detected change in `)
      .cyan.bold.underline(`${path}\n`);

    await fesCoverageMergeExecute(quiet, options);
  };

  if (options.watch) {
    await fesCoverageMergeExecute(quiet, options);

    logger.write('\n  ⚡️ Watching for source file changes\n', quiet);

    watchPaths([options.coveragePath], handleFileChange);
  } else {
    await fesCoverageMergeExecute(quiet, options);

    exitProgram({
      type: Exit.SUCCESS,
      text: 'Successfully merged coverage reports',
      quiet,
    });
  }
};

fesCoverageMerge();
