import { useBoundingClientRect } from '@fes/shared-hooks';
import { McIcon } from '@maersk-global/mds-react-wrapper';
import cx from 'classnames';
import { HTMLMotionProps, motion, useDragControls } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';
import { FmpCard } from '../fmp-card';
import { Typography } from '../typography/typography';

import type { ThemeFit } from '@fes/shared-types';
import type { ReactNode } from 'react';

import './fmp-window.scss';

export type FmpWindowProps = {
  icon?: string;
  className?: string;
  title?: string;
  src?: string;
  children?: ReactNode;
  width?: number;
  height?: number;
  fit?: ThemeFit;
  scale?: number; // 0 -> 1
  onMinimizeClick?: () => void;
  onCloseClick?: () => void;
} & HTMLMotionProps<'div'>;

let highestZIndex = 9999;

export const FmpWindow = ({
  icon,
  className,
  children,
  src,
  title,
  scale: _scale = 1,
  width: _width = 0,
  height: _height = 0,
  style = {},
  onClick,
  onCloseClick,
  onMinimizeClick,
  ...rest
}: FmpWindowProps) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [zIndex, setZIndex] = useState(highestZIndex);
  const dragControls = useDragControls();
  const { width, height } = useBoundingClientRect(frameRef.current);
  const scale = _scale > 1 ? 1 : _scale < 0 ? 0 : _scale;

  const classNames = cx('fmp-window', className, {});

  const handleFrameClick = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => {
      e.stopPropagation();

      highestZIndex += 1;

      setZIndex(highestZIndex);
      onClick?.(e);
    },
    [onClick],
  );

  const handleDragStart = useCallback(() => {
    highestZIndex += 1;
    setZIndex(highestZIndex);
  }, []);

  return (
    <motion.div
      drag
      dragControls={dragControls}
      ref={frameRef}
      className={classNames}
      onClick={handleFrameClick}
      onDragStart={handleDragStart}
      style={{ zIndex, ...style }}
      dragElastic={0}
      dragTransition={{ power: 0 }}
      dragConstraints={{
        top: 0,
        left: 0,
        right: window.innerWidth - width,
        bottom: window.innerHeight - height,
      }}
      {...rest}
    >
      <FmpCard
        elevation={2}
        className="fmp-window__card"
        noPadding
        style={{ overflow: 'hidden' }}
      >
        <div className="fmp-window__header">
          <div className="fmp-window__header-title">
            {icon && (
              <McIcon className="fmp-window__header-title-icon" icon={icon} />
            )}
            <Typography weight="bold">{title}</Typography>
          </div>
          <div className="fmp-window__header-action">
            {onMinimizeClick && (
              <div
                className="fmp-window__header-action-button"
                onClick={onMinimizeClick}
              >
                <McIcon size="16" icon="caret-down-solid" />
              </div>
            )}
            {onCloseClick && (
              <div
                className="fmp-window__header-action-button"
                onClick={onCloseClick}
              >
                <McIcon size="16" icon="times" />
              </div>
            )}
          </div>
        </div>
        {src && (
          <div style={{ width: _width * scale, height: _height * scale }}>
            <iframe
              className="fmp-window__iframe"
              width={_width}
              height={_height}
              title={title}
              src={src}
              style={{
                transform: `scale(${scale})`,
                transformOrigin: '0 0',
                top: 0,
                left: 0,
                border: 'none',
              }}
            />
          </div>
        )}
        {!src && children && (
          <div className="fmp-window__content">{children}</div>
        )}
      </FmpCard>
    </motion.div>
  );
};
