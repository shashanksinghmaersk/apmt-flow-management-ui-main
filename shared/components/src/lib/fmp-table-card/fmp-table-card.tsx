import { UseEndpointReturn, useMetaFilters } from '@fes/shared-api';
import { useTranslation } from '@fes/shared-i18n';
import cx from 'classnames';
import { Fragment, useCallback, useState, type ReactNode } from 'react';
import { FmpCardSeparator } from '../fmp-card';
import { FmpFilterButton } from '../fmp-filter-button/fmp-filter-button';
import { getFilterCounts } from '../fmp-table-filter-menu';
import { FmpTableFilterMenu } from '../fmp-table-filter-menu/fmp-table-filter-menu';
import { FmpTableHeader } from '../fmp-table-header/fmp-table-header';
import { FmpTable } from '../fmp-table/fmp-table';

import type { ApiMetaFilter, ApiMetaPagination } from '@fes/shared-types';
import type { FmpTableProps } from '../fmp-table/types';

import './fmp-table-card.scss';

export type FmpTableCardProps<DATA_TYPE, REQUEST_TYPE> = {
  HeaderContent?: ReactNode;
  ActionArea?: ReactNode;
  UtilityArea?: ReactNode;
  pagination?: boolean;
  icon?: string;
  title?: string;
  subtitle?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  filters?: { label: string; key: string }[];
  endpoint?: UseEndpointReturn<DATA_TYPE, DATA_TYPE[], REQUEST_TYPE>;
  onPaginationChange?: (pagination: ApiMetaPagination) => void;
  onFiltersChange?: (filters: ApiMetaFilter[]) => void;
  onCollapseChange?: (collapsed: boolean) => void;
} & FmpTableProps<DATA_TYPE>;

export function FmpTableCard<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DATA_TYPE extends Record<string, any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  REQUEST_TYPE extends Record<string, any>,
>({
  ActionArea,
  HeaderContent,
  UtilityArea,
  className,
  collapsed: _collapsed = false,
  collapsible,
  endpoint,
  filters: _filters,
  fit,
  icon,
  data: _data,
  meta: _meta,
  pagination,
  subtitle,
  tableProps = {},
  title,
  onCollapseChange,
  onFiltersChange,
  onPaginationChange,
  ...rest
}: FmpTableCardProps<DATA_TYPE, REQUEST_TYPE>) {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(_collapsed);
  const classNames = cx(className, 'fmp-table-card');

  const data = _data || endpoint?.data;
  const meta = _meta || endpoint?.meta;

  let customstyles = `
    .mds-table {
      border: 0 none !important;
    }
  `;

  if (tableProps.customstyles) {
    customstyles = `${customstyles} ${tableProps.customstyles}`;
  }

  const handlePaginationChange = useCallback(
    (pagination: ApiMetaPagination) => {
      endpoint?.updateMeta({ pagination });
      onPaginationChange?.(pagination);
    },
    [endpoint, onPaginationChange],
  );

  const handleCollapseChange = useCallback(
    (__collapsed: boolean) => {
      setCollapsed(__collapsed);
      onCollapseChange?.(__collapsed);
    },
    [onCollapseChange],
  );

  const handleFiltersChange = useCallback(
    (filters: ApiMetaFilter[]) => {
      endpoint?.updateMeta({ filters });
      onFiltersChange?.(filters);
    },
    [endpoint, onFiltersChange],
  );

  const handleRecordEditStart = useCallback(() => {
    endpoint?.pause(true);
    rest.onRecordEditStart?.();
  }, [endpoint, rest]);

  const handleRecordEditEnd = useCallback(() => {
    endpoint?.pause(false);
    rest.onRecordEditEnd?.();
  }, [endpoint, rest]);

  const { filterMap, updateFilters } = useMetaFilters({
    keys: _filters?.map((item) => item.key),
    meta,
    onFiltersChange: handleFiltersChange,
  });

  return (
    <div className={classNames}>
      <FmpTableHeader<DATA_TYPE>
        className="fmp-table-card__body-header"
        meta={meta}
        pagination={pagination}
        ActionArea={ActionArea}
        UtilityArea={UtilityArea}
        title={title}
        subtitle={subtitle}
        icon={icon}
        fit={fit}
        collapsible={collapsible}
        collapsed={collapsed}
        onPaginationChange={handlePaginationChange}
        onCollapseChange={handleCollapseChange}
      >
        {HeaderContent}
        {!!_filters &&
          Object.keys(filterMap).map((key: keyof DATA_TYPE, index) => {
            const label = _filters.filter((item) => item.key === key)?.[0]?.label;

            const { count, maxCount } = getFilterCounts(filterMap[key]);

            return (
              <Fragment key={`${String(key)}-${index}`}>
                <FmpFilterButton
                  fit={fit}
                  count={count}
                  maxCount={maxCount}
                  label={t(label)}
                  placement="bottom"
                >
                  <FmpTableFilterMenu
                    filter={filterMap[key]}
                    onChange={(filter) => {
                      updateFilters(key, filter);
                    }}
                  />
                </FmpFilterButton>
                {index < _filters.length - 1 && <FmpCardSeparator />}
              </Fragment>
            );
          })}
      </FmpTableHeader>
      <FmpTable<DATA_TYPE>
        className="fmp-table-card__body-content"
        fit={fit}
        meta={meta}
        data={data}
        hidden={collapsible && !collapsed}
        onRecordEditStart={handleRecordEditStart}
        onRecordEditEnd={handleRecordEditEnd}
        tableProps={{
          disableroundedcorners: true,
          ...tableProps,
          customstyles,
        }}
        loading={rest.loading || endpoint?.loading || rest.updating || endpoint?.updating}
        {...rest}
      />
    </div>
  );
}
