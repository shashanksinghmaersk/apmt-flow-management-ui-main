import { getBoundingClientRect } from '@fes/shared-utilities';
import { RefObject } from 'react';
import { calculateDuration } from '../calculate-duration/calculate-duration';
import { FmpTelepromptAnimationState, FmpTelepromptStartPosition } from '../types';

export type HandleAnimationInitProps = {
  containerRef: RefObject<HTMLDivElement>;
  primaryRef: RefObject<HTMLDivElement>;
  speed?: number;
  speedModifier?: number;
  startPosition?: FmpTelepromptStartPosition;
};

export const handleInitializeValues = ({
  containerRef,
  primaryRef,
  speed,
  speedModifier,
  startPosition,
}: HandleAnimationInitProps) => {
  const containerRect = getBoundingClientRect(containerRef.current);
  const primaryRect = getBoundingClientRect(primaryRef.current);

  const newAnimationState: Partial<FmpTelepromptAnimationState> = {};

  if (primaryRect.width && containerRect.width) {
    const preventScroll = primaryRect.width < containerRect.width;

    newAnimationState.preventScroll = preventScroll;

    const { duration, primaryStartPositionDelay, secondaryStartPositionDelay } =
      calculateDuration({
        primaryRef,
        containerRef,
        speed,
        speedModifier,
        startPosition,
      });

    newAnimationState.primaryStyles = {
      animationDuration: `${duration}s`,
      animationDelay: `${primaryStartPositionDelay}s`,
    };
    newAnimationState.secondaryStyles = {
      animationDuration: `${duration}s`,
      animationDelay: `${secondaryStartPositionDelay}s`,
    };
  }

  return newAnimationState;
};
