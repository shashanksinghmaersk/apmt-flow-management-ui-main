import { createMockList } from '../utilities';
import { getRandomBoolean, getTimeStamp } from '../utilities/create-mock-list';
import data from './data/takt.json';
import { TAKT_DEPENDENCY_MOCK } from './takt-dependency';

import type { Takt } from '@fes/shared-types';

export const TAKT_DEPENDENCIES_MOCK = createMockList({
  data: TAKT_DEPENDENCY_MOCK,
  items: 10,
  mapper: {
    cheShortName: (v, i) => `${v}_${i}`,
    taktDelayTime: getTimeStamp,
    andon: getRandomBoolean,
  },
});

export const TAKT_MOCK: Takt = {
  ...(data as Takt),
  taktDependencies: TAKT_DEPENDENCIES_MOCK,
};
