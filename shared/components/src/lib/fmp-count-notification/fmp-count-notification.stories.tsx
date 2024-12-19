import { FmpCountNotification } from './fmp-count-notification';

import type { Meta, StoryObj } from '@storybook/react';
import type { FmpCountNotificationProps } from './fmp-count-notification';

const meta: Meta<FmpCountNotificationProps> = {
  component: FmpCountNotification,
  title: 'Shared/fmp-count-notification',
};

export default meta;
type Story = StoryObj<FmpCountNotificationProps>;

export const Controllable: Story = {
  args: {
    appearance: 'primary',
    variant: 'default',
    type: 'square',
    fit: 'medium',
    count: 10,
    maxCount: 10,
  },
};
