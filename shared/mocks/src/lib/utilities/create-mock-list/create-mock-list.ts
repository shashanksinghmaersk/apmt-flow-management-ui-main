export type CreateMockListProps<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapper: Record<string, (value: any, index: number) => any>;
  data: T;
  items: number;
};

export const createMockList = <T>({
  data,
  items,
  mapper,
}: CreateMockListProps<T>): T[] => {
  const mockList: T[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setNestedValue = (obj: any, path: string, value: any) => {
    const keys = path.split('.');
    let current = obj;

    keys.slice(0, -1).forEach((key) => {
      if (!current[key]) {
        current[key] = {};
      }
      current = current[key];
    });

    current[keys[keys.length - 1]] = value;
  };

  for (let i = 0; i < items; i++) {
    const item = { ...data };

    for (const [key, fn] of Object.entries(mapper)) {
      // Traverse to the correct path and set the new value using the mapper function
      const keys = key.split('.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let value: any = item;

      for (const k of keys) {
        if (value[k] === undefined) {
          value = undefined;
          break;
        }
        value = value[k];
      }

      if (value !== undefined) {
        setNestedValue(item, key, fn(value, i + 1));
      }
    }

    mockList.push(item);
  }

  return mockList;
};
