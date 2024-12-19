import cx from 'classnames';

import type { CSSProperties, ReactNode } from 'react';
import type {
  ThemeAppearance,
  ThemeAppearanceVariant,
} from '@fes/shared-types';

import './fmp-progressbar.scss';

export type FmpProgressbarProps = {
  type: ThemeAppearance;
  variation?: ThemeAppearanceVariant;
  parentVariation?: ThemeAppearanceVariant;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
  percentage?: number;
  height?: number;
  gap?: number;
};

export const FmpProgressbar = ({
  type,
  className,
  children,
  style = {},
  parentVariation = 'subtle',
  percentage = 0,
  height = 4,
  gap = 3,
  ...rest
}: FmpProgressbarProps) => {
  const classNames = cx('fmp-progressbar', className);

  const gridEffect = `repeating-linear-gradient(
    to right,
    transparent,
    transparent ${height}px,
    var(--mds_brand_appearance_neutral_default_background-color) ${height}px,
    var(--mds_brand_appearance_neutral_default_background-color) ${height + gap}px
  )`;

  const backgroundStyles: CSSProperties = {
    backgroundColor: `var(--mds_brand_appearance_neutral_default_border-color)`,
    backgroundImage: gridEffect,
    ...style,
  };

  const barColor = `var(--mds_brand_appearance_${type}_default_background-color)`;

  const barStyles: CSSProperties = {
    backgroundColor: barColor,
    backgroundImage: gridEffect,
  };

  return (
    <div
      className={classNames}
      style={{ height, ...backgroundStyles }}
      {...rest}
    >
      <div
        className="fmp-progressbar__inner"
        style={{ width: `${percentage}%`, ...barStyles }}
      />
    </div>
  );
};
