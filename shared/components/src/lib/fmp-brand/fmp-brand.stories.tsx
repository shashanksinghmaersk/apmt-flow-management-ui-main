import type { Meta, StoryObj } from '@storybook/react';

import { FmpBrand } from './fmp-brand';

const meta: Meta = {
  component: FmpBrand,
  title: 'Shared/fmp-brand',
};

export default meta;
type Story = StoryObj<typeof FmpBrand>;

export const Controllable: Story = {
  args: {
    fit: 'medium',
  },
};
