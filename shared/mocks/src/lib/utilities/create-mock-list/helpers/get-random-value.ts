// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRandomValue = (values: any[]) =>
  values[Math.floor(Math.random() * values.length)];
