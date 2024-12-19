import { getRandomTimestamps } from '@fes/shared-utilities';

import type {
  ApiMeta,
  ApiResponse,
  TrafficBuffer,
  TrafficBufferChart,
  TrafficBufferTruck,
} from '@fes/shared-types';

const timestamps = getRandomTimestamps(5);

export const BUFFER_INFO_MOCK_DATA_DIAGRAM: TrafficBufferChart[] = [
  {
    key: '7',
    laden: 0,
    unladen: 1,
  },
  {
    key: '8',
    laden: 1,
    unladen: 2,
  },
  {
    key: '9',
    laden: 0,
    unladen: 2,
  },
  {
    key: '10',
    laden: 1,
    unladen: 1,
  },
  {
    key: '11',
    laden: 0,
    unladen: 1,
  },
  {
    key: 'now',
    laden: 1,
    unladen: 2,
  },
];

export const BUFFER_INFO_MOCK_DATA_TABLE: TrafficBufferTruck[] = [
  {
    andon: true,
    duration: timestamps[0],
    id: 'TT99',
    investigation: true,
    laden: true,
    durationExceeded: false,
    center: [22.420679, 56.772537],
  },
  {
    andon: false,
    duration: timestamps[1],
    id: 'TT19',
    investigation: false,
    laden: false,
    durationExceeded: true,
    center: [33.420679, 37.772537],
  },
  {
    andon: false,
    duration: timestamps[2],
    id: 'TT46',
    investigation: false,
    laden: false,
    durationExceeded: false,
    center: [44.420679, 88.772537],
  },
];

export const BUFFER_INFO_MOCK_DATA: TrafficBuffer = {
  trucksLaden: 2,
  trucksLadenAndon: true,
  trucksUnladen: 1,
  trucksUnladenAndon: false,
  chart: BUFFER_INFO_MOCK_DATA_DIAGRAM,
};

export const BUFFER_INFO_MOCK_META: ApiMeta<TrafficBuffer> = {
  filters: [],
  pagination: {
    page: 1,
    itemsPerPage: 10,
  },
  options: {},
};

export const BUFFER_INFO_MOCK_RESPONSE: ApiResponse<TrafficBuffer> = {
  data: BUFFER_INFO_MOCK_DATA,
  meta: BUFFER_INFO_MOCK_META,
};
