import { FmpTeleprompt, FmpTelepromptProps } from './fmp-teleprompt';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<FmpTelepromptProps> = {
  component: FmpTeleprompt,
  title: 'Shared/fmp-teleprompt',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof FmpTeleprompt>;

export const Controllable: Story = {
  args: {
    type: 'hover',
    startPosition: 'start',
    text: 'Aliqua id est do eiusmod cupidatat fugiat sint enim. Minim velit sint tempor non amet elit irure nisi tempor proident officia do non.',
  },
  render: (args) => (
    <div
      style={{
        border: '1px solid #000',
        width: 400,
        paddingTop: 10,
        paddingBottom: 10,
      }}
    >
      <FmpTeleprompt {...args} style={{ paddingLeft: 10, paddingRight: 10 }} />
    </div>
  ),
};
