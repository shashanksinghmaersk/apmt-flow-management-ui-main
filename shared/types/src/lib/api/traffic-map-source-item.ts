import type { SourceSpecification } from 'maplibre-gl';

export type TrafficMapSourceItem = {
  id: string;
  type: 'CREATE' | 'UPDATE' | 'REMOVE';
  source: SourceSpecification;
};
