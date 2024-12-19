import type { ApiMeta } from './api-meta';

export type ApiRequest<T> = {
  data?: T;
  meta?: ApiMeta<T>;
};
