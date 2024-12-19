import { TypographyProps } from '../../../typography/typography';

export type TitleUiMeta<T> = {
  titleKey?: keyof T;
  titleEmptyValue?: string;
  subtitleKey?: keyof T;
  subtitleEmptyValue?: string;
  titleProps?: TypographyProps;
  subtitleProps?: TypographyProps;
};
