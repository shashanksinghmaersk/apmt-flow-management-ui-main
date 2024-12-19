import { useTranslation } from '@fes/shared-i18n';
import { McButton } from '@maersk-global/mds-react-wrapper';
import cx from 'classnames';
import { FmpMenubarItem } from '../fmp-menubar-item/fmp-menubar-item';

import type { Route, RouteName } from '@fes/shared-types';
import type { ReactNode } from 'react';

import './fmp-menubar-tablet.scss';

export type FmpMenubarTabletProps = {
  menu?: Route[];
  className?: string;
  active?: RouteName;
  expanded?: boolean;
  onMenuClick: (link?: RouteName) => void;
  onExpandedChange?: (expanded: boolean) => void;
};

export const FmpMenubarTablet = ({
  menu,
  className,
  expanded,
  active,
  onMenuClick,
  onExpandedChange,
}: FmpMenubarTabletProps): ReactNode => {
  const { t } = useTranslation();

  const classNames = cx('fmp-menubar-tablet', className, {
    'fmp-menubar-tablet--expanded': !!expanded,
  });

  const handleExpandedChange = () => {
    onExpandedChange?.(!expanded);
  };

  return (
    <div className={classNames}>
      <div className="fmp-menubar-tablet__button">
        <McButton
          hiddenlabel
          fit="small"
          icon={expanded ? 'times' : 'bars-horizontal'}
          slot="trigger"
          variant={expanded ? 'filled' : 'outlined'}
          appearance={expanded ? 'primary' : 'neutral'}
          label={t('Menu')}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onClick={handleExpandedChange}
        />
      </div>
      {expanded && (
        <div className="fmp-menubar-tablet__modal">
          <div className="fmp-menubar-tablet__modal-background"></div>
          <div className="fmp-menubar-tablet__modal-menu">
            {menu?.map((menuItem, index) => {
              return (
                <FmpMenubarItem
                  expanded={expanded}
                  active={active === menuItem.route}
                  key={index}
                  {...menuItem}
                  onClick={onMenuClick}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
