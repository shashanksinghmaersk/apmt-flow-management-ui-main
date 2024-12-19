import { logger } from '../../utilities/logger/logger';
import { config } from './config';
import { Exit, exitProgram } from '../../utilities/exit-program/exit-program';
import { getAccessToken } from './utilities/get-access-token/get-access-token';
import { setAccessToken } from './utilities/set-access-token/set-access-token';

const installer = async () => {
  // Initialize commander terminal kit and return parsed normalized options
  // from arguments given to cli
  const options = config();

  logger.header('FES Fetch and set application access token', options.silent || options.quiet);

  const applyAccessToken = async () => {
    let applyAccessTokenError = false;
    const { accessToken, accessTokenError } = await getAccessToken();

    if (accessTokenError) {
      logger.itemError(accessTokenError, options.quiet);
      applyAccessTokenError = true;
    } else {
      logger.itemSuccess('Access Token successfully retrieved', options.quiet || options.silent);
    }

    if (!applyAccessTokenError) {
      const { setAccessTokenError, filesWrittenTo } = await setAccessToken({
        accessToken,
        envFiles: options.envFiles,
        envVariable: options.envVariable,
      });

      if (setAccessTokenError) {
        applyAccessTokenError = true;
        logger.itemError(setAccessTokenError, options.quiet);
      } else {
        filesWrittenTo.forEach((fileName) => {
          logger.itemSuccess(`Successfully wrote to ${fileName}`, options.quiet || options.silent);
        });
      }
    }

    return applyAccessTokenError;
  };

  const refreshAccessToken = () => {
    const refreshInterval = setInterval(async () => {
      const accessTokenError = await applyAccessToken();

      if (accessTokenError) {
        clearInterval(refreshInterval);
        exitProgram({
          type: Exit.FAIL,
          text: 'There was an problem setting access token',
          quiet: options.quiet,
        });
      }
    }, options.interval);
  };

  const hasError = await applyAccessToken();

  if (!hasError) {
    if (options.watch) {
      refreshAccessToken();
    } else {
      exitProgram({
        type: Exit.SUCCESS,
        text: 'Successfully fetched and set access token',
        quiet: options.quiet,
      });
    }
  } else {
    exitProgram({
      type: Exit.FAIL,
      text: 'There was an problem setting access token',
      quiet: options.quiet,
    });
  }
};

installer();
