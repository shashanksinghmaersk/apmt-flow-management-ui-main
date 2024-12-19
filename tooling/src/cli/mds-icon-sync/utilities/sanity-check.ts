import path from 'path';
import { logger } from '../../../utilities/logger/logger';
import { pathExists } from '../../../utilities/path-exists/path-exists';
import { MAERSK_NPM_ICON_PATH } from '../constants';
import { terminal } from 'terminal-kit';
import { Options } from '../config';

export const sanityCheck = ({ distPath, sourcePaths, sizes }: Options) => {
  let sanityCheckMessage = '';
  let sanityCheckError = false;

  // 1. --distribution
  const distributionPathProvided = !!distPath;
  const distributionPathExists = pathExists(distPath);

  if (!distributionPathProvided) {
    terminal(' - No distribution path provided \n');
    terminal('   Please check the argument ').cyan(`--distribution ${distPath}\n`);

    sanityCheckError = true;
    sanityCheckMessage = 'No distribution destination provided';
  } else if (!distributionPathExists) {
    terminal(' - The provided distribution path does not exist \n');
    terminal('   Please check the argument ').cyan(`--distribution ${distPath}\n`);

    sanityCheckError = true;
    sanityCheckMessage = `Distribution destination does not exist`;
  }

  // 2. --sizes
  let sizeError = false;

  sizes.some((size) => {
    const validSize = ['20', '24'].includes(String(size));

    if (!validSize) {
      sizeError = true;
      sanityCheckError = true;
      sanityCheckMessage = `Bad sizes argument`;
    }

    return !validSize;
  });

  if (sizeError) {
    if (sanityCheckError) {
      terminal('\n');
    }
    terminal(` - Only 20 and 24 (or both i.e 20,24) are valid size values\n`);
    terminal('   Please check the argument ').cyan(`--size ${sizes}\n`);
  }

  // 3. --source
  // Check if each file exist - but only warn report as we dont care if it doesnt
  if (sourcePaths.length === 0) {
    if (sanityCheckError) {
      terminal('\n');
    }

    logger.write(
      ' - Please provide a comma separated list of folder names to scan for source files\n',
    );

    terminal('   To provide one folder or a list of folders to scan: ')
      .cyan('--source src ')
      .white('or ')
      .cyan('--source folder1,folder2\n');

    sanityCheckError = true;
    sanityCheckMessage = 'No source paths to scan provided';
  }

  const doesMdsIconsExist = pathExists(path.normalize(MAERSK_NPM_ICON_PATH));

  if (!doesMdsIconsExist) {
    sanityCheckError = true;
    sanityCheckMessage = '@maersk-global/icons not installed';
  }

  if (sanityCheckError) {
    terminal('\n Get more help using the -h or --help flag');
  }

  return { sanityCheckMessage, sanityCheckError };
};
