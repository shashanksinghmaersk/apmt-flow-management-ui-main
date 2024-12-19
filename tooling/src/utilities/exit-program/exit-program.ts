import { logger } from '../logger/logger';

export enum Exit {
  FAIL = 0,
  WARNING = 1,
  SUCCESS = 2,
}

type ExitProgramProps = {
  type: Exit;
  text?: string;
  quiet?: boolean;
};

export const exitProgram = ({ type, text, quiet }: ExitProgramProps) => {
  let exitCode = 1;

  if (!quiet) {
    switch (type) {
      case Exit.FAIL:
        logger.exitMsgError(`${text || 'exiting program'}`);
        break;
      case Exit.WARNING:
        logger.exitMsgWarning(`${text || 'exiting program'}`);
        exitCode = 0;
        break;
      case Exit.SUCCESS:
        logger.exitMsgSuccess(`${text || 'exiting program'}`);
        exitCode = 0;
        break;
      default:
        break;
    }
  }

  process.exit(exitCode);
};
