import type { ItemOf, ApiMeta } from '@fes/shared-types';

export type SanitizeMetaOptionsToStringProps<T> = {
  meta?: ApiMeta<T>;
  record: T;
  id: keyof ItemOf<T>;
};

export function sanitizeMetaOptionsToString<T>({
  meta,
  record,
  id,
}: SanitizeMetaOptionsToStringProps<T>) {
  const recordIdKey = (meta?.idKey || '') as keyof T;
  let sanitizedStringOptions: string[] = [];
  const options = meta?.options?.[id];

  if (options) {
    if (Array.isArray(options)) {
      options.forEach((option) => {
        sanitizedStringOptions.push(option);
      });
    } else {
      for (const [idKeyValue, option] of Object.entries(options)) {
        if (record[recordIdKey] === Number(idKeyValue)) {
          sanitizedStringOptions = option;
        }
      }
    }
  }

  return sanitizedStringOptions;
}
