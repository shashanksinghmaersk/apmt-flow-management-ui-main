import { program, OptionValues } from 'commander';

export type Options = {
  coveragePath: string;
  outputPath: string;
  quiet: boolean;
  silent: boolean;
  watch: boolean;
};

const normalizeOptions = (options: OptionValues) => {
  // Normalize the options from arguments
  const watch: boolean = options.watch === true ? true : false;
  const quiet: boolean = options.quiet === true ? true : false;
  const silent: boolean = options.silent === true ? true : false;

  const coveragePath: string =
    !options.coverage || options.coverage === 'undefined' ? 'coverage' : options.coverage;
  const outputPath: string =
    !options.output || options.output === 'undefined'
      ? `${coveragePath}/lcov`
      : `${coveragePath}/${options.output}`;

  return { coveragePath, quiet, silent, watch, outputPath };
};

export const config = (): Options => {
  program
    .name('fes-coverage-merge')
    .version('1.0.0')
    .description(
      'Automated coverage report merge tool for multiple coverage report files located all over a folder',
    )
    .option('--coverage <char>', 'Path to the coverage folder (defaults to "coverage")')
    .option(
      '--output <char>',
      'Name of the outputted merged report file without extension (defaults to "lcov")',
    )
    .option('--watch', 'Enable file watching')
    .option('--silent', 'Suppress verbose output messages')
    .option('--quiet', 'Suppress all output messages');

  program.parse();

  const opts = program.opts();
  const options = normalizeOptions(opts);

  return options;
};
