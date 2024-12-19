import { FmpAnchoredWindow } from './fmp-anchored-window';

import type { Meta, StoryObj } from '@storybook/react';
import type { FmpAnchoredWindowProps } from './fmp-anchored-window';

const meta: Meta<FmpAnchoredWindowProps> = {
  component: FmpAnchoredWindow,
  title: 'Shared/fmp-anchored-window',
};

export default meta;
type Story = StoryObj<typeof FmpAnchoredWindow>;

export const Controllable: Story = {
  args: {
    icon: 'crane',
    className: '',
    title: 'My Title',
    src: 'https://storybook.js.org/',
    width: 500,
    height: 300,
    collapsed: true,
    fit: 'medium',
  },
  render: (args) => {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FmpAnchoredWindow {...args} />
      </div>
    );
  },
};
