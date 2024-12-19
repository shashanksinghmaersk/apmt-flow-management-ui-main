import { FmpProfileButton } from './fmp-profile-button';

import type { Meta, StoryObj } from '@storybook/react';
import type { FmpProfileButtonProps } from './fmp-profile-button';

const meta: Meta = {
  component: FmpProfileButton,
  title: 'Shared/fmp-profile-button',
};

export default meta;
type Story = StoryObj<FmpProfileButtonProps>;

export const Controllable: Story = {
  args: {},
};
