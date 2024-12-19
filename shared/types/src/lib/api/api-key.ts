import type { ItemOf } from '../utilities';

export type ApiKey<T> = keyof ItemOf<T>;
