import { useTranslation } from '@fes/shared-i18n';
import { useCallback, useEffect, useState } from 'react';
import { FmpDrawer } from '../../fmp-drawer/fmp-drawer';
import { FmpTable } from '../../fmp-table';
import { Typography } from '../../typography/typography';

import type { InsightDetail, InsightDetailDetails } from '@fes/shared-types';

import { insightsDetailsColumns } from './fmp-insights-details-columns';
import './fmp-insights-details.scss';

export type FmpInsightsDetailsProps = {
  details?: InsightDetail;
};

export const FmpInsightsDetails = ({
  details: _details,
}: FmpInsightsDetailsProps) => {
  const { t } = useTranslation();
  const [drawerDetails, setDrawerDetails] = useState<InsightDetail>();

  const handleDrawerClose = useCallback(() => {
    setDrawerDetails(undefined);
  }, []);

  useEffect(() => {
    setDrawerDetails(_details);
  }, [_details]);

  const originalDate = new Date(drawerDetails?.startTime || 0);
  const formattedDate =
    originalDate.toLocaleDateString('en-GB') +
    ' ' +
    originalDate.toLocaleTimeString('en-GB');

  console.log(drawerDetails);

  return (
    <FmpDrawer
      preventBackground
      className="fmp-insights-details"
      open={!!drawerDetails}
      onClose={handleDrawerClose}
      style={{ width: 500 }}
      title={drawerDetails?.title}
    >
      <div className="fmp-insights-details__section">
        <Typography
          className="fmp-insights-details__label"
          weak
          weight="bold"
          size="x-small"
        >
          {t('Start Time')}
        </Typography>
        <Typography className="fmp-insights-details__text" weak>
          {formattedDate}
        </Typography>
      </div>
      <div className="fmp-insights-details__section">
        <Typography
          className="fmp-insights-details__label"
          weak
          weight="bold"
          size="x-small"
        >
          {t('Reason')}
        </Typography>
        <ul className="fmp-insights-details__reasons">
          {drawerDetails?.reason?.map((reason) => {
            return (
              <Typography tag="li" className="fmp-insights-details__text">
                {reason}
              </Typography>
            );
          })}
        </ul>
      </div>
      <div className="fmp-insights-details__section">
        <FmpTable<InsightDetailDetails>
          dataKey="vesselVisitID"
          data={drawerDetails?.details}
          columns={insightsDetailsColumns}
          fit="small"
        />
      </div>
    </FmpDrawer>
  );
};
