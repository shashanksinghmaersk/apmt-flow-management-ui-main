import type { Meta, StoryObj } from '@storybook/react';

import { FmpTag, FmpTagProps } from './fmp-tag';

const meta: Meta<FmpTagProps> = {
  component: FmpTag,
  title: 'shared/fmp-tag',
};

export default meta;
type Story = StoryObj<typeof FmpTag>;

export const Controllable: Story = {
  args: {
    appearance: 'success',
    fit: 'medium',
    critical: false,
    children: 'FES',
  },
};
