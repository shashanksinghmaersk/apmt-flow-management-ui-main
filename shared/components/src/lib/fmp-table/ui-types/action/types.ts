import { ButtonAppearance } from '@maersk-global/mds-components-core/types';

export type ActionUiMeta = {
  type?: 'button' | 'icon' | 'checkbox';
  icon?: string;
  label?: string;
  variant?: 'outlined' | 'filled' | 'plain';
  appearance?: ButtonAppearance;
};
