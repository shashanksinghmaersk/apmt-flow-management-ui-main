import { McIcon } from '@maersk-global/mds-react-wrapper';
import cx from 'classnames';
import { useCallback } from 'react';
import { FmpTablePagination } from '../fmp-table-pagination/fmp-table-pagination';
import { Typography } from '../typography/typography';

import type {
  ApiMeta,
  ApiMetaPagination,
  ThemeFit,
  ThemeTypographySize,
} from '@fes/shared-types';
import type { ReactNode } from 'react';

import './fmp-table-header.scss';

export type FmpTableHeaderProps<T> = {
  meta?: ApiMeta<T>;
  children?: ReactNode;
  className?: string;
  pagination?: boolean;
  title?: string;
  fit?: ThemeFit;
  subtitle?: string;
  icon?: string;
  ActionArea?: ReactNode;
  UtilityArea?: ReactNode;
  collapsible?: boolean;
  collapsed?: boolean;
  onPaginationChange?: (pagination: ApiMetaPagination) => void;
  onCollapseChange?: (collapsed: boolean) => void;
};

export function FmpTableHeader<T>({
  meta,
  children,
  className,
  icon,
  title,
  subtitle,
  fit = 'medium',
  pagination,
  ActionArea,
  UtilityArea,
  collapsible,
  collapsed,
  onPaginationChange,
  onCollapseChange,
}: FmpTableHeaderProps<T>) {
  const classNames = cx(className, 'fmp-table-header', {
    [`fmp-table-header--${fit}`]: true,
    'fmp-table-header--collapsed': collapsible && !collapsed,
    'fmp-table-header--has-content': !!ActionArea || pagination,
  });
  const hasTitleArea = title || subtitle || icon;

  const titleSizeMap: Record<string, ThemeTypographySize> = {
    'x-small': 'small',
    small: 'medium',
    medium: 'large',
    large: 'x-small',
    'x-large': 'medium',
  };

  const subtitleSizeMap: Record<string, ThemeTypographySize> = {
    'x-small': 'x-small',
    small: 'x-small',
    medium: 'small',
    large: 'medium',
    'x-large': 'large',
  };

  const handleCollapseClick = useCallback(() => {
    if (collapsible) {
      onCollapseChange?.(!collapsed);
    }
  }, [collapsed, collapsible, onCollapseChange]);

  let hasChildren = !!children;

  if (Array.isArray(children)) {
    children.forEach((item) => {
      hasChildren = !!item;
    });
  }

  return (
    <div className={classNames} onClick={handleCollapseClick}>
      {(hasTitleArea || UtilityArea) && (
        <div className="fmp-table-header__title-or-utility">
          {hasTitleArea && (
            <div className="fmp-table-header__title">
              {icon && (
                <div className="fmp-table-header__title-icon">
                  <McIcon size="24" icon={icon} />
                </div>
              )}
              {(title || subtitle) && (
                <div className="fmp-table-header__title-text">
                  {title && (
                    <Typography
                      type={fit === 'large' ? 'headline' : 'text'}
                      size={titleSizeMap[fit]}
                    >
                      {title}
                    </Typography>
                  )}
                  {subtitle && (
                    <Typography
                      type="text"
                      size={subtitleSizeMap[fit]}
                      weight="bold"
                    >
                      {subtitle}
                    </Typography>
                  )}
                </div>
              )}
            </div>
          )}
          <span />
          {UtilityArea && (
            <div className="fmp-table-header__utility">
              {UtilityArea}
              {collapsible && (
                <div className="fmp-table-header__utility-expander">
                  <McIcon
                    icon={!collapsed ? 'chevron-right' : 'chevron-down'}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {(hasChildren || ActionArea || pagination) && (
        <div className="fmp-table-header__body">
          <div className="fmp-table-header__body-content">{children}</div>
          <div className="fmp-table-header__body-action">
            {ActionArea && (
              <div className="fmp-table-header__body-action-custom">
                {ActionArea}
              </div>
            )}
            {pagination && (
              <FmpTablePagination
                className="fmp-table-header__body-action-pagination"
                pagination={meta?.pagination}
                onPaginationChange={onPaginationChange}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
