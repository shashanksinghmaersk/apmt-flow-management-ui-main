export type QueryUrlProps = {
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values?: Record<string, any>;
};

export const queryUrl = ({ url, values = {} }: QueryUrlProps) => {
  const searchParams = new URLSearchParams();

  Object.keys(values).forEach((key) => {
    const value = values[key];
    if (Array.isArray(value)) {
      // If the value is an array, append each item individually
      value.forEach((item) => searchParams.append(key, String(item)));
    } else if (typeof value === 'object' && value !== null) {
      // If the value is an object, stringify it
      searchParams.append(key, JSON.stringify(value));
    } else {
      // Otherwise, append the value as a string
      searchParams.append(key, String(value));
    }
  });

  const searchParamsString = searchParams.toString();
  const separator = url.includes('?') ? '&' : '?';
  url += `${separator}${searchParamsString}`;

  return url;
};
