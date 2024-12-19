import cx from 'classnames';
import { CircuitPrimary } from './components/circuit-primary/circuit-primary';
import { CircuitSecondary } from './components/circuit-secondary/circuit-secondary';

import type { TaktVisualisation } from '@fes/shared-types';

import './fmp-takt-visualisation.scss';

export type FmpTaktVisualisationProps = {
  className?: string;
  visualisation?: TaktVisualisation | null;
};

export const FmpTaktVisualisation = ({
  className,
  visualisation,
}: FmpTaktVisualisationProps) => {
  const classNames = cx(className, 'fmp-takt-visualisation');

  return (
    <div>
      {visualisation && (
        <div className={classNames}>
          <div className={'fmp-takt-visualisation__inner'}>
            {visualisation?.qc && (
              <CircuitPrimary
                className="fmp-takt-visualisation__primary"
                value={visualisation?.qc}
              />
            )}
            {visualisation?.yardChe && (
              <CircuitSecondary
                className="fmp-takt-visualisation__secondary"
                values={visualisation?.yardChe}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
