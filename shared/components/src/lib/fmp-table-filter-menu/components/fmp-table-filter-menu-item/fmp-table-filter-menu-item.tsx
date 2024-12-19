import { McCheckbox, McIcon, McRadio } from '@maersk-global/mds-react-wrapper';
import cx from 'classnames';
import { useCallback } from 'react';
import { Typography } from '../../../typography/typography';

import type { ApiMetaFilter } from '@fes/shared-types';
import type { FmpFilterOnChangeProps } from '../../types';

import './fmp-table-filter-menu-item.scss';
import { useTranslation } from '@fes/shared-i18n';

export type FmpTableFilterMenuItemProps = {
  className?: string;
  filter: ApiMetaFilter;
  index: number;
  indent?: number;
  expanded?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onExpandedToggle?: (e: any) => void;
  onChange: (props: FmpFilterOnChangeProps) => void;
};

export function FmpTableFilterMenuItem({
  className,
  filter,
  index,
  indent = 0,
  expanded,
  onChange,
  onExpandedToggle,
}: FmpTableFilterMenuItemProps) {
  const { t } = useTranslation();
  const handleCheckboxChange = useCallback(() => {
    const enabled = !filter.enabled;

    const item = { item: { ...filter, enabled }, index };

    onChange?.(item);
  }, [filter, index, onChange]);

  const handleRadiobuttonChange = useCallback(() => {
    const radioEnabled = !filter.enabled;
    const item = { item: { ...filter, radioEnabled }, index };

    onChange?.(item);
  }, [filter, index, onChange]);

  const classNames = cx(className, 'fmp-table-filter-menu-item', {
    'fmp-table-filter-menu-item--enabled': filter.enabled,
  });

  const handleExpandToggleClick = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => {
      e.stopPropagation();
      e.preventDefault();
      onExpandedToggle?.(e);
    },
    [onExpandedToggle],
  );

  return (
    <div className={classNames}>
      <div
        className="fmp-table-filter-menu-item__inner"
        style={{ paddingLeft: indent * 28 }}
      >
        <div className="fmp-table-filter-menu-item__checkbox">
          {filter.key === 'time' ? (
            <McRadio
              checked={filter.enabled}
              label={t(filter.label || filter.value || '')}
              change={handleRadiobuttonChange}
              name={`filter-radio-${index}`}
            />
          ) : (
            <McCheckbox
              checked={filter.enabled}
              label={t(filter.label || filter.value || '')}
              change={handleCheckboxChange}
            />
          )}
          {filter.totalRecords && (
            <Typography weak className="fmp-table-filter-menu-item__checkbox-total">
              ({filter.totalRecords})
            </Typography>
          )}
        </div>
        <div className="fmp-table-filter-menu-item__expand">
          {filter.records && filter.records.length > 0 && (
            <McIcon
              className="fmp-table-filter-menu-item__expand-icon"
              icon={expanded ? 'chevron-down' : 'chevron-right'}
              onClick={handleExpandToggleClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}
