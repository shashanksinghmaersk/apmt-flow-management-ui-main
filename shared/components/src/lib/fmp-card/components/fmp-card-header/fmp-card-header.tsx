import { McIcon } from '@maersk-global/mds-react-wrapper';
import { Typography } from '../../../typography/typography';
import cx from 'classnames';

import type { ThemeFit, ThemeTypographySize } from '@fes/shared-types';
import type { ReactNode } from 'react';

import './fmp-card-header.scss';

export type FmpCardHeaderProps = {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  UtilityArea?: ReactNode;
  fit?: ThemeFit;
  icon?: string;
};

export const FmpCardHeader = ({
  title,
  subtitle,
  UtilityArea,
  icon,
  children,
  fit = 'medium',
}: FmpCardHeaderProps) => {
  const hasTitleArea = title || subtitle || icon;

  const titleSizeMap: Record<ThemeFit, ThemeTypographySize> = {
    small: 'medium',
    medium: 'medium',
    large: 'x-small',
  };

  const subtitleSizeMap: Record<ThemeFit, ThemeTypographySize> = {
    small: 'x-small',
    medium: 'small',
    large: 'medium',
  };

  const iconSizeMap: Record<ThemeFit, '16' | '20' | '24'> = {
    small: '20',
    medium: '24',
    large: '24',
  };

  const classNames = cx('fmp-card-header', {
    [`fmp-card-header--${fit}`]: true,
  });

  return (
    <div className={classNames}>
      {(hasTitleArea || UtilityArea) && (
        <div className="fmp-card-header__title-or-utility">
          {hasTitleArea && (
            <div className="fmp-card-header__title">
              {icon && (
                <div className="fmp-card-header__title-icon">
                  <McIcon size={iconSizeMap[fit]} icon={icon} />
                </div>
              )}
              {(title || subtitle) && (
                <div className="fmp-card-header__title-text">
                  {title && (
                    <Typography
                      type={fit === 'large' ? 'headline' : 'text'}
                      size={titleSizeMap[fit]}
                    >
                      {title}
                    </Typography>
                  )}
                  {subtitle && (
                    <Typography type="text" size={subtitleSizeMap[fit]} weight="bold">
                      {subtitle}
                    </Typography>
                  )}
                </div>
              )}
            </div>
          )}
          <span />
          {UtilityArea && <div className="fmp-card-header__utility">{UtilityArea}</div>}
        </div>
      )}
      {children && <div className="fmp-card-header__body">{children}</div>}
    </div>
  );
};
