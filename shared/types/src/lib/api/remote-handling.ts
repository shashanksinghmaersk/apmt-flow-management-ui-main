import type { RemoteHandlingItem } from './remote-handling-item';
import type { RemoteHandlingKey } from './remote-handling-key';

export type RemoteHandling = Record<RemoteHandlingKey, RemoteHandlingItem[]>;
