import type { ItemOf } from '../utilities';

export type ApiMetaOptionsKey<T> = keyof ItemOf<T>;
