import cx from 'classnames';
import { FmpAndonIssue } from '../../../../fmp-andon-issue/fmp-andon-issue';

import type { TaktDependency, ThemeFit } from '@fes/shared-types';

import './next-takt-dependencies.scss';

export type NextTaktDependenciesProps = {
  data?: TaktDependency[];
  fit?: ThemeFit;
};

type IconMapType = Record<TaktDependency['cheKind'], string>;

export const NextTaktDependencies = ({ data, fit }: NextTaktDependenciesProps) => {
  // split the red and yellow marked dependencies to show up based on "cheState"
  const errorDependencies = data?.filter((item) => item.cheState === 'error');
  const otherDependencies = data?.filter((item) => item.cheState !== 'error');

  const iconMap: IconMapType = {
    QC: 'crane',
    EH: 'crane',
    RTG: 'pallet',
    TT: 'truck-side',
  };

  const classNames = cx('next-takt-dependencies', {
    'next-takt-dependencies--mobile': fit === 'small',
    'next-takt-dependencies--single-column': otherDependencies?.length === 0,
  });

  return (
    <div className={classNames}>
      {errorDependencies && errorDependencies.length > 0 && (
        <div className="next-takt-dependencies__error">
          {errorDependencies.map((taktDependency) => {
            return (
              <div
                key={taktDependency.cheShortName}
                className="next-takt-dependencies__item"
              >
                <FmpAndonIssue
                  label={taktDependency.cheShortName}
                  icon={iconMap[taktDependency.cheKind]}
                  type="error"
                  andon={taktDependency.andon}
                  timestamp={taktDependency.taktDelayTime}
                  fit={fit}
                />
              </div>
            );
          })}
        </div>
      )}
      {otherDependencies && otherDependencies.length > 0 && (
        <div className="next-takt-dependencies__warning">
          {otherDependencies.map((taktDependency) => {
            return (
              <div
                key={taktDependency.cheShortName}
                className="next-takt-dependencies__item"
              >
                <FmpAndonIssue
                  fit={fit}
                  label={taktDependency.cheShortName}
                  icon={iconMap[taktDependency.cheKind]}
                  type={taktDependency.cheState || 'neutral'}
                  timestamp={taktDependency.taktDelayTime}
                  andon={taktDependency.andon}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
