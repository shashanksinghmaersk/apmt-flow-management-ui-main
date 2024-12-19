import { BUFFER_INFO_MOCK_DATA } from '@fes/shared-api';
import { FmpTrafficBufferPanel } from './fmp-traffic-buffer-panel';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  component: FmpTrafficBufferPanel,
  title: 'Shared/fmp-traffic-buffer-panel',
};

export default meta;
type Story = StoryObj;

export const Controllable: Story = {
  args: {
    data: BUFFER_INFO_MOCK_DATA,
  },
};
