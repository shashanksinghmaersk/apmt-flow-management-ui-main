import type { TaktDestinationStatus } from './takt-destination-status';

export type TaktDestination = {
  cheId: string | null;
  instruction: string | null;
  destination: string | null;
  status: TaktDestinationStatus;
};
