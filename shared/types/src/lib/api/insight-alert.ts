export type InsightAlert = {
  exceptionId: number;
  severity: string;
  duration: string | number;
  durationStatus: 'error' | 'warning' | 'info' | 'critical' | null;
  dueTime: string | null;
  dueTimeStatus?: 'error' | 'warning' | 'info' | 'critical' | null;
  object: string | null;
  objectId: string | number;
  count: string | number;
  summary: string;
};
