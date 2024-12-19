import { McButton } from '@maersk-global/mds-react-wrapper';
import { FmpDropdown } from './fmp-dropdown';

import type { Meta, StoryObj } from '@storybook/react';
import type { FmpDropdownProps } from './fmp-dropdown';

const meta: Meta = {
  component: FmpDropdown,
  title: 'Shared/fmp-dropdown',
};

export default meta;
type Story = StoryObj<FmpDropdownProps>;

export const Controllable: Story = {
  args: {
    elevation: 2,
    placement: 'bottom',
    children: <div style={{ padding: 10 }}>HERE JSX INJECTION WHATEVER YOU WANT</div>,
    trigger: <McButton label="Click here to open" />,
  },
};
