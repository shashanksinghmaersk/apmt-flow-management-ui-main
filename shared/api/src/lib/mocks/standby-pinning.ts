import type {
  ApiMeta,
  StandbyPinning,
  StandbyPinningListResponse,
} from '@fes/shared-types';

export const STANDBY_PINNING_MOCK_DATA: StandbyPinning[] = [
  {
    qcmId: 'QCZ 1',
    quayCraneShortName: 'Ronda',
    craneMode: 'TOS',
    dischargePinningPosition: 'B60',
    lane: '6',
    loadPinningPosition: 'B70',
    radioChannel: 'R27',
    standbyPosition: 'B80',
    traffic: 'N',
    vesselName: 'SAF NOKWANDA',
    createdBy: null,
    createdTime: null,
  },
  {
    qcmId: 'QCZ 2',
    quayCraneShortName: 'Henry',
    craneMode: 'FES',
    dischargePinningPosition: 'B60',
    lane: '7',
    loadPinningPosition: 'B70',
    radioChannel: 'R30',
    standbyPosition: 'B90',
    traffic: null,
    vesselName: 'SAF NOKWANDA',
    createdBy: null,
    createdTime: null,
  },
];

export const STANDBY_PINNING_MOCK_META: ApiMeta<StandbyPinning> = {
  idKey: 'qcmId',
  pagination: {
    page: 1,
    hasNextPage: false,
    hasPreviousPage: false,
    itemsPerPage: 10,
    totalItems: 10,
    totalPages: 1,
  },
  filters: [],
  options: {
    dischargePinningPosition: ['B60', 'B70', 'B80', 'B90', 'B92', 'B93'],
    standbyPosition: ['B60', 'B70', 'B80', 'B90', 'B92', 'B93'],
    radioChannel: ['R27', 'R28', 'R29', 'R30'],
    loadPinningPosition: ['B60', 'B70', 'B80', 'B90', 'B92', 'B93'],
  },
};

export const STANDBY_MOCK_RESPONSE: StandbyPinningListResponse = {
  data: STANDBY_PINNING_MOCK_DATA,
  meta: STANDBY_PINNING_MOCK_META,
};
