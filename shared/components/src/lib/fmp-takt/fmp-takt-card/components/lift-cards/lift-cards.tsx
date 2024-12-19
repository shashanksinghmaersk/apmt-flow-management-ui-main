import { useTimer } from '@fes/shared-hooks';
import { useTranslation } from '@fes/shared-i18n';
import { McIcon } from '@maersk-global/mds-react-wrapper';
import { useEffect } from 'react';
import { FmpLiftCard } from '../../../../fmp-lift-card/fmp-lift-card';

import type { Takt, ThemeFit } from '@fes/shared-types';

import './lift-cards.scss';

export type LiftCardProps = {
  data?: Takt;
  fit?: ThemeFit;
};

export const LiftCards = ({ data, fit }: LiftCardProps) => {
  const { t } = useTranslation();
  const { meta, timerStart } = useTimer({
    tickInterval: 1000,
    startAt: data?.taktDelayTime || 0,
  });

  const liftsExecutedTardy =
    (data?.liftsPlanned || 0) <= (data?.liftsExecuted || 0);

  let LiftsExecuted = (
    <div
      style={{ color: 'var(--mds_brand_appearance_error_default_text-color)' }}
    >
      {data?.liftsExecuted}
    </div>
  );

  if (liftsExecutedTardy) {
    LiftsExecuted = (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <McIcon icon="thumbs-up" style={{ marginRight: 2 }} />
        <span>{data?.liftsExecuted}</span>
      </div>
    );
  }

  useEffect(() => {
    if (data?.taktDelayTime) {
      timerStart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasTaktTimeout = !!(data?.taktDelayTime && data.taktDelayTime >= 1);

  return (
    <div className="lift-cards">
      <div className="lift-cards__main">
        <FmpLiftCard
          className="lift-cards__main-planned"
          label={t('Lifts Planned')}
          content={data?.liftsPlanned || '--'}
        />
        <FmpLiftCard
          className="lift-cards__main-executed"
          label={t('Lifts Executed')}
          content={data?.liftsExecuted ? LiftsExecuted : '--'}
        />
        {fit !== 'small' && hasTaktTimeout && (
          <FmpLiftCard
            className="lift-cards__main-takt-delay"
            label={t('TAKT Delay time')}
            content={
              <div className="fmp-takt-card__footer-takt-delay">
                <McIcon icon="clock" style={{ marginRight: 2 }} />
                <span>{meta.numericElapsed}s</span>
              </div>
            }
          />
        )}
      </div>
      {fit === 'small' && hasTaktTimeout && (
        <FmpLiftCard
          className="lift-cards__main-takt-delay lift-cards__main-takt-delay--mobile"
          label={t('TAKT Delay time')}
          content={
            <div className="fmp-takt-card__footer-takt-delay">
              <McIcon icon="clock" style={{ marginRight: 2 }} />
              <span>{meta.numericElapsed}s</span>
            </div>
          }
        />
      )}
    </div>
  );
};
