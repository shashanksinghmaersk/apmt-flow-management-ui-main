import type { ApiKey } from './api-key';
import type { ApiMetaErrors } from './api-meta-errors';
import type { ApiMetaFilter } from './api-meta-filter';
import type { ApiMetaOptions } from './api-meta-options';
import type { ApiMetaPagination } from './api-meta-pagination';

export type ApiMeta<T> = {
  idKey?: ApiKey<T>;
  errors?: ApiMetaErrors<T>;
  filters?: ApiMetaFilter[];
  options?: ApiMetaOptions<T>;
  pagination?: ApiMetaPagination;
};
