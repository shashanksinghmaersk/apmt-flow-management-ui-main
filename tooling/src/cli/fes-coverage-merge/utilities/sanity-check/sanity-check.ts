import { terminal } from 'terminal-kit';
import { pathExists } from '../../../../utilities/path-exists/path-exists';
import { Options } from '../../config';

export const sanityCheck = ({ coveragePath }: Options) => {
  let sanityCheckMessage = '';
  let sanityCheckError = false;

  // 1. --coverage
  const coveragePathExists = pathExists(coveragePath);

  if (!coveragePathExists) {
    terminal(' - The provided coverage path does not exist \n');
    terminal('   Please check the argument ').cyan(`--coverage ${coveragePath}\n`);

    sanityCheckError = true;
    sanityCheckMessage = `coverage path does not exist`;
  }

  if (sanityCheckError) {
    terminal('\n Get more help using the -h or --help flag');
  }

  return { sanityCheckMessage, sanityCheckError };
};
