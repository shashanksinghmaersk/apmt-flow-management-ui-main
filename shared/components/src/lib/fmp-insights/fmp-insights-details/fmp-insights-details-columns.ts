import type { InsightDetailDetails } from '@fes/shared-types';
import type { FmpTableColumn } from '../../fmp-table/types';

export const insightsDetailsColumns: FmpTableColumn<InsightDetailDetails>[] = [
  {
    id: 'vesselVisitID',
    label: 'Vessel Visit ID',
    emptyValue: '--',
  },
  {
    id: 'wqName',
    label: 'WQ Name',
    emptyValue: '--',
  },
  {
    id: 'containerID',
    label: 'Container ID',
    emptyValue: '--',
  },
];
