import { McButton, McList, McMenu } from '@maersk-global/mds-react-wrapper';
import cx from 'classnames';
import { FmpCountNotification } from '../fmp-count-notification/fmp-count-notification';

import type { ThemeFit } from '@fes/shared-types';
import type { ReactNode } from 'react';

import './fmp-menu-button.scss';

export type FmpMenuButtonProps = {
  fit?: ThemeFit;
  className?: string;
  children?: ReactNode;
  count?: number;
  label?: string;
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'left-top'
    | 'left-center'
    | 'left-bottom'
    | 'right-top'
    | 'right-center'
    | 'right-bottom';
};

export const FmpMenuButton = ({
  fit,
  className,
  children,
  label,
  count,
  position = 'bottom-right',
}: FmpMenuButtonProps) => {
  const classNames = cx(className, 'fmp-menu-button');

  return (
    <div className={classNames}>
      <McMenu position={position}>
        <McButton
          icon="chevron-left"
          slot="trigger"
          hiddenlabel
          fit={fit}
          label={label}
          variant="outlined"
          appearance="neutral"
        />
        <McList>{children}</McList>
      </McMenu>
      {!!count && (
        <FmpCountNotification
          className="fmp-menu-button__counter"
          appearance="primary"
          count={count}
          fit={fit}
        />
      )}
    </div>
  );
};
