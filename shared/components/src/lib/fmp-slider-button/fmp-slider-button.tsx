import { getAppearanceValues } from '@fes/shared-theme';
import { McButton, McIcon } from '@maersk-global/mds-react-wrapper';
import cx from 'classnames';
import { motion } from 'framer-motion';
import { useState } from 'react';

import type {
  ThemeButtonAppearance,
  ThemeAppearanceVariant,
  ThemeFit,
  ThemeAppearance,
} from '@fes/shared-types';
import type { CSSProperties } from 'react';

import './fmp-slider-button.scss';

export type FmpSliderButtonProps<T, G = T> = {
  initial: 'left' | 'right';
  leftIcon?: string;
  rightIcon?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  leftValue?: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rightValue?: G;
  onChange?: (value?: T | G) => void;
  disabled?: boolean;
  fit?: ThemeFit;
  className?: string;
  label?: string;
  appearance?: ThemeButtonAppearance;
  variant?: ThemeAppearanceVariant;
  style?: CSSProperties;
};

export const FmpSliderButton = <T, G = T>({
  appearance = 'primary',
  initial,
  disabled,
  leftIcon,
  onChange,
  rightIcon,
  className,
  label,
  leftValue,
  rightValue,
  variant = 'default',
  fit: size = 'medium',
  style = {},
}: FmpSliderButtonProps<T, G>) => {
  const [state, setState] = useState(initial);
  const appearances = getAppearanceValues(
    appearance as ThemeAppearance,
    variant,
  );

  const classNames = cx(className, 'fmp-slider-button', {
    [`fmp-slider-button--size-${size}`]: true,
    'fmp-slider-button--disabled': disabled,
  });

  const handleChange = () => {
    setState((state) => {
      const newState = state === 'left' ? 'right' : 'left';
      onChange?.(newState === 'left' ? leftValue : rightValue);
      return newState;
    });
  };

  return (
    <div
      className={classNames}
      onClick={handleChange}
      style={{
        ...style,
        border: `1px solid var(${appearances.borderColor})`,
      }}
    >
      <div className="fmp-slider-button__icon fmp-slider-button__icon-left">
        <McIcon icon={leftIcon} />
      </div>
      <div className="fmp-slider-button__icon fmp-slider-button__icon-right">
        <McIcon icon={rightIcon} />
      </div>
      <motion.div
        className="fmp-slider-button__animated"
        animate={state === 'left' ? 'left' : 'right'}
        initial={false}
        variants={{
          left: { x: 60 - 28, y: 2 },
          right: { x: 2, y: 2 },
        }}
      >
        <McButton
          hiddenlabel
          appearance={appearance}
          className="fmp-slider-button__animated-button"
          icon={state === 'right' ? leftIcon : rightIcon}
          fit={size}
          label={label}
        />
      </motion.div>
    </div>
  );
};
