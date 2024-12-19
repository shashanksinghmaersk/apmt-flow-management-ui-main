import type { InsightAlert, InsightAlertListResponse } from '@fes/shared-types';

export const INSIGHTS_ALERTS_MOCK_DATA: InsightAlert[] = [
  {
    exceptionId: 23,
    severity: 'Critical',
    duration: '21:19',
    durationStatus: 'critical',
    dueTime: '07:25',
    dueTimeStatus: 'error',
    object: 'Work Insturuction',
    objectId: 'EH5',
    count: 1,
    summary: 'Missing PutCHE',
  },
  {
    exceptionId: 21,
    severity: 'Critical',
    duration: '21:19',
    durationStatus: 'critical',
    dueTime: '07:25',
    dueTimeStatus: 'error',
    object: 'Work Insturuction',
    objectId: 'EH5',
    count: 1,
    summary: 'Missing PutCHE',
  },
  {
    exceptionId: 12,
    severity: 'Critical',
    duration: '21:19',
    durationStatus: 'critical',
    dueTime: '07:25',
    dueTimeStatus: 'error',
    object: 'Work Insturuction',
    objectId: 'EH5',
    count: 1,
    summary: 'Missing PutCHE',
  },
];

export const INSIGHTS_MOCK_RESPONSE: InsightAlertListResponse = {
  data: INSIGHTS_ALERTS_MOCK_DATA,
  meta: {
    pagination: {
      page: 1,
      hasNextPage: false,
      hasPreviousPage: true,
      itemsPerPage: 6,
      totalItems: 12,
      totalPages: 2,
    },
    filters: [
      {
        key: 'severity',
        type: 'field',
        enabled: true,
      },
      {
        key: 'duration',
        type: 'field',
        enabled: true,
      },
      {
        key: 'duetime',
        type: 'field',
        enabled: true,
      },
    ],
    options: {},
  },
};
