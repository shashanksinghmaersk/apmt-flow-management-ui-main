import { TimerCallbackInfo, TimerOptions } from '../timer/timer';

export type TimerMeta = {
  elapsed: number;
  percentage: number;
  numericElapsed: string;
  numericRemaining: string;
  semanticElapsed: string;
  semanticRemaining: string;
};

export const calculateMeta = (
  info: TimerCallbackInfo,
  options: TimerOptions,
): TimerMeta => {
  const duration = options.duration || 0;
  const durationSeconds = Math.floor(duration / 1000);

  const percentage = duration
    ? Math.min((info.tick / duration) * 100, 100)
    : -1;

  const elapsedMilliseconds = info.tick;
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  const remainingSeconds = durationSeconds - elapsedSeconds;

  const numericElapsed = formatTime(elapsedSeconds);
  const numericRemaining = duration ? formatTime(remainingSeconds) : '--:--';

  const semanticElapsed = calculateSemanticTime(elapsedSeconds);
  const semanticRemaining = duration
    ? calculateSemanticTime(remainingSeconds)
    : '--';

  return {
    elapsed: elapsedSeconds,
    percentage,
    numericElapsed,
    numericRemaining,
    semanticElapsed,
    semanticRemaining,
  };
};

const calculateSemanticTime = (seconds: number): string => {
  if (seconds === 0) {
    return 'now';
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours} Hour${hours > 1 ? 's' : ''} ${minutes} Minute${minutes > 1 ? 's' : ''} ${remainingSeconds} Second${remainingSeconds > 1 ? 's' : ''}`;
  } else if (minutes > 0) {
    if (remainingSeconds > 0) {
      return `${minutes} Minute${minutes > 1 ? 's' : ''} ${remainingSeconds} Second${remainingSeconds > 1 ? 's' : ''}`;
    } else {
      return `${minutes} Minute${minutes > 1 ? 's' : ''}`;
    }
  } else if (seconds > 0) {
    return `${seconds} Second${seconds > 1 ? 's' : ''}`;
  } else {
    return `0 Second`;
  }
};

export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = hours > 0 ? padZero(hours) + ':' : '';
  const formattedMinutes = padZero(minutes) + ':';
  const formattedSeconds = padZero(remainingSeconds);

  return formattedHours + formattedMinutes + formattedSeconds;
};

export const padZero = (value: number): string =>
  value < 10 ? '0' + value : '' + value;
