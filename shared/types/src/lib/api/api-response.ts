import type { ApiMeta } from './api-meta';

export type ApiResponse<T, G = T> = {
  data?: G;
  meta?: ApiMeta<T>;
};
