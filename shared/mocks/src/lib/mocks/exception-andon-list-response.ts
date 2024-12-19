import { createMockList } from '../utilities';
import { getRandomValue } from '../utilities/create-mock-list';
import { EXCEPTION_ANDON_MOCK } from './exception-andon';

import type { ExceptionAndonListResponse } from '@fes/shared-types';

export const EXCEPTION_ANDON_LIST_MOCK = createMockList({
  data: EXCEPTION_ANDON_MOCK,
  mapper: {
    id: (_, i) => `${i}`,
    andonStatus: () => getRandomValue(['Open', 'Closed']),
    che: (v, i) => `${v}${i}`,
    type: () => getRandomValue(['Ops', 'Tech']),
    investigation: () => getRandomValue(['Open', 'Closed', 'Not Taken']),
  },
  items: 10,
});

export const EXCEPTION_ANDON_LIST_RESPONSE_MOCK: ExceptionAndonListResponse = {
  data: EXCEPTION_ANDON_LIST_MOCK,
};
