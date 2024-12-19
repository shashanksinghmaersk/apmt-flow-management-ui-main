import type { OpsPinningDetailDetails } from './ops-pinning-detail-details';

export type OpsPinningDetail = {
  title: string;
  startTime: string; //'2023-11-06T12:53:41';
  reason: string[];
  details: OpsPinningDetailDetails[];
};
