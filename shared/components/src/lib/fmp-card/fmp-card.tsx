import { getAppearanceValues } from '@fes/shared-theme';
import cx from 'classnames';
import { motion } from 'framer-motion';
import { FmpCardHeader } from './components/fmp-card-header/fmp-card-header';

import type { ThemeAppearance, ThemeFit } from '@fes/shared-types';
import type { HTMLMotionProps, MotionStyle } from 'framer-motion';
import type { ReactNode } from 'react';

import './fmp-card.scss';

export type FmpCardProps = {
  appearance?: ThemeAppearance | 'none';
  elevation?: 0 | 1 | 2;
  fit?: ThemeFit;
  title?: string;
  subtitle?: string;
  HeaderAction?: ReactNode;
  HeaderUtility?: ReactNode;
  children?: ReactNode;
  icon?: string;
  noPadding?: boolean;
  borderTopStyle?: 'normal' | 'thick';
  borderBottomStyle?: 'normal' | 'thick';
} & HTMLMotionProps<'div'>;

export const FmpCard = ({
  appearance = 'none',
  className,
  elevation = 1,
  fit = 'medium',
  style: _style = {},
  children,
  subtitle,
  title,
  HeaderAction,
  HeaderUtility,
  icon,
  noPadding,
  borderTopStyle = 'normal',
  borderBottomStyle = 'normal',
  ...rest
}: FmpCardProps) => {
  let style: MotionStyle = {
    ..._style,
    borderTopWidth: borderTopStyle === 'normal' ? 1 : 5,
    borderBottomWidth: borderBottomStyle === 'normal' ? 1 : 5,
  };

  let borderBackgroundColor: string | undefined;

  const allowAppereance =
    appearance !== 'neutral' && appearance !== 'neutral-inverse' && appearance !== 'none';

  if (appearance && allowAppereance) {
    const { backgroundColor } = getAppearanceValues(appearance, 'default');
    borderBackgroundColor = backgroundColor;
  }

  if (borderTopStyle === 'thick' && borderBackgroundColor) {
    style = {
      ...style,
      borderTop: `5px solid var(${borderBackgroundColor})`,
    };
  }

  if (borderBottomStyle === 'thick' && borderBackgroundColor) {
    style = {
      ...style,
      borderBottom: `5px solid var(${borderBackgroundColor})`,
    };
  }

  const classNames = cx(className, 'fmp-card', {
    [`fmp-card--${fit}`]: !!fit,
    'fmp-card--no-padding': !!noPadding,
    [`fmp-card-elevation--${elevation}`]: true,
  });

  return (
    <motion.div className={classNames} style={style} {...rest}>
      {(title || subtitle || HeaderAction || icon || HeaderUtility) && (
        <FmpCardHeader
          title={title}
          subtitle={subtitle}
          icon={icon}
          UtilityArea={HeaderUtility}
          fit={fit}
        >
          {HeaderAction}
        </FmpCardHeader>
      )}
      {children}
    </motion.div>
  );
};
