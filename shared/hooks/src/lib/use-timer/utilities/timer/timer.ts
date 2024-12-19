export type TimerOptions = {
  duration?: number;
  paused?: boolean;
  // Number in milliseconds on which to perform the onTick callback
  tickInterval?: number;
  tickOverflow?: boolean;
  maxTickLimit?: number;
  startAt?: number;
  onTick?: (info: TimerCallbackInfo) => void;
  onEnd?: (info: TimerCallbackInfo) => void;
  onPause?: (info: TimerCallbackInfo) => void;
};

export type TimerCallbackInfo = {
  tick: number;
  percentage: number;
};

export class Timer {
  private startTime: number;
  private lastTickTime: number;
  private elapsedTime: number;
  private timerId?: number;
  private paused: boolean;
  private options: TimerOptions;

  constructor(options: TimerOptions) {
    this.startTime = 0;
    this.lastTickTime = 0;
    this.elapsedTime = 0;
    this.paused = !!options.paused;
    this.options = {
      ...options,
      tickInterval: options.tickInterval || 0,
      maxTickLimit: options.maxTickLimit || 0,
    };
  }

  private tick() {
    const now = new Date().getTime();
    this.elapsedTime = now - this.startTime;

    let percentage = this.options.duration
      ? (this.elapsedTime / this.options.duration) * 100
      : 0;
    percentage = Math.min(percentage, 100);

    const timeSinceLastTick = now - this.lastTickTime;
    if (
      !this.lastTickTime ||
      (this.options.tickInterval &&
        timeSinceLastTick >= this.options.tickInterval)
    ) {
      const callbackInfo: TimerCallbackInfo = {
        tick: this.elapsedTime,
        percentage,
      };

      if (this.options.onTick) {
        this.options.onTick(callbackInfo);
      }

      this.lastTickTime = now;
    }

    if (
      this.options.duration &&
      this.elapsedTime >= this.options.duration &&
      !this.options.tickOverflow
    ) {
      this.scheduleNextTick();
      if (
        this.options.maxTickLimit &&
        (this.options.duration && this.elapsedTime) >= this.options.maxTickLimit
      ) {
        this.end();
      }
    }
  }

  private clearTimer() {
    if (this.timerId !== undefined) {
      cancelAnimationFrame(this.timerId);
      this.timerId = undefined;
    }
  }

  start(duration?: number, startAt?: number) {
    if (duration) {
      this.options.duration = duration === -1 ? undefined : duration;
    }
    this.paused = false;

    // Properly converting startAt from seconds to milliseconds and setting startTime
    this.startTime = startAt
      ? new Date(startAt * 1000).getTime()
      : new Date().getTime();

    // Ensure elapsedTime starts at 0 and will be calculated correctly in tick()
    this.elapsedTime = 0;

    this.scheduleNextTick();
  }

  private scheduleNextTick() {
    this.timerId = requestAnimationFrame(this.animate.bind(this));
  }

  private animate() {
    if (!this.paused) {
      this.tick();

      if (
        this.options.duration === undefined ||
        this.elapsedTime < this.options.duration
      ) {
        this.scheduleNextTick();
      }
    }
  }

  end() {
    this.clearTimer();

    if (this.options.onEnd) {
      this.options.onEnd({ tick: this.elapsedTime, percentage: 100 });
    }
  }

  pause() {
    this.clearTimer();
    this.paused = true;

    if (this.options.onPause) {
      this.options.onPause({ tick: this.elapsedTime, percentage: 0 });
    }
  }

  resume() {
    this.clearTimer();
    this.paused = false;
    this.startTime = new Date().getTime();
    this.start();
  }

  getCurrentTime() {
    return this.elapsedTime;
  }
}
