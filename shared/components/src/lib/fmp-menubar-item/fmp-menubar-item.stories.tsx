import type { Meta, StoryObj } from '@storybook/react';

import { FmpMenubarItem, FmpMenubarItemProps } from './fmp-menubar-item';

const meta: Meta<FmpMenubarItemProps> = {
  component: FmpMenubarItem,
  title: 'Shared/fmp-menubar-item',
};

export default meta;
type Story = StoryObj<typeof FmpMenubarItem>;

export const Controllable: Story = {
  args: {
    text: 'Traffic View',
    active: false,
  },
};
