import cx from 'classnames';
import { CircuitPrimaryRTG1 } from '../circuit-primary-rtg1/circuit-primary-rtg1';

import type { TaktVisualisationValue } from '@fes/shared-types';

import './circuit-secondary.scss';
import { CSSProperties } from 'react';

export type CircuitSecondaryProps = {
  className?: string;
  values?: TaktVisualisationValue[];
};

export const CircuitSecondary = ({ className, values }: CircuitSecondaryProps) => {
  const classNames = cx(className, 'circuit-secondary');

  return (
    <div style={{ position: 'relative', top: -4 }}>
      {values?.map((value, index) => {
        const top = index * 4 * -1;

        const style: CSSProperties = { top };

        if (index === values.length - 1) {
          style.border = '0 none';
        }

        return (
          <div className={classNames} style={style}>
            <CircuitPrimaryRTG1
              className="circuit-secondary__item circuit-secondary__item--rtg"
              value={value}
            />
          </div>
        );
      })}
    </div>
  );
};
