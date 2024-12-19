import type {
  FmpTelepromptAnimationState,
  FmpTelepromptAnimationStateUpdateFn,
  FmpTelepromptItemType,
} from '../types';

export type HandleAnimationIterationProps = {
  event?: AnimationEvent;
  type?: FmpTelepromptItemType;
  updateAnimationState?: FmpTelepromptAnimationStateUpdateFn;
};

export const handleAnimationIteration = ({
  event,
  type,
  updateAnimationState,
}: HandleAnimationIterationProps) => {
  const animationName = event?.animationName;
  const isTargetAnimation = animationName === 'fmp-teleprompt';

  if (isTargetAnimation) {
    const enterType = type === 'primary' ? 'secondary' : 'primary';
    const enterStateStylesProp =
      enterType === 'primary' ? 'primaryStyles' : 'secondaryStyles';
    const exitStateStylesProp = type === 'primary' ? 'primaryStyles' : 'secondaryStyles';

    const newAnimationState: Partial<FmpTelepromptAnimationState> = {
      [exitStateStylesProp]: { animationPlayState: 'paused' },
      [enterStateStylesProp]: { animationPlayState: 'running' },
    };

    updateAnimationState?.(newAnimationState);
  }
};
