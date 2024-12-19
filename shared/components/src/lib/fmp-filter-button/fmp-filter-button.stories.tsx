import type { Meta, StoryObj } from '@storybook/react';

import { FmpFilterButton } from './fmp-filter-button';

const meta: Meta = {
  component: FmpFilterButton,
  title: 'Shared/fmp-filter-menu',
};

export default meta;
type Story = StoryObj<typeof FmpFilterButton>;

export const Controllable: Story = {
  args: {
    fit: 'medium',
    placement: 'bottom',
    label: 'Type',
    count: 2,
    maxCount: 10,
    children: <div style={{ padding: 10 }}>HERE A FMP TABLE FILTER MENU</div>,
  },
};
