import type { StandbyPinning } from '@fes/shared-types';
import type { FmpTableColumn } from '../../fmp-table';

export const columns: FmpTableColumn<StandbyPinning>[] = [
  {
    id: 'STANDBY_PINNING_ACTION_CHECKBOX',
    uxType: 'Action',
    width: '60px',
    global: true,
    uxMeta: {
      type: 'checkbox',
    },
  },
  {
    id: 'qcmId',
    width: '80px',
    label: 'QC',
    hidden: true,
  },
  {
    id: 'quayCraneShortName',
    label: 'QC',
    width: '160px',
    uxType: 'Title',
    uxMeta: {
      subtitleKey: 'vesselName',
      subtitleEmptyValue: '--',
    },
  },
  {
    id: 'standbyPosition',
    label: 'Standby',
    uxType: 'Typeahead',
    width: '160px',
    uxMeta: {
      trailingicon: 'info-circle',
    },
  },
  {
    id: 'loadPinningPosition',
    label: 'Load Pinning',
    uxType: 'Typeahead',
    width: '160px',
    uxMeta: {
      trailingicon: 'info-circle',
    },
  },
  {
    id: 'dischargePinningPosition',
    label: 'Discharge Pinning',
    uxType: 'Typeahead',
    width: '200px',
    uxMeta: {
      trailingicon: 'info-circle',
    },
  },
  {
    id: 'lane',
    label: 'Crane Lane',
    uxType: 'Typeahead',
    width: '160px',
    uxMeta: {
      trailingicon: 'info-circle',
    },
  },
  {
    id: 'radioChannel',
    label: 'Radio Channel',
    uxType: 'Typeahead',
    width: '160px',
    uxMeta: {
      trailingicon: 'info-circle',
    },
  },
  {
    id: 'traffic',
    label: 'Traffic',
    width: '100px',
    uxType: 'Tag',
    emptyValue: '--',
    uxMeta: {
      N: 'info',
      F: 'success',
      '*': 'neutral',
    },
  },
  {
    id: 'craneMode',
    label: 'Crane Mode',
    width: '120px',
    uxType: 'Tag',
    emptyValue: '--',
    uxMeta: {
      TOS: 'warning',
      FES: 'success',
      DPOS: 'error',
      '*': 'neutral',
    },
  },
  {
    id: 'ACTION_DELETE',
    uxType: 'Action',
    uxMeta: {
      icon: 'trash',
    },
  },
];
