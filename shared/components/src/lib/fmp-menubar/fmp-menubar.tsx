import cx from 'classnames';
import { motion } from 'framer-motion';
import { Fragment, useCallback } from 'react';
import { FmpMenubarItem } from '../fmp-menubar-item/fmp-menubar-item';
import { FmpMenubarItemWrapper } from './components/fmp-menubar-item-wrapper/fmp-menubar-item-wrapper';

import type { Route, RouteName } from '@fes/shared-types';
import type { ReactNode } from 'react';

import './fmp-menubar.scss';

export type FmpMenubarProps = {
  menu: Route[];
  route?: RouteName;
  expanded?: boolean;
  onMenuClick: (link?: RouteName) => void;
  onExpandedChange?: (expanded: boolean) => void;
};

export const FmpMenubar = ({
  menu,
  route,
  expanded,
  onMenuClick,
  onExpandedChange,
}: FmpMenubarProps): ReactNode => {
  const classNames = cx('fmp-menubar', {
    'fmp-menubar--expanded': expanded,
  });

  const handleExpandedChange = useCallback(() => {
    onExpandedChange?.(!expanded);
  }, [expanded, onExpandedChange]);

  return (
    <div className={classNames}>
      <div className="fmp-menubar__items">
        {menu?.map((menuProps, index) => {
          const isActive = route === menuProps.route;
          return (
            <Fragment key={`fmp-menubar-item-fragment-${index}`}>
              <FmpMenubarItemWrapper
                active={isActive}
                route={menuProps}
                expanded={expanded}
                onMenuClick={onMenuClick}
              />
              {isActive && (
                <motion.div
                  className="fmp-menubar__item-background"
                  layoutId="fmp-menubar-item-background"
                />
              )}
            </Fragment>
          );
        })}
      </div>
      <div className="fmp-menubar__toggle">
        <FmpMenubarItem
          text=""
          active={false}
          expanded={expanded}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          icon={expanded ? 'double-chevron-left' : 'double-chevron-right'}
          onClick={handleExpandedChange}
        />
      </div>
    </div>
  );
};
