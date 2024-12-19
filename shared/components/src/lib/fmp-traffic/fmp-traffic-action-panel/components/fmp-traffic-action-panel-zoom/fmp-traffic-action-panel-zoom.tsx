import { useTranslation } from '@fes/shared-i18n';
import {
  McButtonGroup,
  McButtonGroupItem,
} from '@maersk-global/mds-react-wrapper';
import { useCallback } from 'react';
import { useFmpTrafficStore } from '../../../fmp-traffic-store/fmp-traffic-store.context';

import type { ThemeFit } from '@fes/shared-types';

import './fmp-traffic-action-panel-zoom.scss';

export type FmpTrafficActionPanelZoomProps = {
  fit: ThemeFit;
  zoom: number;
  minZoom: number;
  maxZoom: number;
  onChange: (zoom: number) => void;
};

export const FmpTrafficActionPanelZoom = ({
  fit,
  onChange,
}: FmpTrafficActionPanelZoomProps) => {
  const { t } = useTranslation();
  const { zoom, minZoom, maxZoom } = useFmpTrafficStore();

  const handleZoomChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: any) => {
      const value = event.detail.item.__value;
      let newZoom = 0;

      if (value === 'plus') {
        newZoom = zoom + 1;
        onChange(newZoom <= maxZoom ? newZoom : maxZoom);
      }

      if (value === 'minus') {
        newZoom = zoom - 1;
        onChange(newZoom >= minZoom ? newZoom : minZoom);
      }
    },
    [maxZoom, minZoom, onChange, zoom],
  );

  return (
    <div className="fmp-traffic-action-panel-zoom">
      <McButtonGroup listchange={handleZoomChange} fit={fit}>
        <McButtonGroupItem
          hiddenlabel
          icon="plus"
          value="plus"
          label={t('Zoom In')}
          disabled={zoom === maxZoom}
        />
        <McButtonGroupItem
          hiddenlabel
          icon="minus"
          value="minus"
          label={t('Zoom Out')}
          disabled={zoom === minZoom}
        />
      </McButtonGroup>
    </div>
  );
};
