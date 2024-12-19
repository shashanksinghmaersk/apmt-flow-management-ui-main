import { terminal } from 'terminal-kit';

const _logger = (text: string, silent?: boolean) => {
  return silent ? null : terminal(text);
};

const header = (title: string, silent?: boolean) => {
  if (!silent) terminal.bold.white(`\n 🚀 ${title}\n\n`);
};

const exitMsgError = (text: string, silent?: boolean) => {
  return silent ? null : terminal.bold.red('\n\n > ').white.bgRed(` MDS `).brightRed(` ${text}\n`);
};

const exitMsgSuccess = (text: string, silent?: boolean) => {
  return silent ? null : terminal.bold.green('\n\n > ').black.bgGreen(` MDS `).green(` ${text}\n`);
};

const exitMsgWarning = (text: string, silent?: boolean) => {
  return !silent
    ? null
    : terminal.bold.brightYellow('\n\n > ').black.bgYellow(` MDS `).brightYellow(` ${text}\n`);
};

const itemWarning = (text: string, silent?: boolean) => {
  return silent ? null : terminal.brightYellow(`\n  ⚠️ ${text}\n`);
};

const itemError = (text: string, silent?: boolean) => {
  return silent ? null : terminal.red(`\n  ⛔️ ${text}\n`);
};

const itemSuccess = (text: string, silent?: boolean) => {
  return silent ? null : terminal.green(`\n  ✅ ${text}\n`);
};

const itemTitle = (text: string, silent?: boolean) => {
  return silent ? null : terminal.brightWhite(`  ✨ ${text}\n`);
};

const itemSub = (text: string, silent?: boolean) => {
  return silent ? null : terminal.cyan.bold(`     - ${text}\n`);
};

const itemSubWarning = (text: string, silent?: boolean) => {
  return silent ? null : terminal.yellow.bold(`     - ${text}\n`);
};

const itemSubError = (text: string, silent?: boolean) => {
  return silent ? null : terminal.red.bold(`     - ${text}\n`);
};

export const logger = {
  header,
  write: _logger,
  exitMsgError,
  itemError,
  itemSuccess,
  exitMsgSuccess,
  exitMsgWarning,
  itemTitle,
  itemWarning,
  itemSub,
  itemSubWarning,
  itemSubError,
};
