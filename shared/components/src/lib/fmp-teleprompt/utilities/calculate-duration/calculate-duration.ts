import { getBoundingClientRect } from '@fes/shared-utilities';
import { getPositionValues } from '../get-position-values/get-position-values';

import type { RefObject } from 'react';
import type { FmpTelepromptStartPosition } from '../types';
import { getLayoutValues } from '../get-layout-values/get-layout-values';

export type CalculateDurationProps = {
  containerRef?: RefObject<HTMLDivElement>;
  primaryRef?: RefObject<HTMLDivElement>;
  speed?: number;
  speedModifier?: number;
  startPosition?: FmpTelepromptStartPosition;
};

export const calculateDuration = ({
  containerRef,
  primaryRef,
  speed = 0,
  speedModifier = 0,
  startPosition = 'start',
}: CalculateDurationProps) => {
  let duration = 0;
  let primaryStartPositionDelay = 0;
  let secondaryStartPositionDelay = 0;

  if (!speed) {
    return { duration, primaryStartPositionDelay, secondaryStartPositionDelay };
  }

  if (!speedModifier) {
    return { duration, primaryStartPositionDelay, secondaryStartPositionDelay };
  }

  const { from, to } = getPositionValues({ containerRef, primaryRef });
  const containerRect = getBoundingClientRect(containerRef?.current);
  const primaryRect = getBoundingClientRect(primaryRef?.current);
  const { paddingLeft } = getLayoutValues(containerRef?.current);

  duration =
    ((primaryRect.width + containerRect.width) / containerRect.width) *
    (speedModifier / speed);

  const fullDistance = from - to;
  const distanceToFinal = Math.abs(from - paddingLeft);

  const timeRequired = (distanceToFinal / fullDistance) * duration;

  primaryStartPositionDelay = startPosition === 'start' ? timeRequired * -1 : 0;
  secondaryStartPositionDelay = 0;

  return { duration, primaryStartPositionDelay, secondaryStartPositionDelay };
};
