import { McIcon } from '@maersk-global/mds-react-wrapper';
import cx from 'classnames';
import { useCallback, useState } from 'react';
import { FmpBox } from '../../fmp-box/fmp-box';
import { FmpTeleprompt } from '../../fmp-teleprompt/fmp-teleprompt';
import { FmpVesselTitle } from '../../fmp-vessel-title/fmp-vessel-title';
import { FmpTaktVisualisation } from '../fmp-takt-visualisation/fmp-takt-visualisation';
import { ExpandedView } from './components/expanded-view/expanded-view';
import { LiftCards } from './components/lift-cards/lift-cards';
import { NextTaktDependencies } from './components/next-dependencies/next-takt-dependencies';
import { TaktInfo } from './components/takt-info/takt-info';
import { getTaktCardStyles } from './utilities/get-takt-card-styles/get-takt-card-styles';

import type {
  Takt,
  TaktCardViewType,
  ThemeAppearanceVariant,
  ThemeFit,
} from '@fes/shared-types';
import type { CSSProperties } from 'react';

import './fmp-takt-card.scss';

export type FmpTaktCardProps = {
  data?: Takt;
  viewType?: TaktCardViewType;
  fit?: ThemeFit;
  variation?: ThemeAppearanceVariant;
  style?: CSSProperties;
  className?: string;
};

export const FmpTaktCard = ({
  className,
  style = {},
  variation,
  data,
  viewType,
  fit,
}: FmpTaktCardProps) => {
  const [expanded, setExpanded] = useState(!data?.taktDependencies);
  const type = data?.andon ? 'error' : data?.delayCode ? 'warning' : 'neutral';

  const styles = getTaktCardStyles({
    type,
    variation,
    delayCode: data?.delayCode,
    style,
  });

  const classNames = cx(className, 'fmp-takt-card', {
    'fmp-takt-card--disabled': data?.inactive === true,
    'fmp-takt-card--mobile': fit === 'small',
  });

  const handleExpandToggle = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  return (
    <div style={styles} className={classNames}>
      {data?.delayCode && (
        <FmpBox className="fmp-takt-card__delay-code" appearance={type}>
          <FmpTeleprompt
            className="fmp-takt-card__delay-code-teleprompt"
            typographyProps={{ size: 'x-small', weight: 'bold' }}
            text={data.delayCode}
          />
        </FmpBox>
      )}
      <div className="fmp-takt-card__primary">
        <div className="fmp-takt-card__header">
          <FmpVesselTitle
            className="fmp-takt-card__header-vessel"
            vesselName={data?.vessel || ''}
          />
          <div className="fmp-takt-card__header-action">
            {data?.taktDestinations && data.taktDestinations.length > 0 && (
              <div className="fmp-takt-card__header-action-expander">
                <McIcon
                  icon={expanded ? 'chevron-down' : 'chevron-right'}
                  onClick={handleExpandToggle}
                />
              </div>
            )}
          </div>
        </div>
        <div className="fmp-takt-card__info">
          <TaktInfo data={data} fit={fit} />
        </div>
        <LiftCards key={`${data?.id}-${data?.taktDelayTime}`} fit={fit} data={data} />
      </div>
      <div className="fmp-takt-card__footer">
        {viewType === 'list-view' && data?.taktDependencies && (
          <div className="fmp-takt-card__dependencies">
            <NextTaktDependencies fit={fit} data={data.taktDependencies} />
          </div>
        )}
        {viewType === 'flow-view' && data?.visualisation && (
          <FmpTaktVisualisation visualisation={data.visualisation} />
        )}
      </div>
      {expanded && data?.taktDestinations && (
        <div className="fmp-takt-card__expanded-view">
          <ExpandedView fit={fit} data={data.taktDestinations} />
        </div>
      )}
    </div>
  );
};
