import type { Meta, StoryObj } from '@storybook/react';

import { FmpHeader, FmpHeaderProps } from './fmp-header';
import { FmpBrand } from '../fmp-brand/fmp-brand';
import { FmpProfileButton } from '../fmp-profile-button/fmp-profile-button';

const meta: Meta<FmpHeaderProps> = {
  component: FmpHeader,
  title: 'Shared/fmp-header',
};

export default meta;
type Story = StoryObj<typeof FmpHeader>;

export const Controllable: Story = {
  args: {
    InfoArea: <FmpBrand />,
    ActionArea: <FmpProfileButton language="en" />,
  },
};
