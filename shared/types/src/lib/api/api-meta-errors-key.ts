import type { ItemOf } from '../utilities';

export type ApiMetaErrorsKey<T> = keyof ItemOf<T>;
