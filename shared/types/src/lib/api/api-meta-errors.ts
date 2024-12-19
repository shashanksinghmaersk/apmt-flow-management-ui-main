import type { ApiMetaErrorsKey } from './api-meta-errors-key';

export type ApiMetaErrors<T> = Record<
  string | number,
  Record<ApiMetaErrorsKey<T>, string[]>
>;
