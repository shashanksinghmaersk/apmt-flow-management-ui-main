import { createMockList } from '../utilities';
import { getRandomBoolean, getTimeStamp } from '../utilities/create-mock-list';
import { TAKT_MOCK } from '.';

import type { TaktListResponse } from '@fes/shared-types';

export const TAKT_LIST_MOCK = createMockList({
  data: TAKT_MOCK,
  mapper: {
    id: (v, i) => `${v}_${i}`,
    title: (v, i) => `${v}_${i}`,
    taktDelayTime: getTimeStamp,
    andon: getRandomBoolean,
  },
  items: 10,
});

export const TAKT_LIST_RESPONSE_MOCK: TaktListResponse = {
  data: TAKT_LIST_MOCK,
};
