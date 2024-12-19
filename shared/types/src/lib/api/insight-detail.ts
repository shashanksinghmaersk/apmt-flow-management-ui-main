import type { InsightDetailDetails } from './insight-detail-details';

export type InsightDetail = {
  title: string;
  startTime: string; //'2023-11-06T12:53:41';
  reason: string[];
  details: InsightDetailDetails[];
};
