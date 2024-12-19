import { getBoundingClientRect } from '@fes/shared-utilities';
import cx from 'classnames';
import { deepmerge } from 'deepmerge-ts';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Typography } from '../typography/typography';
import { getLayoutValues } from './utilities/get-layout-values/get-layout-values';
import { handleAnimationIteration } from './utilities/handle-animation-iteration/handle-animation-iteration';
import { handleInitializeValues } from './utilities/handle-initialize-values/handle-initialize-values';
import { handleTriggerPosition } from './utilities/handle-trigger-position/handle-trigger-position';
import { isInView } from './utilities/is-in-view/is-in-view';

import type { CSSProperties, HTMLAttributes } from 'react';
import type { TypographyProps } from '../typography/typography';
import type {
  FmpTelepromptAnimationState,
  FmpTelepromptItemType,
} from './utilities/types';

import './fmp-teleprompt.scss';
import { createRootVariables } from './utilities/create-root-variables/create-root-variables';

export type FmpTelepromptProps = {
  startPosition?: 'start' | 'end';
  type?: 'hover' | 'auto';
  text?: string;
  speed?: number; // 0 to 1
  reverse?: boolean;
  loopBuffer?: number; // 0 to 100
  speedModifier?: number;
  typographyProps?: TypographyProps;
} & HTMLAttributes<HTMLDivElement>;

export const FmpTeleprompt = ({
  type = 'hover',
  startPosition = 'start',
  className,
  text,
  speed = 0.5,
  reverse = false,
  loopBuffer = 70,
  style = {},
  speedModifier = 3,
  typographyProps: _typographyProps = {},
  ...rest
}: FmpTelepromptProps) => {
  const previousPreventScroll = useRef(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const intervalRef = useRef<any>();
  const hoverRef = useRef(false);
  const swapIterationRef = useRef<FmpTelepromptItemType>();

  const containerRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);

  const containerRect = getBoundingClientRect(containerRef.current);
  const primaryRect = getBoundingClientRect(primaryRef.current);

  const { style: typographyStyle, ...typographyProps } = _typographyProps;

  const [animationState, setAnimationState] = useState<FmpTelepromptAnimationState>({
    preventScroll: true,
    primaryStyles: {
      animationDelay: '0s',
      animationDuration: '0s',
      animationPlayState: type === 'auto' ? 'running' : 'paused',
      animationName: 'fmp-teleprompt',
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
      animationDirection: reverse ? 'reverse' : 'normal',
    },
    secondaryStyles: {
      animationDelay: '0s',
      animationDuration: '0s',
      animationPlayState: 'paused',
      animationName: 'fmp-teleprompt',
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
      animationDirection: reverse ? 'reverse' : 'normal',
    },
  });

  const updateAnimationState = useCallback(
    (
      values: Partial<FmpTelepromptAnimationState>,
      preventAnimationFrameRequest?: boolean,
    ) => {
      if (preventAnimationFrameRequest) {
        previousPreventScroll.current = animationState.preventScroll;
        setAnimationState((_current) => deepmerge(_current, values));
      } else {
        requestAnimationFrame(() => {
          previousPreventScroll.current = animationState.preventScroll;
          setAnimationState((_current) => deepmerge(_current, values));
        });
      }
    },
    [animationState],
  );

  const pauseAnimations = useCallback(() => {
    updateAnimationState({
      primaryStyles: { animationPlayState: 'paused' },
      secondaryStyles: { animationPlayState: 'paused' },
    });
  }, [updateAnimationState]);

  const unpauseAnimations = useCallback(() => {
    requestAnimationFrame(() => {
      const primaryIsInView = isInView({ itemRef: primaryRef, parentRef: containerRef });
      const secondaryIsInView = isInView({
        itemRef: secondaryRef,
        parentRef: containerRef,
      });

      const newPrimaryStyles: CSSProperties = {};
      const newSecondaryStyles: CSSProperties = {};

      if (primaryIsInView && !animationState.preventScroll) {
        newPrimaryStyles.animationPlayState = 'running';
      }

      if (secondaryIsInView && !animationState.preventScroll) {
        newSecondaryStyles.animationPlayState = 'running';
      }

      updateAnimationState(
        { primaryStyles: newPrimaryStyles, secondaryStyles: newSecondaryStyles },
        true,
      );
    });
  }, [animationState.preventScroll, updateAnimationState]);

  const handleMouseEnter = useCallback(() => {
    if (!hoverRef.current && type === 'auto') {
      pauseAnimations();
      hoverRef.current = true;
    } else if (!hoverRef.current && type === 'hover') {
      unpauseAnimations();
      hoverRef.current = true;
    }
  }, [pauseAnimations, type, unpauseAnimations]);

  const handleMouseLeave = useCallback(() => {
    if (hoverRef.current && type === 'auto') {
      unpauseAnimations();
      hoverRef.current = false;
    } else if (hoverRef.current && type === 'hover') {
      pauseAnimations();
      hoverRef.current = false;
    }
  }, [pauseAnimations, type, unpauseAnimations]);

  const syncAnimationValues = useCallback(() => {
    createRootVariables({
      containerRef,
      primaryRef,
    });

    requestAnimationFrame(() => {
      const animationStateValues = handleInitializeValues({
        containerRef,
        primaryRef,
        speed,
        speedModifier,
        startPosition,
      });

      updateAnimationState(animationStateValues);
    });

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (!animationState.preventScroll) {
        handleTriggerPosition({
          animationState,
          containerRef,
          loopBuffer,
          primaryRef,
          reverse,
          secondaryRef,
          swapIterationRef,
          updateAnimationState,
        });
      }
    }, 50);
  }, [
    animationState,
    loopBuffer,
    reverse,
    speed,
    speedModifier,
    startPosition,
    updateAnimationState,
  ]);

  useEffect(() => {
    syncAnimationValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRect.width, primaryRect.width, speed, text, speedModifier, reverse, type]);

  // Attach event handlers for animation iterations
  useEffect(() => {
    const primaryEl = primaryRef.current;
    const secondaryEl = secondaryRef.current;

    if (primaryEl) {
      primaryEl.addEventListener('animationiteration', (event) =>
        handleAnimationIteration({
          event: event as AnimationEvent,
          type: 'primary',
          updateAnimationState,
        }),
      );
    }

    if (secondaryEl) {
      secondaryEl.addEventListener('animationiteration', (event) =>
        handleAnimationIteration({
          event: event as AnimationEvent,
          type: 'secondary',
          updateAnimationState,
        }),
      );
    }

    return () => {
      if (primaryEl) {
        primaryEl.removeEventListener('animationiteration', (event) =>
          handleAnimationIteration({
            event: event as AnimationEvent,
            type: 'primary',
            updateAnimationState,
          }),
        );
      }

      if (secondaryEl) {
        secondaryEl.removeEventListener('animationiteration', (event) =>
          handleAnimationIteration({
            event: event as AnimationEvent,
            type: 'secondary',
            updateAnimationState,
          }),
        );
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderValues = useMemo(() => {
    const layoutValues = getLayoutValues(containerRef.current);

    const values = {
      classNames: cx('fmp-teleprompt', className),
      rootStyle: {
        ...style,
        minHeight: primaryRect.height,
      },
      innerStyle: {
        height: primaryRect.height,
        width: containerRect.width,
        marginLeft: layoutValues.paddingLeft * -1,
        marginRight: layoutValues.paddingRight * -1,
      },
    };

    return values as {
      classNames: string;
      rootStyle: CSSProperties;
      innerStyle: CSSProperties;
    };
  }, [className, containerRect.width, primaryRect.height, style]);

  return (
    <div
      key={`${text}-root`}
      ref={containerRef}
      className={renderValues.classNames}
      style={renderValues.rootStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      <div className="fmp-teleprompt__inner" style={renderValues.innerStyle}>
        <div
          key={`${text}-primary`}
          ref={primaryRef}
          className="fmp-teleprompt__text"
          style={animationState.primaryStyles}
        >
          <Typography
            style={{ ...typographyStyle, whiteSpace: 'nowrap' }}
            {...typographyProps}
          >
            {text}
          </Typography>
        </div>
        <div
          key={`${text}-secondary`}
          ref={secondaryRef}
          className="fmp-teleprompt__text"
          style={animationState.secondaryStyles}
        >
          <Typography
            style={{ ...typographyStyle, whiteSpace: 'nowrap' }}
            {...typographyProps}
          >
            {text}
          </Typography>
        </div>
      </div>
    </div>
  );
};
