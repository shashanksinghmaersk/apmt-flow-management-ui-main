import type { FmpDOMRect } from '@fes/shared-types';
import type { FmpDropdownPlacement } from '../../types';

export const calculateAvailableSpace = (
  placement: FmpDropdownPlacement,
  triggerRect: FmpDOMRect,
  innerSize: { innerHeight: number | null; innerWidth: number | null },
) => {
  switch (placement) {
    case 'top':
      return { vertical: triggerRect.top, horizontal: 0 };
    case 'bottom':
      return {
        vertical: (innerSize.innerHeight || 0) - triggerRect.bottom,
        horizontal: 0,
      };
    case 'left':
      return {
        vertical:
          (innerSize.innerHeight || 0) -
          triggerRect.bottom +
          triggerRect.height,
        horizontal: triggerRect.left,
      };
    case 'right':
      return {
        vertical:
          (innerSize.innerHeight || 0) -
          triggerRect.bottom +
          triggerRect.height,
        horizontal: (innerSize.innerWidth || 0) - triggerRect.right,
      };
    default:
      return { vertical: 0, horizontal: 0 };
  }
};
