import type { Meta, StoryObj } from '@storybook/react';

import { FmpSliderButton, FmpSliderButtonProps } from './fmp-slider-button';

const meta: Meta<FmpSliderButtonProps<number>> = {
  component: FmpSliderButton,
  title: 'Shared/fmp-slider-button',
};

export default meta;
type Story = StoryObj<typeof FmpSliderButton>;

export const Controllable: Story = {
  args: {
    label: 'Lift Executed',
    leftIcon: 'user',
    leftValue: 1,
    rightValue: 2,
    rightIcon: 'exclamation-triangle',
    fit: 'medium',
    appearance: 'primary',
    disabled: false,
    initial: 'right',
    variant: 'weak',
  },
};
