import { useTranslation } from '@fes/shared-i18n';
import { getAppearanceValues } from '@fes/shared-theme';
import { McIcon } from '@maersk-global/mds-react-wrapper';
import { motion } from 'framer-motion';
import { TruckRight, TruckRightUnladen } from '../../../../fmp-icons';
import { Typography } from '../../../../typography/typography';

import type { TrafficBuffer } from '@fes/shared-types';

import './fmp-traffic-buffer-panel-header.scss';

export type FmpBufferPanelHeaderProps = {
  onToggleCollapse: () => void;
  data?: TrafficBuffer;
  collapsed: boolean;
};

export const FmpBufferPanelHeader = ({
  onToggleCollapse,
  data,
  collapsed,
}: FmpBufferPanelHeaderProps) => {
  const { t } = useTranslation();

  const { backgroundColor: errorTextColor } = getAppearanceValues(
    'error',
    'default',
  );
  const { backgroundColor: successTextColor } = getAppearanceValues(
    'success',
    'default',
  );

  return (
    <div className="fmp-traffic-buffer-panel-header" onClick={onToggleCollapse}>
      <div className="fmp-traffic-buffer-panel-header__info">
        <Typography className="fmp-traffic-buffer-panel-header__info-title">
          {t('BUFFER AREA')}
        </Typography>
        <div className="fmp-traffic-buffer-panel-header__info-data">
          <div className="fmp-traffic-buffer-panel-header__info-data-item">
            <TruckRight />
            <Typography
              style={{
                color: data?.trucksLadenAndon
                  ? `var(${errorTextColor})`
                  : `var(${successTextColor})`,
              }}
            >
              {data?.trucksLaden}
            </Typography>
          </div>
          <span>/</span>
          <div className="fmp-traffic-buffer-panel-header__info-data-item">
            <TruckRightUnladen />
            <Typography
              style={{
                color: data?.trucksUnladenAndon
                  ? errorTextColor
                  : successTextColor,
              }}
            >
              {data?.trucksUnladen}
            </Typography>
          </div>
        </div>
      </div>
      <motion.div
        className="fmp-traffic-buffer-panel-header__action"
        variants={{ collapsed: { rotateX: 180 }, expanded: { rotateX: 0 } }}
        initial="collapsed"
        animate={collapsed ? 'collapsed' : 'expanded'}
        transition={{ duration: 0.5 }}
        style={{ display: 'inline-block' }}
      >
        <McIcon icon="chevron-down" />
      </motion.div>
    </div>
  );
};
