import { McIcon } from '@maersk-global/mds-react-wrapper';
import { TruckRight, TruckRightUnladen } from '../../../../fmp-icons';
import { FmpTag } from '../../../../fmp-tag/fmp-tag';
import { Typography } from '../../../../typography/typography';

import type { TrafficBufferTruck } from '@fes/shared-types';
import type { FmpTableColumn } from '../../../../fmp-table';

export const columns: FmpTableColumn<TrafficBufferTruck>[] = [
  {
    id: 'TRUCK',
    label: 'Truck',
    render: ({ record }) => {
      return (
        <div className="fmp-traffic-buffer-panel-table-column__truck ">
          {record.laden ? <TruckRight /> : <TruckRightUnladen />}
          <Typography>{record.id}</Typography>
          {record.andon && <McIcon icon="exclamation-triangle-solid" />}
        </div>
      );
    },
  },
  {
    id: 'duration',
    label: 'In Buffer',
    uxType: 'EpochTimer',
    outerRender: ({ record, children }) => {
      return (
        <FmpTag
          appearance={record.andon ? 'error' : 'neutral'}
          className="fmp-traffic-buffer-panel-table-column__in_buffer"
          critical={record.durationExceeded}
          fit="small"
        >
          {children}
        </FmpTag>
      );
    },
  },
  /* {
    id: 'ACTION_FOCUS',
    uxType: 'Action',
    uxMeta: {
      type: 'icon',
      icon: 'magnifying-glass',
      style: { cursor: 'pointer' },
    },
  }, */
];
