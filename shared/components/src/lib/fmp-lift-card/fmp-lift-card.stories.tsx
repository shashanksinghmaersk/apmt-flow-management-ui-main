import type { Meta, StoryObj } from '@storybook/react';

import { FmpLiftCard, FmpLiftCardProps } from './fmp-lift-card';

const meta: Meta<FmpLiftCardProps> = {
  component: FmpLiftCard,
  title: 'Shared/fmp-lift-card',
};

export default meta;
type Story = StoryObj<typeof FmpLiftCard>;

export const Controllable: Story = {
  args: {
    label: 'Lift Executed',
    content: 0,
  },
};
