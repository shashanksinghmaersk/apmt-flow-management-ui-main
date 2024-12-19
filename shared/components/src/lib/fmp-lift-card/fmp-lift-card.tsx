import cx from 'classnames';
import { Typography } from '../typography/typography';

import type { ReactNode } from 'react';

import './fmp-lift-card.scss';

export type FmpLiftCardProps = {
  label: ReactNode;
  content: ReactNode;
  className?: string;
};

export const FmpLiftCard = ({
  label,
  content,
  className,
}: FmpLiftCardProps) => {
  const classNames = cx(className, 'fmp-lift-card');

  return (
    <div className={classNames}>
      <Typography
        type="text"
        size="x-small"
        weight="medium"
        className="fmp-lift-card__label"
      >
        {label}
      </Typography>
      <div className="fmp-lift-card__actual">
        <Typography
          type="headline"
          size="small"
          weight="bold"
          className="fmp-lift-card__actual-number"
        >
          {content}
        </Typography>
      </div>
    </div>
  );
};
