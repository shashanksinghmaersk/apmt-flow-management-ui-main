import cx from 'classnames';
import { CircuitNode } from '../circuit-node/circuit-node';

import type { TaktVisualisationValue } from '@fes/shared-types';

import './circuit-primary.scss';

export type CircuitPrimaryProps = {
  className?: string;
  value?: TaktVisualisationValue;
};

export const CircuitPrimary = ({ className, value }: CircuitPrimaryProps) => {
  const classNames = cx(className, 'circuit-primary');

  return (
    <div className={classNames}>
      <div className="circuit-primary__item">
        <CircuitNode
          className="circuit-primary__item-pull"
          direction="right"
          node={value?.nodes.pull}
        />
        <CircuitNode
          className="circuit-primary__item-standby"
          direction="right"
          node={value?.nodes.standBy}
        />
        <CircuitNode
          className="circuit-primary__item-under"
          direction="right"
          node={value?.nodes.under}
        />
      </div>
    </div>
  );
};
