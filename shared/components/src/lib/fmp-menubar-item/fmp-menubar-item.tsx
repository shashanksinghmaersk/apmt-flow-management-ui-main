import { McIcon } from '@maersk-global/mds-react-wrapper';
import cx from 'classnames';
import Link from 'next/link';
import { Typography } from '../typography/typography';

import type { Route, RouteName } from '@fes/shared-types';
import type { CSSProperties, ReactNode } from 'react';

import './fmp-menubar-item.scss';

export type FmpMenubarItemProps = {
  style?: CSSProperties;
  expanded?: boolean;
  active?: boolean;
  className?: string;
  slot?: string;
  onClick?: (link?: RouteName) => void;
} & Partial<Route>;

export const FmpMenubarItem = ({
  icon,
  text,
  route,
  expanded,
  active,
  className,
  slot,
  style = {},
  onClick,
}: FmpMenubarItemProps): ReactNode => {
  const classNames = cx(className, 'fmp-menubar-item', {
    'fmp-menubar-item--active': active,
    'fmp-menubar-item--expanded': expanded,
  });

  return (
    <Link
      className={classNames}
      href={route || ''}
      style={style}
      slot={slot}
      onClick={(e) => {
        if (!route) {
          e.preventDefault();
        }

        onClick?.(route);
      }}
    >
      <div className="fmp-menubar-item__icon">{<McIcon icon={icon} />}</div>
      {expanded && text && (
        <div className="fmp-menubar-item__text">
          <Typography weight="normal" type="text" size="medium">
            {text}
          </Typography>
        </div>
      )}
    </Link>
  );
};
