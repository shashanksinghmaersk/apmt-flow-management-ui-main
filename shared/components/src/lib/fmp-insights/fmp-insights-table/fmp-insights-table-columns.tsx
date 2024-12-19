import type { InsightAlert } from '@fes/shared-types';
import type { FmpTableColumn } from '../../fmp-table/types';

export const fmpInsightsAlertsTableColumns: FmpTableColumn<InsightAlert>[] = [
  {
    id: 'severity',
    label: 'Severity',
    uxType: 'Tag',
    uxMeta: {
      Critical: 'critical',
      Warning: 'warning',
      Info: 'info',
      Error: 'error',
      '*': 'neutral',
    },
  },
  {
    id: 'duration',
    label: 'Duration',
    uxType: 'EpochTimer',
    width: '130px',
  },
  /* {
      id: 'dueTime',
      label: 'Due Time',
      sortDisabled: true,
    }, */
  {
    id: 'object',
    label: 'Object',
  },
  {
    id: 'objectId',
    label: 'Object Id',
  },
  {
    id: 'count',
    label: 'Count',
    uxType: 'Number',
  },
  {
    id: 'summary',
    label: 'Summary',
  },
];
