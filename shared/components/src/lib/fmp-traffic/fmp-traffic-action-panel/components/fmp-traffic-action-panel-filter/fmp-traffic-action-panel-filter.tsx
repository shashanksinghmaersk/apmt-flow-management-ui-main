import { McIcon, McMenu } from '@maersk-global/mds-react-wrapper';
import { useCallback } from 'react';

import type { ThemeFit } from '@fes/shared-types';

import './fmp-traffic-action-panel-filter.scss';

export type FmpTrafficActionPanelFilterProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (filters: any[]) => void;
  fit: ThemeFit;
};

export const FmpTrafficActionPanelFilter = ({
  onChange,
  fit,
}: FmpTrafficActionPanelFilterProps) => {
  const handleChange = useCallback(() => {
    onChange([]);
  }, [onChange]);

  return (
    <div className="fmp-traffic-action-panel-filter">
      <McMenu>
        <McIcon
          icon="bars-horizontal-funnel-down"
          slot="trigger"
          size={fit === 'small' ? '20' : '24'}
        />
        <div onClick={handleChange}>here</div>
      </McMenu>
    </div>
  );
};
