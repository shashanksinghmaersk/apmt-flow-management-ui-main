/* eslint-disable jsx-a11y/heading-has-content */
import cx from 'classnames';
import { forwardRef } from 'react';

import type {
  ThemeAppearance,
  ThemeTypographySize,
  ThemeTypographyWeight,
} from '@fes/shared-types';
import type { FC, CSSProperties, HTMLAttributes } from 'react';

import './typography.scss';

export type TypographyType = 'headline' | 'text';
export type TypographyVariant = 'weak' | 'weakest';

type TagType = 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'li';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getTag = (tag: TagType, ref: any) => {
  const tagMap: Record<
    TagType,
    FC<HTMLAttributes<HTMLDivElement | HTMLLIElement>>
  > = {
    span: (props: HTMLAttributes<HTMLSpanElement>) => (
      <span ref={ref} {...props} />
    ),
    div: (props: HTMLAttributes<HTMLDivElement>) => (
      <div ref={ref} {...props} />
    ),
    h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
      <h1 ref={ref} {...props} />
    ),
    h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
      <h2 ref={ref} {...props} />
    ),
    h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
      <h3 ref={ref} {...props} />
    ),
    h4: (props: HTMLAttributes<HTMLHeadingElement>) => (
      <h4 ref={ref} {...props} />
    ),
    h5: (props: HTMLAttributes<HTMLHeadingElement>) => (
      <h5 ref={ref} {...props} />
    ),
    h6: (props: HTMLAttributes<HTMLHeadingElement>) => (
      <h6 ref={ref} {...props} />
    ),
    li: (props: HTMLAttributes<HTMLLIElement>) => <li ref={ref} {...props} />,
  };

  return tagMap[tag];
};

export type TypographyProps = {
  type?: TypographyType;
  size?: ThemeTypographySize;
  appearance?: ThemeAppearance;
  weight?: ThemeTypographyWeight;
  inverse?: boolean;
  variant?: TypographyVariant;
  weak?: boolean;
  disabled?: boolean;
  tooltip?: boolean;
  tag?: TagType;
} & HTMLAttributes<HTMLDivElement>;

export const Typography = forwardRef(
  (
    {
      className,
      type = 'text',
      size = 'medium',
      weight = 'normal',
      style: _style = {},
      inverse,
      tag = 'div',
      appearance,
      variant,
      weak,
      disabled,
      ...rest
    }: TypographyProps,
    ref,
  ) => {
    let mdsClassName = `mds-${type}--${size}`;
    const fontWeight = `var(--mds_brand_typography_text_${size}_${weight}_font-weight)`;

    if (type === 'text') {
      mdsClassName = `${mdsClassName}-${weight}`;
    }

    let style: CSSProperties = {
      fontWeight,
      ..._style,
    };

    if (inverse) {
      style = {
        color: 'var(--mds_brand_appearance_neutral_inverse_text-color)',
        ...style,
        ..._style,
      };
    } else if (variant || weak) {
      style = {
        color: `var(--typography-color--${weak ? 'weak' : variant})`,
        ...style,
        ..._style,
      };
    }

    const classNames = cx(mdsClassName, className, 'fmp-typography', {
      [`fmp-typography--${variant}`]: !!variant,
      'fmp-typography--weak': !!weak,
      'fmp-typography--disabled': !!disabled,
    });

    const Tag = getTag(tag, ref);

    return <Tag className={classNames} style={style} {...rest} />;
  },
);
