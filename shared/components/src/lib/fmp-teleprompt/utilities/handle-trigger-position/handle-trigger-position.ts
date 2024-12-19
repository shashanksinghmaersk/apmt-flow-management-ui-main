import { getBoundingClientRect } from '@fes/shared-utilities';
import deepEqual from 'deep-equal';

import type { MutableRefObject, RefObject } from 'react';
import type { FmpTelepromptAnimationState, FmpTelepromptItemType } from '../types';

export type HandleTriggerPositionProps = {
  containerRef: RefObject<HTMLDivElement>;
  primaryRef: RefObject<HTMLDivElement>;
  reverse: boolean;
  secondaryRef: RefObject<HTMLDivElement>;
  loopBuffer: number;
  animationState: FmpTelepromptAnimationState;
  swapIterationRef: MutableRefObject<FmpTelepromptItemType>;
  updateAnimationState: (
    value: Partial<FmpTelepromptAnimationState>,
    preventRequestAnimation?: boolean,
  ) => void;
};

export const handleTriggerPosition = ({
  containerRef,
  primaryRef,
  reverse,
  secondaryRef,
  loopBuffer,
  swapIterationRef,
  animationState,
  updateAnimationState,
}: HandleTriggerPositionProps) => {
  const containerRect = getBoundingClientRect(containerRef.current);
  const primaryRect = getBoundingClientRect(primaryRef?.current);
  const secondaryRect = getBoundingClientRect(secondaryRef?.current);

  const loopTriggerPosition = !reverse
    ? !loopBuffer
      ? containerRect.left
      : containerRect.left + containerRect.width / (100 / loopBuffer)
    : !loopBuffer
      ? containerRect.right
      : containerRect.right - containerRect.width / (100 / loopBuffer);

  let triggerType: 'primary' | 'secondary' =
    primaryRect.left < secondaryRect.left ? 'primary' : 'secondary';
  let triggerRect = primaryRect.left < secondaryRect.left ? primaryRect : secondaryRect;

  if (reverse) {
    triggerType = primaryRect.right > secondaryRect.right ? 'primary' : 'secondary';
    triggerRect = primaryRect.right > secondaryRect.right ? primaryRect : secondaryRect;
  }

  const isTriggerPoint = !reverse
    ? triggerRect.right <= loopTriggerPosition
    : triggerRect.left >= loopTriggerPosition;

  const oppositeType = triggerType === 'primary' ? 'secondary' : 'primary';

  if (isTriggerPoint && triggerType !== swapIterationRef.current) {
    const newAnimationState = {
      [`${oppositeType}Styles`]: { animationPlayState: 'running' },
    };

    if (!deepEqual(animationState, newAnimationState)) {
      swapIterationRef.current = triggerType;
      updateAnimationState(newAnimationState);
    }
  }
};
