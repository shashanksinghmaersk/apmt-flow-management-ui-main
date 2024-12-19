import type { Meta, StoryObj } from '@storybook/react';

import { FmpMenubarTablet, FmpMenubarTabletProps } from './fmp-menubar-tablet';

const meta: Meta<FmpMenubarTabletProps> = {
  component: FmpMenubarTablet,
  title: 'Shared/fmp-menubar-tablet',
};

export default meta;
type Story = StoryObj<typeof FmpMenubarTablet>;

export const Controllable: Story = {
  args: {
    expanded: true,
    menu: [
      { icon: 'flow', text: 'Progress & TAKT', route: 'takt' },
      { icon: 'globe', text: 'Traffic View', route: 'traffic' },
      {
        icon: 'exclamation-triangle',
        text: 'Andons & Exceptions',
        route: 'exception',
      },
      {
        icon: 'chart-bars-vertical',
        text: 'FES Insights',
        route: 'insights',
      },
      {
        icon: 'crane',
        text: 'Stand by & Pinning',
        route: 'standby',
      },
      {
        icon: 'file-check-stamp',
        text: 'Ops Standards',
        route: 'ops',
      },
      {
        icon: 'remote-control',
        text: 'VMT Remote',
        route: 'remote',
      },
    ],
  },
};
