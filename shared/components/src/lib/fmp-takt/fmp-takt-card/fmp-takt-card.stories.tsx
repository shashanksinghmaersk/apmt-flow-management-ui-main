import { TAKT_FLOW_STATUS_MOCK_DATA } from '@fes/shared-api';
import { FmpTaktCard } from './fmp-takt-card';

import type { Meta, StoryObj } from '@storybook/react';
import type { FmpTaktCardProps } from './fmp-takt-card';

const meta: Meta<FmpTaktCardProps> = {
  component: FmpTaktCard,
  title: 'Page/Takt/fmp-takt-card',
};

export default meta;
type Story = StoryObj<FmpTaktCardProps>;

export const Controllable: Story = {
  args: {
    data: TAKT_FLOW_STATUS_MOCK_DATA[0],
  },
};
