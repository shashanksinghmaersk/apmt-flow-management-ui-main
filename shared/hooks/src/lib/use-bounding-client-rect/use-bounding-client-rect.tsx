import { useEffect, useState, useCallback } from 'react';
import { getBoundingClientRect } from '@fes/shared-utilities';
import { FmpDOMRect } from '@fes/shared-types';

export function useBoundingClientRect<T extends HTMLElement>(
  element: T | null,
) {
  const [rect, setRect] = useState<FmpDOMRect>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
  });

  const updateRect = useCallback(() => {
    if (element) {
      const newRect = getBoundingClientRect(element);
      setRect(() => newRect);
    }
  }, [element]);

  useEffect(() => {
    if (!element) {
      return;
    }

    updateRect();

    const resizeObserver = new ResizeObserver(updateRect);
    resizeObserver.observe(element);

    window.addEventListener('scroll', updateRect);
    window.addEventListener('appMainScroll', updateRect);
    window.addEventListener('resize', updateRect);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', updateRect);
      window.removeEventListener('appMainScroll', updateRect);
      window.removeEventListener('resize', updateRect);
    };
  }, [element, updateRect]);

  return rect;
}
