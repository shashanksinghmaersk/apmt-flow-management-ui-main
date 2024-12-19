import { McTag } from '@maersk-global/mds-react-wrapper';
import cx from 'classnames';

import type { ThemeFit } from '@fes/shared-types';
import type { TagAppearance } from '@maersk-global/mds-components-core/types';
import type { HTMLAttributes, ReactNode } from 'react';

import './fmp-tag.scss';

export type FmpTagProps = {
  appearance?: TagAppearance | 'critical';
  children?: ReactNode;
  className?: string;
  critical?: boolean;
  fit?: ThemeFit;
} & HTMLAttributes<HTMLDivElement>;

export const FmpTag = ({
  appearance: _appearance = 'neutral-default',
  children,
  className,
  critical,
  fit,
  ...rest
}: FmpTagProps) => {
  const appearance: TagAppearance = _appearance === 'critical' ? 'neutral' : _appearance;

  const classNames = cx(className, 'fmp-tag', {
    [`fmp-tag--${fit}`]: !!fit,
    'fmp-tag--critical': !!critical || _appearance === 'critical',
  });

  return (
    <div className={classNames} {...rest}>
      <McTag fit={fit} appearance={appearance}>
        {children}
      </McTag>
    </div>
  );
};
