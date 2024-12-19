import type { CSSProperties } from 'react';

export type FmpTelepromptAnimationState = {
  preventScroll: boolean;
  primaryStyles: CSSProperties;
  secondaryStyles: CSSProperties;
};

export type FmpTelepromptAnimationStateUpdateFn = (
  values: Partial<FmpTelepromptAnimationState>,
  preventAnimationFrameRequest?: boolean,
) => void;

export type FmpTelepromptItemType = 'primary' | 'secondary' | undefined;

export type FmpTelepromptStartPosition = 'start' | 'end';
