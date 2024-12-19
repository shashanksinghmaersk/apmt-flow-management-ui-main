import { createKeyframes } from '../create-key-frames/create-key-frames';
import { getPositionValues } from '../get-position-values/get-position-values';

import type { RefObject } from 'react';

export type CreateRootVariablesProps = {
  containerRef?: RefObject<HTMLDivElement>;
  primaryRef?: RefObject<HTMLDivElement>;
};

export const createRootVariables = ({
  containerRef,
  primaryRef,
}: CreateRootVariablesProps) => {
  const { from, to } = getPositionValues({ containerRef, primaryRef });

  const styleSheet = document.styleSheets[0];
  let keyframes: string[] = [];

  // Define keyframes
  keyframes = [
    createKeyframes({
      name: 'fmp-teleprompt',
      from: `${from}px`,
      to: `${to}px`,
    }),
  ];

  // Remove existing keyframes if any
  for (let i = styleSheet.cssRules.length - 1; i >= 0; i--) {
    const rule = styleSheet.cssRules[i];
    if (rule.KEYFRAMES_RULE && rule.cssText.includes('fmp-teleprompt')) {
      styleSheet.deleteRule(i);
    }
  }

  keyframes.forEach((keyframe) => {
    styleSheet.insertRule(keyframe, styleSheet.cssRules.length);
  });
};
