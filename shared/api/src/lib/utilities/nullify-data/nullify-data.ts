export type NullifyDataProps<T> = {
  data?: T[];
  omit: (keyof T)[];
};

export function nullifyData<T>({ data = [], omit = [] }: NullifyDataProps<T>) {
  const newData: T[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data.forEach((record: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newRecord: any = {};

    for (const [_key, value] of Object.entries(record)) {
      const key = _key as keyof T;

      if (!omit.includes(key)) {
        newRecord[key] = null;
      } else {
        newRecord[key] = value;
      }
    }

    newData.push(newRecord);
  });

  return newData as T[];
}
