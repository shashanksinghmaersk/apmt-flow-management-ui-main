import { getAppearanceValues } from '@fes/shared-theme';
import cx from 'classnames';

import type { ThemeAppearance, ThemeAppearanceVariant } from '@fes/shared-types';
import type { CSSProperties, HTMLAttributes } from 'react';

export type FmpBoxProps = {
  appearance?: ThemeAppearance;
  variation?: ThemeAppearanceVariant;
} & HTMLAttributes<HTMLDivElement>;

export const FmpBox = ({
  appearance,
  variation,
  children,
  className,
  style: _style = {},
  ...rest
}: FmpBoxProps) => {
  const mdsColor = getAppearanceValues(appearance || 'neutral', variation || 'default');

  const classNames = cx('fmp-box', className);

  const style: CSSProperties = { ..._style };

  if (appearance) {
    style.backgroundColor = `var(${mdsColor.backgroundColor})`;
    style.color = `var(${mdsColor.onBackgroundColor})`;
  }

  return (
    <div className={classNames} style={style} {...rest}>
      {children}
    </div>
  );
};
