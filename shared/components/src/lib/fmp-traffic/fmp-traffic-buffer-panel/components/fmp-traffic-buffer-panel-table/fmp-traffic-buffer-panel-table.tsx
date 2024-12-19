import { useCallback } from 'react';
import { FmpTable, createFmpTableRowBackground } from '../../../../fmp-table';
import { columns } from './fmp-traffic-buffer-panel-table-columns';

import type {
  TrafficBufferTruck,
  TrafficMapLngLatLike,
} from '@fes/shared-types';

import './fmp-traffic-buffer-panel-table.scss';

export type FmpBufferPanelTableProps = {
  data?: TrafficBufferTruck[];
  onItemPanTo: (center: TrafficMapLngLatLike) => void;
};

export const FmpBufferPanelTable = ({
  data = [],
  onItemPanTo,
}: FmpBufferPanelTableProps) => {
  const rows = data
    .map((r, i) => (r.investigation ? i : undefined))
    .filter((n) => n !== undefined) as number[];

  const customstyles = createFmpTableRowBackground(rows, 'error');

  const handleRecordAction = useCallback(
    (id: string, record: TrafficBufferTruck) => {
      if (id === 'ACTION_FOCUS') {
        onItemPanTo(record.center);
      }
    },
    [onItemPanTo],
  );

  return (
    <FmpTable
      dataKey="id"
      className="fmp-traffic-buffer-panel-table"
      data={data}
      columns={columns}
      tableProps={{ customstyles }}
      onRecordAction={handleRecordAction}
    />
  );
};
