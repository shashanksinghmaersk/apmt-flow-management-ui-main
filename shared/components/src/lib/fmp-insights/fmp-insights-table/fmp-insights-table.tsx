import { useTranslation } from '@fes/shared-i18n';
import { Suspense, useCallback } from 'react';
import { FmpTableCard, FmpTableCardProps } from '../../fmp-table-card/fmp-table-card';
import { fmpInsightsAlertsTableColumns } from './fmp-insights-table-columns';

import type { InsightAlert, InsightAlertListRequest } from '@fes/shared-types';
import React from 'react';

export type FmpInsightsTableProps = {
  onRowClick: (exceptionId: string) => void;
} & Pick<
  FmpTableCardProps<InsightAlert, InsightAlertListRequest>,
  'endpoint' | 'onRecordChange' | 'fit' | 'data'
>;

export function FmpInsightsTable({ onRowClick, ...rest }: FmpInsightsTableProps) {
  const { t } = useTranslation();

  const handleRowClick = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => {
      onRowClick(e.detail.rowData.exceptionId);
    },
    [onRowClick],
  );

  const memoizedColumns = React.useMemo(() => fmpInsightsAlertsTableColumns, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FmpTableCard
        pagination
        {...rest}
        dataKey="exceptionId"
        className="fmp-insight-alert-table"
        icon="exclamation-triangle"
        title={t('Alerts')}
        columns={memoizedColumns}
        tableProps={{ rowclick: handleRowClick }}
        filters={[
          {
            key: 'severity',
            label: t('Severity'),
          },
          {
            key: 'object',
            label: t('Object'),
          },
        ]}
      />
    </Suspense>
  );
}
