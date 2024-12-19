import type { TaktDependency } from './takt-dependency';
import type { TaktDestination } from './takt-destination';
import type { TaktVisualisation } from './takt-visualisation';

export type Takt = {
  id: string;
  vessel: string | null;
  title: string | null;
  andon: boolean; // Will give red border
  longCrane: boolean;
  inactive: boolean;
  mode: 'FES' | 'TOS' | 'DPOS' | null;
  moveKind: 'LOAD' | 'DISCHARGE' | 'DUAL_CYCLING' | null;
  moveLocation: string | null;
  liftsPlanned: number | null;
  liftsExecuted: number | null;
  taktDelayTime: number | null;
  taktDependencies?: TaktDependency[] | null;
  taktDestinations?: TaktDestination[] | null;
  visualisation?: TaktVisualisation | null;
  delayCode?: string | null; // Will give red border if andon is true and yellow if not and a teleprompt
};
