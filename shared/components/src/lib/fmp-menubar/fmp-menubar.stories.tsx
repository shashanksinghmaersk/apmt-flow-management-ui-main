import { FmpMenubar } from './fmp-menubar';

import type { Meta, StoryObj } from '@storybook/react';
import type { FmpMenubarProps } from './fmp-menubar';

const meta: Meta<FmpMenubarProps> = {
  component: FmpMenubar,
  title: 'Shared/fmp-menubar',
};

export default meta;
type Story = StoryObj<FmpMenubarProps>;

export const Controllable: Story = {
  args: {
    route: 'takt',
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
