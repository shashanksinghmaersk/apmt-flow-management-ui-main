import { execSync } from 'node:child_process';
import { terminal } from 'terminal-kit';
import { logger } from '../../utilities/logger/logger';
import { config } from './config';
import { Exit, exitProgram } from '../../utilities/exit-program/exit-program';

const installer = () => {
  // Initialize commander terminal kit and return parsed normalized options
  // from arguments given to cli
  config();

  logger.header('FES installer');

  let hasError = false;

  logger.itemTitle('Setting up Husky Git Hooks & Commitlint');

  try {
    terminal('  ✨ ');

    execSync('npx husky install', {
      stdio: 'inherit',
    });
  } catch (err) {
    hasError = true;
  }

  if (!hasError) {
    terminal('  ✨ Commitlint enabled\n');
    execSync('npm pkg set scripts.commitlint="commitlint --edit"', {
      stdio: 'inherit',
    });
  }

  if (!hasError) {
    exitProgram({ type: Exit.SUCCESS, text: 'Successfully installed' });
  } else {
    exitProgram({ type: Exit.FAIL, text: 'There was an error with installer' });
  }
};

installer();
