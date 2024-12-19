import cx from 'classnames';
import { CircuitNode } from '../circuit-node/circuit-node';

import type { TaktVisualisationValue } from '@fes/shared-types';

import './circuit-primary-rtg1.scss';

export type CircuitPrimaryRTG1Props = {
  value?: TaktVisualisationValue;
  className?: string;
};

export const CircuitPrimaryRTG1 = ({ value, className }: CircuitPrimaryRTG1Props) => {
  const classNames = cx(className, 'circuit-primary-rtg1');

  return (
    <div className={classNames}>
      <CircuitNode
        className="circuit-primary-rtg1__main"
        direction="left"
        node={value?.nodes.under}
      />
      <CircuitNode
        className="circuit-primary-rtg1__first"
        direction="left"
        node={value?.nodes.standBy}
      />
      <CircuitNode
        className="circuit-primary-rtg1__second"
        direction="left"
        node={value?.nodes.pull}
      />
    </div>
  );
};
