import { useTranslation } from '@fes/shared-i18n';
import { McInput } from '@maersk-global/mds-react-wrapper';
import { useCallback } from 'react';

import type { ThemeFit } from '@fes/shared-types';

import './fmp-traffic-action-panel-search.scss';

export type FmpTrafficActionPanelSearchProps = {
  onChange: (value: string) => void;
  fit: ThemeFit;
};

export const FmpTrafficActionPanelSearch = ({
  onChange,
  fit,
}: FmpTrafficActionPanelSearchProps) => {
  const { t } = useTranslation();

  const handleInputChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: any) => {
      const value = event.target.value;
      onChange(value);
    },
    [onChange],
  );

  return (
    <div className="fmp-traffic-action-panel-search">
      <McInput
        fit={fit}
        hiddenlabel
        icon="magnifying-glass"
        label={t('Search CHE')}
        clearbutton
        placeholder={t('Search CHE')}
        input={handleInputChange}
      />
    </div>
  );
};
