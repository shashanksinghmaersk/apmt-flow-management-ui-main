import { useTranslation } from '@fes/shared-i18n';
import { McIcon } from '@maersk-global/mds-react-wrapper';
import { Typography } from '../../../typography/typography';

import './fmp-table-empty.scss';

export type FmpTableEmptyProps<T> = {
  data?: T[];
  loadingError?: boolean;
  loading?: boolean;
  updating?: boolean;
  top: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FmpTableEmpty = <T extends Record<string, any>>({
  data,
  loadingError,
  loading,
  updating,
  top,
}: FmpTableEmptyProps<T>) => {
  const { t } = useTranslation();

  return (
    <>
      {(!data || (data && data.length < 1)) &&
        !loadingError &&
        !loading &&
        !updating && (
          <div className="fmp-table-empty" style={{ top }}>
            <div className="fmp-table-empty__icon">
              <McIcon size="24" icon="exclamation-triangle" />
            </div>
            <Typography className="fmp-table-empty__text" size="large">
              {t('No Data')}
            </Typography>
          </div>
        )}
      {loadingError && (
        <div className="fmp-table-empty" style={{ top }}>
          <div className="fmp-table-empty__icon">
            <McIcon size="24" icon="lightning" />
          </div>
          <Typography className="fmp-table-empty__text" size="large">
            {t('Connection Error')}
          </Typography>
        </div>
      )}
    </>
  );
};
