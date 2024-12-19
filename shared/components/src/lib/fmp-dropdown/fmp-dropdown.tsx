import { useBoundingClientRect } from '@fes/shared-hooks';
import cx from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useWindowSize } from 'rooks';
import { useEventListener } from 'usehooks-ts';
import { calculateAvailableSpace } from './utilities/calculate-available-space/calculate-available-space';
import { calculateModalPosition } from './utilities/calculate-modal-position/calculate-modal-position';
import { calculateModalStyles } from './utilities/calculate-modal-styles/calculate-modal-styles';

import type { CSSProperties, ReactNode } from 'react';
import type { FmpDropdownPlacement } from './types';

import './fmp-dropdown.scss';

export type FmpDropdownProps = {
  trigger: ReactNode;
  children?: ReactNode;
  triggerClassName?: string;
  dropdownClassName?: string;
  dropdownInnerClassName?: string;
  closeOnOutsideClick?: boolean;
  elevation?: 0 | 1 | 2;
  minHeightRequired?: number;
  open?: boolean;
  spacing?: number;
  placement?: FmpDropdownPlacement;
  flipPosition?: FmpDropdownPlacement[];
  onClose?: () => void;
  onOpen?: () => void;
};

const placementMap: Record<FmpDropdownPlacement, FmpDropdownPlacement[]> = {
  top: ['bottom', 'right', 'left'],
  bottom: ['top', 'right', 'left'],
  left: ['right', 'bottom', 'top'],
  right: ['left', 'bottom', 'top'],
};

export const FmpDropdown = ({
  children,
  triggerClassName: _triggerClassName,
  dropdownClassName: _dropdownClassName,
  dropdownInnerClassName: _dropdownInnerClassName,
  minHeightRequired: _minHeightRequired = 200,
  closeOnOutsideClick = true,
  flipPosition: _flipPosition,
  elevation = 2,
  open: _open,
  placement: _placement = 'bottom',
  spacing = 8,
  trigger,
  onClose,
  onOpen,
}: FmpDropdownProps) => {
  const [open, setOpen] = useState(_open);
  const [dropdownStyles, setDropdownStyles] = useState<CSSProperties>({});

  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownInnerRef = useRef<HTMLDivElement>(null);

  const { innerHeight, innerWidth } = useWindowSize();

  const triggerClassName = cx('fmp-dropdown-trigger', _triggerClassName);
  const modalClassName = cx('fmp-dropdown-modal', _dropdownClassName, {
    [`fmp-dropdown-modal--elevation-${elevation}`]: true,
  });

  const dropdownInnerClassName = cx(
    'fmp-dropdown-dropdown__inner',
    _dropdownInnerClassName,
  );
  const minHeightRequired = _minHeightRequired;
  const flipPosition = _flipPosition || placementMap[_placement];

  const triggerRect = useBoundingClientRect(triggerRef.current);
  const dropdownRect = useBoundingClientRect(dropdownRef.current);
  const dropdownInnerRect = useBoundingClientRect(dropdownInnerRef.current);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTriggerClick = useCallback((e: any) => {
    e.stopPropagation();
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (
        closeOnOutsideClick &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    },
    [closeOnOutsideClick],
  );

  const calculateModalHeight = useCallback(
    (placement: FmpDropdownPlacement) => {
      const innerModalHeight = dropdownInnerRect.height || 0;
      const availableHeight = calculateAvailableSpace(placement, triggerRect, {
        innerHeight,
        innerWidth,
      });

      const modalHeightLargerThanAvailable =
        innerModalHeight > availableHeight.vertical;

      return modalHeightLargerThanAvailable
        ? availableHeight.vertical - spacing * 2
        : innerModalHeight + 2;
    },
    [dropdownInnerRect.height, triggerRect, innerHeight, innerWidth, spacing],
  );

  const syncModal = useCallback(() => {
    const placement = calculateModalPosition({
      placement: _placement,
      windowSize: { innerHeight, innerWidth },
      dropdownRect,
      flipPosition,
      minHeightRequired,
      triggerRect,
    });

    const height = calculateModalHeight(placement);

    const styles = calculateModalStyles(
      placement,
      height,
      spacing,
      triggerRect,
      { innerHeight, innerWidth },
    );

    setDropdownStyles(styles);
  }, [
    _placement,
    innerHeight,
    innerWidth,
    dropdownRect,
    flipPosition,
    minHeightRequired,
    triggerRect,
    calculateModalHeight,
    spacing,
  ]);

  useEffect(() => {
    syncModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerRect, dropdownInnerRect]);

  useEffect(() => {
    if (_open !== open) {
      setOpen(_open);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_open]);

  useEffect(() => {
    if (open) {
      syncModal();
      onOpen?.();
    } else {
      onClose?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEventListener('mousedown', handleOutsideClick);

  return (
    <>
      <div
        className={triggerClassName}
        ref={triggerRef}
        onClick={handleTriggerClick}
      >
        {trigger}
      </div>
      {ReactDOM.createPortal(
        <div
          ref={dropdownRef}
          className={modalClassName}
          style={{
            ...dropdownStyles,
            display: open ? 'block' : 'none',
          }}
        >
          <div ref={dropdownInnerRef} className={dropdownInnerClassName}>
            {children}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};
