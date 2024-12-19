import type { Meta, StoryObj } from '@storybook/react';
import { FmpTableFilterMenu, FmpTableFilterMenuProps } from './fmp-table-filter-menu';
import { ApiMetaFilter } from '@fes/shared-types';

const meta: Meta<FmpTableFilterMenuProps> = {
  component: FmpTableFilterMenu,
  title: 'Shared/fmp-table-filter-menu',
};

export default meta;

type Story = StoryObj<FmpTableFilterMenuProps>;

const _filters: ApiMetaFilter[] = [
  {
    key: 'che',
    type: 'field',
    enabled: true,
    records: [
      {
        key: 'che',
        type: 'category',
        enabled: true,
        totalRecords: 24,
        label: 'QCs',
        records: [
          {
            key: 'che',
            type: 'record',
            value: 'QC1111',
            enabled: true,
          },
          {
            key: 'che',
            type: 'record',
            value: 'QC1112',
            enabled: true,
          },
          {
            key: 'che',
            type: 'record',
            value: 'QC1113',
            enabled: true,
          },
          {
            key: 'che',
            type: 'record',
            value: 'QC1114',
            enabled: true,
          },
          {
            key: 'che',
            type: 'record',
            value: 'QC1222',
            enabled: true,
          },
          {
            key: 'che',
            type: 'record',
            value: 'QC1233',
            enabled: true,
          },
          {
            key: 'che',
            type: 'record',
            value: 'QC1244',
            enabled: true,
          },
          {
            key: 'che',
            type: 'record',
            value: 'QC190',
            enabled: true,
          },
          {
            key: 'che',
            type: 'record',
            value: 'QC191',
            enabled: true,
          },
          {
            key: 'che',
            type: 'record',
            value: 'QC5671',
            enabled: true,
          },
          {
            key: 'che',
            type: 'record',
            value: 'QC5673',
            enabled: true,
          },
          {
            key: 'che',
            type: 'record',
            value: 'QC6789',
            enabled: true,
          },
          {
            key: 'che',
            type: 'record',
            value: 'QC870',
            enabled: true,
          },
          {
            key: 'che',
            type: 'record',
            value: 'QC873',
            enabled: true,
          },
          {
            key: 'che',
            type: 'record',
            value: 'QC874',
            enabled: true,
          },
          {
            key: 'che',
            type: 'record',
            value: 'QC875',
            enabled: true,
          },
          {
            key: 'che',
            type: 'record',
            value: 'QC8901',
            enabled: true,
          },
          {
            key: 'che',
            type: 'record',
            value: 'QC8902',
            enabled: true,
          },
          {
            key: 'che',
            type: 'record',
            value: 'QC8903',
            enabled: true,
          },
          {
            key: 'che',
            type: 'record',
            value: 'QC8904',
            enabled: true,
          },
          {
            key: 'che',
            type: 'record',
            value: 'QCZ05',
            enabled: true,
          },
          {
            key: 'che',
            type: 'record',
            value: 'QCZ1',
            enabled: true,
          },
          {
            key: 'che',
            type: 'record',
            value: 'QCZ10',
            enabled: true,
          },
          {
            key: 'che',
            type: 'record',
            value: 'QCZ8',
            enabled: true,
          },
        ],
      },
      {
        key: 'che',
        type: 'category',
        enabled: true,
        totalRecords: 6,
        label: 'RTGs',
        records: [
          {
            key: 'che',
            type: 'record',
            value: 'QCZ01',
            enabled: true,
          },
          {
            key: 'che',
            type: 'record',
            value: 'RTG01',
            enabled: true,
          },
          {
            key: 'che',
            type: 'record',
            value: 'RTG6789',
            enabled: true,
          },
          {
            key: 'che',
            type: 'record',
            value: 'RTZ01',
            enabled: true,
          },
          {
            key: 'che',
            type: 'record',
            value: 'RTZ09',
            enabled: true,
          },
          {
            key: 'che',
            type: 'record',
            value: 'RTZ23',
            enabled: true,
          },
        ],
      },
      {
        key: 'che',
        type: 'category',
        enabled: true,
        totalRecords: 4,
        label: 'TTs',
        records: [
          {
            key: 'che',
            type: 'record',
            value: 'TT01',
            enabled: true,
          },
          {
            key: 'che',
            type: 'record',
            value: 'TT02',
            enabled: true,
          },
          {
            key: 'che',
            type: 'record',
            value: 'TT03',
            enabled: true,
          },
          {
            key: 'che',
            type: 'record',
            value: 'TT6789',
            enabled: true,
          },
        ],
      },
      {
        key: 'che',
        type: 'category',
        enabled: true,
        totalRecords: 1,
        label: 'EHs',
        records: [
          {
            key: 'che',
            type: 'record',
            value: 'EH6789',
            enabled: true,
          },
        ],
      },
    ],
  },
  {
    key: 'type',
    type: 'field',
    enabled: true,
    records: [
      {
        key: 'type',
        type: 'record',
        value: 'Tech Andons',
        enabled: true,
      },
      {
        key: 'type',
        type: 'record',
        value: 'Ops Andons',
        enabled: true,
      },
      {
        key: 'type',
        type: 'record',
        value: 'Flow Andons',
        enabled: true,
      },
    ],
  },
  {
    key: 'investigation',
    type: 'field',
    enabled: true,
    records: [
      {
        key: 'type',
        type: 'record',
        value: 'Open',
        enabled: true,
      },
      {
        key: 'type',
        type: 'record',
        value: 'Closed',
        enabled: true,
      },
      {
        key: 'type',
        type: 'record',
        value: 'Not taken',
        enabled: true,
      },
    ],
  },
  {
    key: 'time',
    type: 'field',
    enabled: true,
    records: [
      {
        key: 'type',
        type: 'record',
        value: 'Current Shift',
        enabled: false,
      },
      {
        key: 'type',
        type: 'record',
        value: 'Last Shift',
        enabled: false,
      },
      {
        key: 'type',
        type: 'record',
        value: 'Last 12 hours',
        enabled: false,
      },
      {
        key: 'type',
        type: 'record',
        value: 'Last 24 hours',
        enabled: true,
      },
      {
        key: 'type',
        type: 'record',
        value: 'Last 2 days',
        enabled: false,
      },
      {
        key: 'type',
        type: 'record',
        value: 'Last week',
        enabled: false,
      },
      {
        key: 'type',
        type: 'record',
        value: 'Last month',
        enabled: false,
      },
    ],
  },
];

export const Controllable: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filters: _filters as any,
  },
};
