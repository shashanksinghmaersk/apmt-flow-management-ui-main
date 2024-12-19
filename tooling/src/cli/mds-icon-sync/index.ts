import { terminal } from 'terminal-kit';
import { Exit, exitProgram } from '../../utilities/exit-program/exit-program';
import { getFilePaths } from '../../utilities/get-file-paths/get-file-paths';
import { logger } from '../../utilities/logger/logger';
import { Options, config } from './config';
import { getIconReferences } from './utilities/get-icon-references/get-icon-references';
import { sanityCheck } from './utilities/sanity-check';
import { syncAssets } from './utilities/sync-assets';
import { getIconValues } from './utilities/get-icon-values/get-icon-values';
import { watchPaths } from '../../utilities/watch-paths/watch-paths';
import { createExportFiles } from './utilities/create-export-files/create-export-files';

type ExecutorProps = {
  options: Options;
  silent: boolean;
  quiet: boolean;
  watch?: boolean;
};

const execGetFilePaths = ({ options, quiet, silent, watch }: ExecutorProps) => {
  const { filePaths, filePathsError } = getFilePaths(options.sourcePaths);
  const numberOfFilePaths = filePaths.length;

  if (filePathsError) {
    logger.itemError('There was a problem locating source files', silent);

    if (!watch) {
      exitProgram({ type: Exit.FAIL, text: 'There was a problem locating source files', quiet });
    }
  } else if (numberOfFilePaths === 0) {
    logger.itemWarning('Found 0 source files to scan', silent);

    if (!watch) {
      exitProgram({ type: Exit.WARNING, text: 'Found no files to scan', quiet });
    }
  }

  return filePaths;
};

const execGetIconReferences = async (
  { quiet, silent, watch }: ExecutorProps,
  filePaths: string[],
) => {
  const { iconReferences, iconReferencesError } = await getIconReferences(filePaths);
  const numberOfIconReferences = Object.keys(iconReferences).length;

  if (iconReferencesError) {
    logger.itemError('There was a problem reading from source files', silent);

    if (!watch) {
      exitProgram({ type: Exit.FAIL, text: 'Error reading from source files', quiet });
    }
  } else if (numberOfIconReferences === 0) {
    logger.itemWarning(`No icon references found in ${filePaths.length} source files`, silent);

    if (!watch) {
      exitProgram({
        type: Exit.WARNING,
        text: 'Found no icon references in the source files',
        quiet,
      });
    }
  }

  return iconReferences;
};

const execGetIconValues = async (
  { quiet, silent, watch }: ExecutorProps,
  iconReferences: Record<string, string>,
  filePaths: string[],
) => {
  const { iconValues, iconValuesError } = getIconValues(iconReferences);
  const numberIconValues = iconValues.length;

  if (iconValuesError) {
    logger.itemError('There was a problem parsing collected text lines', silent);

    if (!watch) {
      exitProgram({ type: Exit.FAIL, text: 'Error parsing text', quiet });
    }
  } else if (numberIconValues === 0) {
    logger.itemWarning(`No icon references found in ${filePaths.length} source files`, silent);

    if (!watch) {
      exitProgram({
        type: Exit.WARNING,
        text: 'Found no icon references in the source files',
        quiet,
      });
    }
  }

  return iconValues;
};

const execSyncAssets = async (
  { options, quiet, silent, watch }: ExecutorProps,
  iconValues: string[],
) => {
  const { syncAssetsError, numberOfSyncedAssets } = await syncAssets(iconValues, options);

  if (syncAssetsError) {
    logger.itemError(`Encountered a problem copying files to distribution assets`, silent);

    if (!watch) {
      exitProgram({
        type: Exit.FAIL,
        text: 'There was an error copying files from @maersk-global/icons',
        quiet,
      });
    }
  } else if (numberOfSyncedAssets === 0) {
    logger.itemWarning('Found no files to synchronize', silent);

    if (!watch) {
      exitProgram({ type: Exit.FAIL, text: 'Exiting with error, no files to synchronize', quiet });
    }
  }

  return { syncAssetsError, numberOfSyncedAssets };
};

const mdsIconSyncExecute = async (
  silent: boolean,
  quiet: boolean,
  options: Options,
  watch?: boolean,
) => {
  const silenceTitle = silent || watch;

  // GATHERING SOURCE FILE PATHS TO SCAN
  // Collect source files paths to scan from configuration
  logger.itemTitle('Locating source files to scan', silenceTitle);
  const filePaths = execGetFilePaths({ options, silent, quiet, watch });

  // READ SOURCE FILE PATHS FOR RAW TEXT WITH ICON REFERENCES
  // Get an object of raw text lines containing any type of MDS icon reference
  logger.itemTitle('Collecting code containing icon references', silenceTitle);
  const iconReferences = await execGetIconReferences({ options, silent, quiet, watch }, filePaths);

  // PARSE RAW TEXT TO UNIQUE ICON REFERENCE VALUES
  // Get unique icon values from the icon references in the lines of text collected
  logger.itemTitle('Creating list of referenced icons in code', silenceTitle);
  const iconValues = await execGetIconValues(
    { options, silent, quiet, watch },
    iconReferences,
    filePaths,
  );

  // COPY THE SOURCE ICONS TO ASSETS
  logger.itemTitle(`Synchronizing icons from @maersk-global/icons`, silenceTitle);
  const { syncAssetsError, numberOfSyncedAssets } = await execSyncAssets(
    { options, silent, quiet, watch },
    iconValues,
  );

  // Create index files
  logger.itemTitle('Create module export files', silenceTitle);

  if (!syncAssetsError) {
    logger.itemSuccess(`Copied ${numberOfSyncedAssets} files`, quiet || watch);
  }

  await createExportFiles(options);
};

const mdsIconSyncInit = async () => {
  // Initialize commander terminal kit and return parsed normalized options
  // from arguments given to cli
  const options = config();
  const quiet = options.quiet;
  const silent = options.silent || options.quiet;

  logger.header('MDS Icon Sync', quiet);

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

  // 2. CLIENT INFORMATION
  // Sanity check did not fail or program would have exited
  // Give informations about what will be executed from given arguments
  if (!silent) {
    terminal(`> Synchronizing @maersk-global/icons usage in `).cyan(`[${options.sourcePaths}]\n`);
    terminal('> As distribution assets in ').cyan(`${options.distPath}/${options.assetsPath}\n\n`);
  }

  let allowWatchPrompt = false;

  const handleFileChange = async (_: string, path?: string) => {
    if (allowWatchPrompt) {
      const timestamp = new Date();
      const timestampFormatted = timestamp.toLocaleTimeString('en-US', { hour12: false });

      terminal
        .white(`  ✏️  [${timestampFormatted}] `)
        .brightWhite(`detected change in `)
        .cyan.bold.underline(`${path}\n`);
    }

    await mdsIconSyncExecute(silent, quiet, options, true);
  };

  if (options.watch) {
    await mdsIconSyncExecute(silent, quiet, options);

    logger.write('\n  ⚡️ Watching for source file changes\n', quiet);

    watchPaths(options.sourcePaths, handleFileChange);

    // This setTimeout BS wont fly
    setTimeout(() => {
      allowWatchPrompt = true;
    }, 3000);
  } else {
    await mdsIconSyncExecute(silent, quiet, options);

    exitProgram({
      type: Exit.SUCCESS,
      text: 'Successfully synced MDS icons to distribution assets',
      quiet,
    });
  }
};

mdsIconSyncInit();
