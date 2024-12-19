import { program } from 'commander';

export type Options = {
  silent: boolean;
  quiet: boolean;
};

export const config = (): Options => {
  program.version('1.0.0');

  program.parse();

  const options = program.opts();

  // Normalize the options from arguments
  const quiet: boolean = options.quiet === true ? true : false;
  const silent: boolean = options.silent === true ? true : false;

  return { quiet, silent };
};
