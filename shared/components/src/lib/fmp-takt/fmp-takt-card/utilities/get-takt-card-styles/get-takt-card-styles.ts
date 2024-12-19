import { getAppearanceValues } from '@fes/shared-theme';

import type { CSSProperties } from 'react';
import type {
  ThemeAppearance,
  ThemeAppearanceVariant,
} from '@fes/shared-types';

export type GetTaktCardStylesProps = {
  delayCode?: string | null;
  type: ThemeAppearance;
  variation?: ThemeAppearanceVariant;
  style?: CSSProperties;
};

export const getTaktCardStyles = ({
  type,
  variation = 'default',
  style = {},
  delayCode,
}: GetTaktCardStylesProps) => {
  const isNeutral = type === 'neutral';

  const baseAppearance = getAppearanceValues(type, variation);
  const neutralAppearance = getAppearanceValues('neutral', 'default');

  const borderThin = '1px';
  const borderThick = '6px';

  const borderLeftWidth = borderThin;
  const borderLeftColor = neutralAppearance.borderColor;

  const borderRightWidth = borderThin;
  const borderRightColor = neutralAppearance.borderColor;

  const borderBottomWidth = isNeutral ? borderThin : borderThick;
  const borderBottomColor = baseAppearance.borderColor;

  const borderTopWidth = delayCode
    ? borderThin
    : isNeutral
      ? borderThin
      : borderThick;
  const borderTopColor = baseAppearance.borderColor;

  const styles: CSSProperties = {
    borderTop: `${borderTopWidth} solid var(${borderTopColor})`,
    borderRight: `${borderRightWidth} solid var(${borderRightColor})`,
    borderBottom: `${borderBottomWidth} solid var(${borderBottomColor})`,
    borderLeft: `${borderLeftWidth} solid var(${borderLeftColor})`,
    borderRadius: `8px`,
    ...style,
  };

  return styles;
};
