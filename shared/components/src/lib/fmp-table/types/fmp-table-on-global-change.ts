export type FmpTableOnGlobalChange<DATA_TYPE> = (props: {
  id: string;
  records: DATA_TYPE[];
}) => void;
