import { useTemplateColumns } from '@fes/shared-hooks';
import cx from 'classnames';

import type { ThemeFit } from '@fes/shared-types';
import type { ReactNode } from 'react';

import './fmp-page-grid.scss';

export type FmpPageGridProps = {
  fit?: ThemeFit;
  className?: string;
  children?: ReactNode;
  layout?: number[];
  breakpoints?: number[];
};

export const FmpPageGrid = ({
  className,
  children,
  fit,
  layout,
  breakpoints,
}: FmpPageGridProps) => {
  const { gridTemplateColumns } = useTemplateColumns({ layout, breakpoints });

  const classNames = cx(className, 'fmp-page-grid', {
    'fmp-page-grid--mobile': fit === 'small',
  });

  return (
    <div className={classNames} style={{ gridTemplateColumns }}>
      {children}
    </div>
  );
};
