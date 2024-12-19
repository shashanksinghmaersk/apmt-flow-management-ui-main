import { McSwitch } from '@maersk-global/mds-react-wrapper';
import { useTranslation } from '@fes/shared-i18n';

import type { ThemeFit } from '@fes/shared-types';

import './fmp-traffic-action-panel-active-toggle.scss';

export type FmpTrafficActionPanelActiveToggleProps = {
  onChange: (active: boolean) => void;
  fit: ThemeFit;
};

export const FmpTrafficActionPanelActiveToggle = ({
  fit,
}: FmpTrafficActionPanelActiveToggleProps) => {
  const { t } = useTranslation();

  return (
    <div className="fmp-traffic-action-panel-active-toggle">
      <McSwitch fit={fit} label={t('Active only')} />
    </div>
  );
};
