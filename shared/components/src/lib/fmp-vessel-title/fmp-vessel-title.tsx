import { useTranslation } from '@fes/shared-i18n';
import { McIcon } from '@maersk-global/mds-react-wrapper';
import cx from 'classnames';
import { Typography } from '../typography/typography';

import type { HTMLAttributes, ReactNode } from 'react';

import './fmp-vessel-title.scss';

export type FmpVesselTitleProps = {
  icon?: 'vessel-front' | 'file-csv' | 'eye';
  vesselName: string;
} & HTMLAttributes<HTMLDivElement>;

export const FmpVesselTitle = ({
  icon = 'vessel-front',
  vesselName,
  className,
  ...rest
}: FmpVesselTitleProps): ReactNode => {
  const { t } = useTranslation();
  const classNames = cx('fmp-vessel-title', className);

  return (
    <div className={classNames} {...rest}>
      {vesselName && <McIcon icon={icon} />}
      <Typography
        type="text"
        size="medium"
        weight="normal"
        weak={!vesselName}
        className="fmp-vessel-title-name"
      >
        {vesselName || t('No Vessel')}
      </Typography>
    </div>
  );
};
