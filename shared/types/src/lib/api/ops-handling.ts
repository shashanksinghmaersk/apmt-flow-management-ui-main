import type { OpsHandlingItem } from './ops-handling-item';
import { OpsHandlingKey } from './ops-handling-key';

export type OpsHandling = Record<OpsHandlingKey, OpsHandlingItem[]>;
