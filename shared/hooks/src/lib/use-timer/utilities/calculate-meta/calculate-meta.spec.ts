import {
  calculateMeta,
  formatTime,
  padZero,
  TimerMeta,
} from './calculate-meta';
import { TimerCallbackInfo, TimerOptions } from '../timer/timer';

describe('calculate-meta', () => {
  // Add test cases for calculateMeta, formatTime, and padZero functions

  it('should calculate meta correctly with remaining time', () => {
    const options: TimerOptions = { duration: 60000, onTick: jest.fn() };
    const info: TimerCallbackInfo = { tick: 30000, percentage: 50 };

    const result: TimerMeta = calculateMeta(info, options);

    expect(result).toEqual({
      elapsed: 30,
      percentage: 50,
      numericElapsed: '00:30',
      numericRemaining: '00:30',
      semanticElapsed: '30 Seconds',
      semanticRemaining: '30 Seconds',
    });
  });

  it('should calculate meta correctly with no remaining time', () => {
    const options: TimerOptions = { duration: 30000, onTick: jest.fn() };
    const info: TimerCallbackInfo = { tick: 30000, percentage: 100 };

    const result: TimerMeta = calculateMeta(info, options);

    expect(result).toEqual({
      elapsed: 30,
      percentage: 100,
      numericElapsed: '00:30',
      numericRemaining: '00:00',
      semanticElapsed: '30 Seconds',
      semanticRemaining: 'now',
    });
  });

  it('should calculate meta correctly with longer duration', () => {
    const options: TimerOptions = { duration: 3600000, onTick: jest.fn() };
    const info: TimerCallbackInfo = { tick: 900000, percentage: 25 };

    const result: TimerMeta = calculateMeta(info, options);

    expect(result).toEqual({
      elapsed: 900,
      percentage: 25,
      numericElapsed: '15:00',
      numericRemaining: '45:00',
      semanticElapsed: '15 Minutes',
      semanticRemaining: '45 Minutes',
    });
  });

  it('should calculate meta correctly with shorter duration', () => {
    const options: TimerOptions = { duration: 5000, onTick: jest.fn() };
    const info: TimerCallbackInfo = { tick: 3000, percentage: 60 };

    const result: TimerMeta = calculateMeta(info, options);

    expect(result).toEqual({
      elapsed: 3,
      percentage: 60,
      numericElapsed: '00:03',
      numericRemaining: '00:02',
      semanticElapsed: '3 Seconds',
      semanticRemaining: '2 Seconds',
    });
  });

  it('should calculate meta correctly with custom onTick function', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const customOnTick = () => {};
    const options: TimerOptions = { duration: 10000, onTick: customOnTick };
    const info: TimerCallbackInfo = { tick: 8000, percentage: 80 };

    const result: TimerMeta = calculateMeta(info, options);

    expect(result).toEqual({
      elapsed: 8,
      percentage: 80,
      numericElapsed: '00:08',
      numericRemaining: '00:02',
      semanticElapsed: '8 Seconds',
      semanticRemaining: '2 Seconds',
    });
  });

  it('should calculate meta correctly with no options provided', () => {
    const options: TimerOptions = {};
    const info: TimerCallbackInfo = { tick: 5000, percentage: 50 };

    const result: TimerMeta = calculateMeta(info, options);

    expect(result).toEqual({
      elapsed: 5,
      percentage: -1, // Should be -1 when duration is not provided
      numericElapsed: '00:05',
      numericRemaining: '--:--', // Should be '--:--' when duration is not provided
      semanticElapsed: '5 Seconds',
      semanticRemaining: '--', // Should be '--' when duration is not provided
    });
  });

  it('should format time correctly with hours, minutes, and seconds', () => {
    const result = formatTime(3665); // 1 hour, 1 minute, and 5 seconds
    expect(result).toBe('01:01:05');
  });

  it('should format time correctly with only minutes and seconds', () => {
    const result = formatTime(125); // 2 minutes and 5 seconds
    expect(result).toBe('02:05');
  });

  it('should format time correctly with only seconds', () => {
    const result = formatTime(55); // 55 seconds
    expect(result).toBe('00:55');
  });

  it('should pad zero correctly for single-digit numbers', () => {
    const result = padZero(5);
    expect(result).toBe('05');
  });

  it('should not pad zero for double-digit numbers', () => {
    const result = padZero(15);
    expect(result).toBe('15');
  });
});
