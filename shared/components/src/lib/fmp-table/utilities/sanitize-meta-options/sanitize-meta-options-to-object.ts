import type { ItemOf, ApiMeta } from '@fes/shared-types';

export type SanitizeMetaOptionsToObjectProps<T> = {
  meta?: ApiMeta<T>;
  record: T;
  id: keyof ItemOf<T>;
  t?: (s: string) => string;
};

export function sanitizeMetaOptionsToObject<T>({
  meta,
  record,
  id,
  t = (s) => s,
}: SanitizeMetaOptionsToObjectProps<T>) {
  const recordIdKey = (meta?.idKey || '') as keyof T;
  const sanitizedObjectOptions: { label: string; value: string }[] = [];
  const options = meta?.options?.[id];

  if (options) {
    if (Array.isArray(options)) {
      options.forEach((option) => {
        sanitizedObjectOptions.push({ label: t(option), value: option });
      });
    } else {
      for (const [idKeyValue, option] of Object.entries(options)) {
        const keyIsNumber = typeof record[recordIdKey] === 'number';
        let keyValue: string | number = idKeyValue;

        if (keyIsNumber) {
          keyValue = Number(idKeyValue);
        }

        if (record[recordIdKey] === keyValue) {
          sanitizedObjectOptions.push({ label: t(option), value: option });
        }
      }
    }
  }

  return sanitizedObjectOptions;
}
