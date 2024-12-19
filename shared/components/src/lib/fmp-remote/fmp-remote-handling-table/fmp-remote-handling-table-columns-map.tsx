import { McIcon } from '@maersk-global/mds-react-wrapper';

import type { RemoteHandlingItem, RemoteHandlingKey } from '@fes/shared-types';
import type { FmpTableColumn } from '../../fmp-table/types';
import type { ReactNode } from 'react';

const CheNameOuter = ({ children, icon }: { children: ReactNode; icon: string }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <McIcon style={{ marginRight: '0.5rem' }} icon={icon} />
      {children}
    </div>
  );
};

const baseColumn: FmpTableColumn<RemoteHandlingItem>[] = [
  {
    id: 'chePoolName',
    label: 'CHE Pool Name',
    uxType: 'Tag',
    sortDisabled: false,
    align: 'center',
    uxMeta: {
      A: 'neutral',
      B: 'neutral',
      '-': 'neutral',
      FES: 'secondary',
    },
  },
  {
    id: 'cheStatus',
    label: 'CHE Status',
    uxType: 'Tag',
    sortDisabled: false,
    uxMeta: {
      Available: 'success',
      Unavailable: 'error',
    },
  },
  {
    id: 'operatorId',
    label: 'Operator ID',
  },
  {
    id: 'operatorName',
    label: 'Operator Name',
  },
  {
    id: 'cheActivityTrackerTime',
    label: 'Available/Unavailable Time',
    align: 'center',
  },
  {
    id: 'userActivityTrackerTime',
    label: 'Login/Logout Time',
    align: 'center',
  },
  {
    id: 'ACTION_REMOTE_OPEN',
    label: 'Screen',
    width: '140px',
    uxType: 'Action',
    uxMeta: {
      type: 'button',
      icon: 'remote-control',
    },
  },
];

const cheNameColumn: FmpTableColumn<RemoteHandlingItem> = {
  id: 'cheShortName',
  label: 'CHE ID',
  sortDisabled: false,
};

const QCsColumns: FmpTableColumn<RemoteHandlingItem>[] = [
  {
    ...cheNameColumn,
    outerRender: ({ children }) => <CheNameOuter icon="crane" children={children} />,
  },
  ...baseColumn,
];

const RTGsColumns: FmpTableColumn<RemoteHandlingItem>[] = [
  {
    ...cheNameColumn,
    outerRender: ({ children }) => (
      <CheNameOuter icon="rubber-tyred-gantry-crane" children={children} />
    ),
  },
  ...baseColumn,
];

const EHsColumns: FmpTableColumn<RemoteHandlingItem>[] = [
  {
    ...cheNameColumn,
    outerRender: ({ children }) => (
      <CheNameOuter icon="container-handler-2" children={children} />
    ),
  },
  ...baseColumn,
];

const TTsColumns: FmpTableColumn<RemoteHandlingItem>[] = [
  {
    ...cheNameColumn,
    outerRender: ({ children }) => <CheNameOuter icon="truck-side" children={children} />,
  },
  ...baseColumn,
];

export const fmpRemoteHandlingTableColumnsMap: Record<
  RemoteHandlingKey,
  FmpTableColumn<RemoteHandlingItem>[]
> = {
  QCs: QCsColumns,
  RTGs: RTGsColumns,
  EHs: EHsColumns,
  TTs: TTsColumns,
};
