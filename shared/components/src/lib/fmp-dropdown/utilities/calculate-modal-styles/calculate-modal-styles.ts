import type { CSSProperties } from 'react';
import type { FmpDropdownPlacement } from '../../types';
import type { FmpDOMRect } from '@fes/shared-types';

export const calculateModalStyles = (
  placement: FmpDropdownPlacement,
  height: number,
  spacing: number,
  rect: FmpDOMRect,
  innerSize: { innerHeight: number | null; innerWidth: number | null },
): CSSProperties => {
  const styles: CSSProperties = {};
  switch (placement) {
    case 'top':
      styles.bottom = (innerSize.innerHeight || 0) - rect.top + spacing;
      styles.height = `${height}px`;
      styles.left = rect.left;
      break;
    case 'bottom':
      styles.top = rect.bottom + spacing;
      styles.height = `${height}px`;
      styles.left = rect.left;
      break;
    case 'left':
      styles.right = (innerSize.innerWidth || 0) - rect.left + spacing;
      styles.maxHeight = `${height}px`;
      styles.top = rect.top;
      styles.height = `${height}px`; // Ensure height is set
      break;
    case 'right':
      styles.left = rect.right + spacing;
      styles.maxHeight = `${height}px`;
      styles.top = rect.top;
      styles.height = `${height}px`; // Ensure height is set
      break;
    default:
      break;
  }
  return styles;
};
