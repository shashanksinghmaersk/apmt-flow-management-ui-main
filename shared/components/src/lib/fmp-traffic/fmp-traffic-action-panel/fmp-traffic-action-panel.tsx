import cx from 'classnames';
import { useCallback } from 'react';
import { FmpCard } from '../../fmp-card/fmp-card';
import { useFmpTrafficStore } from '../fmp-traffic-store/fmp-traffic-store.context';
import { FmpTrafficActionPanelActiveToggle } from './components/fmp-traffic-action-panel-active-toggle/fmp-traffic-action-panel-active-toggle';
import { FmpTrafficActionPanelFilter } from './components/fmp-traffic-action-panel-filter/fmp-traffic-action-panel-filter';
import { FmpTrafficActionPanelFlowSelect } from './components/fmp-traffic-action-panel-flow-select/fmp-traffic-action-panel-flow-select';
import { FmpTrafficActionPanelSearch } from './components/fmp-traffic-action-panel-search/fmp-traffic-action-panel-search';
import { FmpTrafficActionPanelZoom } from './components/fmp-traffic-action-panel-zoom/fmp-traffic-action-panel-zoom';

import type { ApiMetaFilter } from '@fes/shared-types';

import './fmp-traffic-action-panel.scss';

export type FmpTrafficActionPanelProps = {
  filters: ApiMetaFilter[];
};

export const FmpTrafficActionPanel = ({
  filters,
}: FmpTrafficActionPanelProps) => {
  const { updateFmpTrafficStore, zoom, minZoom, maxZoom } =
    useFmpTrafficStore();
  const classNames = cx('fmp-traffic-action-panel');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = useCallback((filters: any[]) => {
    console.log(filters);
  }, []);

  const handleFlowSelectChange = useCallback((filters: ApiMetaFilter[]) => {
    console.log(filters);
  }, []);

  const handleActiveToggleChange = useCallback((active: boolean) => {
    console.log(active);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    console.log(value);
  }, []);

  const handleZoomChange = useCallback(
    (zoom: number) => {
      updateFmpTrafficStore?.({ zoom });
    },
    [updateFmpTrafficStore],
  );

  return (
    <FmpCard className={classNames} elevation={1} fit="small">
      <FmpTrafficActionPanelFilter onChange={handleFilterChange} fit="small" />
      <FmpTrafficActionPanelFlowSelect
        filters={filters}
        onChange={handleFlowSelectChange}
        fit="small"
      />
      <FmpTrafficActionPanelActiveToggle
        onChange={handleActiveToggleChange}
        fit="small"
      />
      <FmpTrafficActionPanelSearch onChange={handleSearchChange} fit="small" />
      <FmpTrafficActionPanelZoom
        onChange={handleZoomChange}
        fit="small"
        zoom={zoom}
        minZoom={minZoom}
        maxZoom={maxZoom}
      />
    </FmpCard>
  );
};
