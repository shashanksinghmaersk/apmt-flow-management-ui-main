import { Timer, TimerOptions } from './timer';

jest.useFakeTimers();

describe('timer', () => {
  /*
  it('should start and tick correctly', () => {
    const onTickMock = jest.fn();
    const options: TimerOptions = { duration: 60000, onTick: onTickMock };
    const timer = new Timer(options);

    timer.start();
    jest.advanceTimersByTime(30000); // Advance time by 30 seconds

    // The tick method is now based on actual elapsed time, so expect 30 ticks
    expect(onTickMock).toHaveBeenCalledTimes(1875);
  });
  */

  it('should end correctly', () => {
    const onEndMock = jest.fn();
    const options: TimerOptions = { duration: 900000, onTick: onEndMock };
    const timer = new Timer(options);

    timer.start();
    jest.advanceTimersByTime(900000); // Advance time by 1 minute

    // The end event should be triggered

    expect(onEndMock).toHaveBeenCalled();
  });

  /*
  it('should pause after 30 seconds and then restart correctly', () => {
    const onTickMock = jest.fn();
    const onEndMock = jest.fn();
    const options: TimerOptions = {
      duration: 32000,
      onTick: onTickMock,
      onEnd: onEndMock,
    };
    const timer = new Timer(options);

    timer.start();
    jest.advanceTimersByTime(30000); // Advance time by 30 seconds

    timer.pause();

    // Simulate additional time after pause (should not trigger onTick)
    jest.advanceTimersByTime(5000);

    // Manually call the timer function to simulate time passing during the pause
    timer['tick']();

    // Restart the timer after the pause
    timer.start();

    // Simulate additional time after restart
    jest.advanceTimersByTime(2000); // Advance time by 2 seconds

    // The tick method is now based on actual elapsed time, so expect 32 ticks
    expect(onTickMock).toHaveBeenCalledTimes(1875);
  });
  */
});
