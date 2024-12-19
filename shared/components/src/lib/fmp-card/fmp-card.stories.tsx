import { FmpCard } from './fmp-card';

import type { Meta, StoryObj } from '@storybook/react';
import type { FmpCardProps } from './fmp-card';

const meta: Meta<FmpCardProps> = {
  component: FmpCard,
  title: 'Shared/fmp-card',
};

export default meta;
type Story = StoryObj<typeof FmpCard>;

export const Controllable: Story = {
  args: {
    appearance: undefined,
    borderTopStyle: 'normal',
    borderBottomStyle: 'normal',
    elevation: 1,
    title: 'Title',
    subtitle: 'Subtitle',
    children: (
      <>
        <p>
          Do dolore ipsum in enim. Amet elit non eu ut eu sint sunt eu officia eiusmod
          tempor officia id. Culpa veniam eu amet aute eu labore reprehenderit laborum
          magna ad.
        </p>
        <p>
          Adipisicing Lorem consequat nostrud mollit cupidatat exercitation. Ad anim
          laboris ullamco cillum. Minim ut tempor do eu consequat consequat ipsum minim ut
          sit sint dolor qui.
        </p>
      </>
    ),
    icon: 'crane',
    noPadding: false,
    fit: 'medium',
    HeaderUtility: 'Utility JSX',
    HeaderAction: 'Action JSX',
  },
};
