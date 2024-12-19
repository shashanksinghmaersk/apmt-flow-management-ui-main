import type { ApiMetaOptionsKey } from './api-meta-options-key';

export type ApiMetaOptionsItem<T> = Record<
  ApiMetaOptionsKey<T> | string | number,
  string[] | Record<ApiMetaOptionsKey<T>, string[]>
>;
