import { useTranslation } from '@fes/shared-i18n';
import cx from 'classnames';
import { FmpTag } from '../../../../fmp-tag/fmp-tag';
import { Typography } from '../../../../typography/typography';

import type { Takt, ThemeAppearance, ThemeFit } from '@fes/shared-types';

import './takt-info.scss';

export type TaktInfoProps = {
  data?: Takt;
  fit?: ThemeFit;
};

export const TaktInfo = ({ data, fit }: TaktInfoProps) => {
  const { t } = useTranslation();

  const modeAppearance = cx({
    success: data?.mode === 'FES',
    warning: data?.mode !== 'FES',
  }) as ThemeAppearance;

  return (
    <div className="takt-info">
      <div className="takt-info__information">
        <Typography type="headline" size="small" weight="bold">
          {data?.title}
        </Typography>
        {data?.inactive ? (
          <FmpTag fit={fit} appearance="neutral-weak">
            {t('Inactive')}
          </FmpTag>
        ) : (
          <>
            {data?.moveKind && (
              <FmpTag fit={fit} appearance="neutral-weak">
                {t(data.moveKind)} {data.moveLocation}
              </FmpTag>
            )}
            {data?.longCrane && (
              <FmpTag fit={fit} appearance="info">
                {t('Long')}
              </FmpTag>
            )}
          </>
        )}
      </div>
      {!data?.inactive && (
        <div className="takt-info__action">
          {data?.mode && (
            <FmpTag fit={fit} appearance={modeAppearance}>
              {data.mode}
            </FmpTag>
          )}
        </div>
      )}
    </div>
  );
};
