import { getBoundingClientRect } from '@fes/shared-utilities';

import type { RefObject } from 'react';

export type IsInViewProps = {
  itemRef?: RefObject<HTMLDivElement>;
  parentRef?: RefObject<HTMLDivElement>;
};

export const isInView = ({ itemRef, parentRef }: IsInViewProps) => {
  const parentRect = getBoundingClientRect(parentRef?.current);
  const itemRect = getBoundingClientRect(itemRef?.current);

  // Check if the item's left or right edge is within the parent's bounds
  const leftEdgeInView =
    itemRect.left < parentRect.right && itemRect.left > parentRect.left;
  const rightEdgeInView =
    itemRect.right > parentRect.left && itemRect.right < parentRect.right;

  // Check if the item spans across the parent
  const itemSpanningParent =
    itemRect.left <= parentRect.left && itemRect.right >= parentRect.right;

  // The item is in view if either edge is visible or if it spans the parent
  const inView = leftEdgeInView || rightEdgeInView || itemSpanningParent;

  return inView;
};
