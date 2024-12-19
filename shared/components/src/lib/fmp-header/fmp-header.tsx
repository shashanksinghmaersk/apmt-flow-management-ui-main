import cx from 'classnames';

import type { ThemeFit } from '@fes/shared-types';
import type { ReactNode } from 'react';

import './fmp-header.scss';

export type FmpHeaderProps = {
  InfoArea?: ReactNode;
  ActionArea?: ReactNode;
  className?: string;
  fit?: ThemeFit;
};

export const FmpHeader = ({
  InfoArea,
  ActionArea,
  className,
  fit = 'medium',
}: FmpHeaderProps): ReactNode => {
  const classNames = cx(className, 'fmp-header', {
    'fmp-header--mobile': fit === 'small',
  });

  return (
    <div className={classNames}>
      <div className="fmp-header__inner">
        <div className="fmp-header__info-area">{InfoArea}</div>
        {ActionArea && (
          <div className="fmp-header__action-area">
            {fit !== 'small' && (
              <div className="fmp-header__action-area-spacer" />
            )}
            <div className="fmp-header__action-area-item">{ActionArea}</div>
          </div>
        )}
      </div>
    </div>
  );
};
