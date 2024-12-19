export type ApiMetaFilter = {
  key: string;
  type: 'field' | 'record' | 'category';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  label?: string;
  table?: string;
  enabled: boolean;
  totalRecords?: number;
  dataMode?: 'options' | 'value'; // Populate width records of unique values or limited available options
  records?: ApiMetaFilter[];
};
