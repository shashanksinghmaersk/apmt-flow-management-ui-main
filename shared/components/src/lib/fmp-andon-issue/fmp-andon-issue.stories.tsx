import type { Meta, StoryObj } from '@storybook/react';

import { FmpAndonIssue, FmpAndonIssueProps } from './fmp-andon-issue';
import { getRandomTimestamps } from '@fes/shared-utilities';

const meta: Meta<FmpAndonIssueProps> = {
  component: FmpAndonIssue,
  title: 'Shared/fmp-andon-issue',
};

export default meta;
type Story = StoryObj<typeof FmpAndonIssue>;

export const Controllable: Story = {
  args: {
    icon: 'crane',
    type: 'error',
    fit: 'medium',
    timestamp: getRandomTimestamps(1)[0],
    label: 'RTZ01',
    andon: true,
    progressbar: false,
  },
};
