export type ItemOf<T> = T extends Array<infer U> ? U : T;
