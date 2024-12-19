import { program, OptionValues } from 'commander';

export type Options = {
  sizes: string[];
  distPath: string;
  sourcePaths: string[];
  assetsPath: string;
  quiet: boolean;
  silent: boolean;
  watch: boolean;
};

const normalizeOptions = (options: OptionValues) => {
  // Normalize the options from arguments
  const watch: boolean = options.watch === true ? true : false;
  const quiet: boolean = options.quiet === true ? true : false;
  const silent: boolean = options.silent === true ? true : false;
  const sizes: string[] = options.size ? options.size.split(',') : [20, 24];
  const _distPath: string = options.distribution;
  const distPath = _distPath && _distPath !== 'undefined' ? _distPath : '';
  const _assetsPath: string = options.assets || 'assets';
  const assetsPath = `${_assetsPath}/@maersk-global/icons/js`;
  const sourcePaths: string[] = options.source ? options.source.split(',') : [];

  return { sizes, distPath, assetsPath, sourcePaths, quiet, silent, watch };
};

export const config = (): Options => {
  program
    .name('mds-icon-sync')
    .version('1.0.0')
    .description(
      'Fully automated icon asset synchronization for @maersk-global/icons\nReads source folders, finds icon references and synchonizes only these icon files to your distribution assets',
    )
    .option('--distribution <char>', 'Path to the distribution folder')
    .option('--source <char,char>', 'Comma separated list of folder names with sources to scan')
    .option(
      '--assets <char>',
      'Path to the created "mds-icons" folder in distrubution (defaults to "assets" i.e -> "assets/mds-icons/icons/js")',
    )
    .option('--size <20,24>', 'Comma separated list of sizes to sync (defaults to 20,24)')
    .option('--watch', 'Enable file watching')
    .option('--silent', 'Suppress verbose output messages')
    .option('--quiet', 'Suppress all output messages');

  program.parse();

  const opts = program.opts();
  const options = normalizeOptions(opts);

  return options;
};
