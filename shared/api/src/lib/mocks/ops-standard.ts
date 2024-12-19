import type { RemoteHandling, RemoteHandlingResponse } from '@fes/shared-types';

export const OPS_STANDARD_UI_MOCK_DATA: RemoteHandling = {
  QCs: [
    {
      cheShortName: 'QCZ 1',
      chePoolName: 'A',
      cheStatus: 'Unavailable',
      operatorId: 'OP123',
      operatorName: 'Alice Johnson',
      userActivityTrackerTime: '01:24:41',
      cheActivityTrackerTime: '12:54:12',
      url: 'link/',
    },
    {
      cheShortName: 'QCZ 2',
      chePoolName: 'FES',
      cheStatus: 'Available',
      operatorId: 'OP124',
      operatorName: 'Mark Thomson',
      userActivityTrackerTime: '01:24:41',
      cheActivityTrackerTime: '12:54:12',
      url: 'link/',
    },
    {
      cheShortName: 'QCZ 3',
      chePoolName: '-',
      cheStatus: 'Available',
      operatorId: 'OP234',
      operatorName: 'Richard David',
      userActivityTrackerTime: '01:24:41',
      cheActivityTrackerTime: '12:54:12',
      url: 'link/',
    },
  ],
  RTGs: [
    {
      cheShortName: 'RTG1',
      chePoolName: '-',
      cheStatus: 'Available',
      operatorId: 'OP789',
      operatorName: 'Alice Hall',
      userActivityTrackerTime: '01:24:41',
      cheActivityTrackerTime: '12:54:12',
      url: 'link/',
    },
  ],
  EHs: [
    {
      cheShortName: 'EH 1',
      chePoolName: '-',
      cheStatus: 'Available',
      operatorId: 'OP987',
      operatorName: 'Mark Twain',
      userActivityTrackerTime: '01:24:41',
      cheActivityTrackerTime: '12:54:12',
      url: 'link/',
    },
  ],
  TTs: [
    {
      cheShortName: 'TT 1',
      chePoolName: '-',
      cheStatus: 'Available',
      operatorId: 'OP123',
      operatorName: 'Sam Puddy',
      userActivityTrackerTime: '01:24:41',
      cheActivityTrackerTime: '12:54:12',
      url: 'link/',
    },
  ],
};

export const REMOTE_CONTROL_OPS2OPS_UI_RESPONSE: RemoteHandlingResponse = {
  data: OPS_STANDARD_UI_MOCK_DATA,
};
