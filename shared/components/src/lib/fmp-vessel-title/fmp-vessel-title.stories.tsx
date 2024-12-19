import type { Meta, StoryObj } from '@storybook/react';

import { FmpVesselTitle, FmpVesselTitleProps } from './fmp-vessel-title';

const meta: Meta<FmpVesselTitleProps> = {
  component: FmpVesselTitle,
  title: 'Shared/fmp-vessel-title',
};

export default meta;
type Story = StoryObj<typeof FmpVesselTitle>;

export const Controllable: Story = {
  args: {
    icon: 'vessel-front',
    vesselName: 'Marie Maersk',
  },
};
