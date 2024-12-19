import { calculateAvailableSpace } from '../calculate-available-space/calculate-available-space';

import type { FmpDropdownPlacement } from '../../types';
import type { FmpDOMRect } from '@fes/shared-types';

export type CalculateModalPositionProps = {
  placement: FmpDropdownPlacement;
  triggerRect: FmpDOMRect;
  dropdownRect: FmpDOMRect;
  windowSize: { innerHeight: number | null; innerWidth: number | null };
  minHeightRequired: number;
  flipPosition: FmpDropdownPlacement[];
};

export const calculateModalPosition = ({
  placement,
  triggerRect,
  windowSize,
  minHeightRequired,
  dropdownRect,
  flipPosition,
}: CalculateModalPositionProps) => {
  const { innerHeight, innerWidth } = windowSize;
  let calculatedPosition = placement;

  const availableSpace = calculateAvailableSpace(placement, triggerRect, {
    innerHeight,
    innerWidth,
  });

  switch (placement) {
    case 'top':
      if (availableSpace.vertical < minHeightRequired) {
        flipPosition.some((item) => {
          let found = false;

          const itemAvailableSpace = calculateAvailableSpace(
            item,
            triggerRect,
            {
              innerHeight,
              innerWidth,
            },
          );

          if (
            item === 'bottom' &&
            itemAvailableSpace.vertical > minHeightRequired
          ) {
            found = true;
            calculatedPosition = 'bottom';
          } else if (
            (item === 'left' || item === 'right') &&
            itemAvailableSpace.horizontal > dropdownRect.width
          ) {
            found = true;
            calculatedPosition = item;
          }

          return found;
        });
      }

      break;
    case 'bottom':
      if (availableSpace.vertical < minHeightRequired) {
        flipPosition.some((item) => {
          let found = false;

          const itemAvailableSpace = calculateAvailableSpace(
            item,
            triggerRect,
            {
              innerHeight,
              innerWidth,
            },
          );

          if (
            item === 'top' &&
            itemAvailableSpace.vertical > minHeightRequired
          ) {
            found = true;
            calculatedPosition = 'top';
          } else if (
            (item === 'left' || item === 'right') &&
            itemAvailableSpace.horizontal > dropdownRect.width
          ) {
            found = true;
            calculatedPosition = item;
          }

          return found;
        });
      }

      break;
    case 'left':
      if (availableSpace.horizontal < dropdownRect.width) {
        flipPosition.some((item) => {
          let found = false;

          const itemAvailableSpace = calculateAvailableSpace(
            item,
            triggerRect,
            {
              innerHeight,
              innerWidth,
            },
          );

          if (
            item === 'right' &&
            itemAvailableSpace.horizontal > dropdownRect.width
          ) {
            found = true;
            calculatedPosition = 'right';
          } else if (
            (item === 'top' || item === 'bottom') &&
            itemAvailableSpace.vertical > minHeightRequired
          ) {
            found = true;
            calculatedPosition = item;
          }

          return found;
        });
      }

      break;
    case 'right':
      if (availableSpace.horizontal < dropdownRect.width) {
        flipPosition.some((item) => {
          let found = false;

          const itemAvailableSpace = calculateAvailableSpace(
            item,
            triggerRect,
            {
              innerHeight,
              innerWidth,
            },
          );

          if (
            item === 'left' &&
            itemAvailableSpace.horizontal > dropdownRect.width
          ) {
            found = true;
            calculatedPosition = 'left';
          } else if (
            (item === 'top' || item === 'bottom') &&
            itemAvailableSpace.vertical > minHeightRequired
          ) {
            found = true;
            calculatedPosition = item;
          }

          return found;
        });
      }

      break;
    default:
      break;
  }

  return calculatedPosition;
};
