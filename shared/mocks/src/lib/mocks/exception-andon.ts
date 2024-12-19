import data from './data/exception-andon.json';

import type { ExceptionAndon } from '@fes/shared-types';

export const EXCEPTION_ANDON_MOCK: ExceptionAndon = {
  ...(data as ExceptionAndon),
};
