import { FmpBox } from './fmp-box';

import type { Meta, StoryObj } from '@storybook/react';
import type { FmpBoxProps } from './fmp-box';

const meta: Meta<FmpBoxProps> = {
  component: FmpBox,
  title: 'Shared/fmp-box',
};

export default meta;
type Story = StoryObj<typeof FmpBox>;

export const Controllable: Story = {
  args: {
    appearance: 'primary',
    variation: 'default',
    style: { width: 300, height: 300 },
    children: 'hello',
  },
};
