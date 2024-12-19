import { useTranslation } from '@fes/shared-i18n';
import { Typography } from '../../../typography/typography';

import './fmp-table-spinner.scss';

export type FmpTableSpinnerProps = {
  loading?: boolean;
  updating?: boolean;
  top?: number;
};

export const FmpTableSpinner = ({
  loading,
  updating,
  top = 0,
}: FmpTableSpinnerProps) => {
  const { t } = useTranslation();

  return loading || updating ? (
    <div className="fmp-table-spinner" style={{ top }}>
      <div className="fmp-table-spinner__background" />
      <div className="fmp-table-spinner__content">
        <div className="fmp-table-spinner__content-animation" />
        <Typography type="headline" size="small" weight="medium">
          {loading ? t('LOADING') : t('UPDATING')}
        </Typography>
      </div>
    </div>
  ) : null;
};
