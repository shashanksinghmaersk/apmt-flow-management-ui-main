import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Timer,
  TimerCallbackInfo,
  TimerOptions,
} from './utilities/timer/timer';
import {
  TimerMeta,
  calculateMeta,
} from './utilities/calculate-meta/calculate-meta';

export type UseTimeoutProps = TimerOptions;

export type UseTimeoutMeta = TimerMeta;

export const useTimer = (options: TimerOptions = {}) => {
  const initialMeta = calculateMeta({ tick: 0, percentage: 0 }, options);
  const [meta, setMeta] = useState<TimerMeta>(initialMeta);

  const timerRef = useRef<Timer | null>(null);

  const handleTick = useCallback(
    (info: TimerCallbackInfo) => {
      const newMeta = calculateMeta(info, options);
      setMeta(newMeta);
    },
    [options, setMeta],
  );

  useEffect(() => {
    timerRef.current = new Timer({ ...options, onTick: handleTick });

    return () => {
      timerRef.current?.end();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const timerStart = (startAt?: number) => {
    timerRef.current?.start(undefined, startAt || options.startAt);
  };

  const timerRestart = (duration?: number, startAt?: number) => {
    timerRef.current?.start(duration, startAt || options.startAt);
  };

  const timerResume = () => {
    timerRef.current?.resume();
  };

  const timerPause = () => {
    timerRef.current?.pause();
  };

  const timerEnd = () => {
    timerRef.current?.end();
  };

  return {
    timerResume,
    timerStart,
    timerRestart,
    timerPause,
    timerEnd,
    elapsed: meta.elapsed * 1000,
    meta,
  };
};
