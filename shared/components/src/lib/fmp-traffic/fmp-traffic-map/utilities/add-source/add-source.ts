import type { TrafficMapSourceItem } from '@fes/shared-types';
import type { Map } from 'maplibre-gl';

export const addSource = (map: Map, source: TrafficMapSourceItem[] = []) => {
  source.forEach((item) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sourceItem = map.getSource(item.id) as any;

    switch (item.type) {
      case 'CREATE':
        map.addSource(item.id, item.source);
        break;
      case 'UPDATE':
        sourceItem?.setData(item.source);
        break;
      default:
        break;
    }
  });
};
