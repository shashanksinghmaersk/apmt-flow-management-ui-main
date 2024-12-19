import { CSSProperties, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import cx from 'classnames';
import { Typography } from '../typography/typography';

import type {
  ThemeAppearance,
  ThemeAppearanceVariant,
  ThemeTypographySize,
} from '@fes/shared-types';

import './fmp-count-notification.scss';
import { getAppearanceValues } from '@fes/shared-theme';

export type FmpCountNotificationProps = {
  type?: 'circle' | 'square' | 'rectangle';
  count?: number;
  className?: string;
  fit?: ThemeTypographySize;
  appearance?: ThemeAppearance;
  maxCount?: number;
  style?: CSSProperties;
  variant?: ThemeAppearanceVariant;
};

export const FmpCountNotification = ({
  type = 'circle',
  count = 0,
  maxCount = -1,
  className,
  fit,
  style = {},
  appearance = 'neutral',
  variant = 'default',
}: FmpCountNotificationProps) => {
  const [prevCount, setPrevCount] = useState(count);

  const classNames = cx(className, 'fmp-count-notification', {
    [`fmp-count-notification--${type}`]: true,
    [`fmp-count-notification--${fit}`]: true,
  });

  const { backgroundColor, onBackgroundColor } = getAppearanceValues(appearance, variant);

  const styles: CSSProperties = {
    backgroundColor: `var(${backgroundColor})`,
    color: `var(${onBackgroundColor})`,
    ...style,
  };

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? -50 : 50,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
      transition: {
        y: { type: 'spring', stiffness: 300, damping: 25 },
        opacity: { duration: 0.35 },
      },
    },
    exit: (direction: number) => ({
      y: direction < 0 ? -50 : 50,
      opacity: 0,
      transition: {
        y: { type: 'spring', stiffness: 300, damping: 25 },
        opacity: { duration: 0.35 },
      },
    }),
  };

  const custom = count > prevCount ? 1 : -1;

  useEffect(() => {
    if (prevCount !== count) {
      setPrevCount(count);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, setPrevCount]);

  return (
    <div className={classNames} style={styles}>
      <AnimatePresence initial={false} custom={custom}>
        <motion.div
          key={count}
          custom={custom}
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
          className="fmp-count-notification__counter"
        >
          <Typography
            className="fmp-count-notification__counter-text"
            type="text"
            weight="bold"
          >
            {count >= maxCount ? (maxCount === -1 ? count : 'All') : count}
          </Typography>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
