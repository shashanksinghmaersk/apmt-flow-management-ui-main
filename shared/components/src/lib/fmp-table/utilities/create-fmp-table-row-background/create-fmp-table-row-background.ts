import { ThemeAppearance } from '@fes/shared-types';

export const createFmpTableRowBackground = (
  rows: number[],
  appearance: ThemeAppearance = 'neutral',
) => {
  let customstyles = ``;

  rows.forEach((rowIndex) => {
    customstyles = `
        ${customstyles}
          .mds-table table tbody tr:nth-child(${rowIndex + 1}) {
            transition: background-color 350ms ease-in;
            background-color: var(--mds_brand_appearance_${appearance}_subtle_background-color);
          }

          .mds-table table tbody tr:nth-child(${rowIndex + 1}):hover {
            background-color: var(--mds_brand_appearance_${appearance}_weak_background-color);
          }
      `;
  });

  return customstyles;
};
