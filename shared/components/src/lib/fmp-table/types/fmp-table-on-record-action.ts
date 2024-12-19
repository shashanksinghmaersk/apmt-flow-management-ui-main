export type FmpTableOnRecordAction<DATA_TYPE> = (
  actionId: string,
  record: DATA_TYPE,
  value?: string | number | boolean,
) => void;
