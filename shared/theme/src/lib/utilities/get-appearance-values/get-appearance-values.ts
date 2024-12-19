import { ThemeAppearance, ThemeAppearanceVariant } from '@fes/shared-types';

export const getAppearanceValues = (
  appearance: ThemeAppearance,
  variant: ThemeAppearanceVariant,
) => {
  const appearanceValues = {
    textColor: `--mds_brand_appearance_${appearance}_${variant === 'weak' ? 'default' : variant}_text-color`,
    backgroundColor: `--mds_brand_appearance_${appearance}_${variant}_background-color`,
    onBackgroundColor: `--mds_brand_appearance_${appearance}_${variant}_on-background-color`,
    borderColor: `--mds_brand_appearance_${appearance}_${variant}_border-color`,
  };

  return appearanceValues;
};
