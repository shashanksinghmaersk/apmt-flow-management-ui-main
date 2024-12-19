import { program } from 'commander';

export type Options = {
  silent: boolean;
  quiet: boolean;
  watch: boolean;
  interval: number;
  envFiles: string[];
  envVariable: string;
};

export const config = (): Options => {
  program
    .name('fes-local-token')
    .version('1.0.0')
    .description('Fetch and set access token for FES local')
    .option('--watch', 'Enable refresh')
    .option('--silent', 'Suppress verbose output messages')
    .option('--quiet', 'Suppress all output messages')
    .option('--envFiles <char,char>', 'Comma separated list of env files to write token in')
    .option('--envVariable <char>', 'Name of the environment variable to place token on')
    .option('--interval <5000>', 'Milliseconds on when to refresh token');

  program.parse();

  const options = program.opts();

  // Normalize the options from arguments
  const quiet: boolean = options.quiet === true ? true : false;
  const silent: boolean = options.silent === true ? true : false;
  const watch: boolean = options.watch === true ? true : false;
  const envVariable: string =
    options.envVariable !== undefined ? options.envVariable : 'ACCESS_TOKEN';
  // comma separated list
  const envFiles: string[] = options.envFiles !== undefined ? options.envFiles.split(',') : [''];
  const interval: number =
    options.interval !== undefined ? Number(options.interval) : 30 * 60 * 1000;

  return { quiet, silent, watch, interval, envFiles, envVariable };
};

export const dotEnvFilePath = 'apps/flowmanagementui/.env.local';
