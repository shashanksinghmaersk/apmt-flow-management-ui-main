import { getBoundingClientRect } from '@fes/shared-utilities';
import { RefObject } from 'react';
import { getLayoutValues } from '../get-layout-values/get-layout-values';

export type GetPositionValuesProps<T> = {
  containerRef?: RefObject<T>;
  primaryRef?: RefObject<T>;
};

export const getPositionValues = <T extends HTMLElement>({
  containerRef,
  primaryRef,
}: GetPositionValuesProps<T>) => {
  const containerRect = getBoundingClientRect(containerRef?.current);
  const primaryRect = getBoundingClientRect(primaryRef?.current);
  const {
    borderWidthLeft = 0,
    borderWidthRight = 0,
    paddingLeft = 0,
  } = getLayoutValues(containerRef?.current);

  const borderLeft = borderWidthLeft;
  const borderRight = borderWidthRight;
  const borderWidth = borderLeft + borderRight + 4;

  return {
    initial: containerRect.left + paddingLeft + borderWidthLeft,
    from: containerRect.width + borderWidth,
    to: (primaryRect.width + paddingLeft + borderWidth) * -1,
  };
};
