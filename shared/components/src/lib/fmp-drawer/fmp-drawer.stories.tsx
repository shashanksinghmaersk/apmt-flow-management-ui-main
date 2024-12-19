import { McButton } from '@maersk-global/mds-react-wrapper';
import { useEffect, useState } from 'react';
import { FmpDrawer } from './fmp-drawer';

import type { FmpDrawerProps } from './fmp-drawer';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  component: FmpDrawer,
  title: 'Shared/fmp-drawer',
};

export default meta;
type Story = StoryObj<FmpDrawerProps>;

const FmpDrawerStory = (args: FmpDrawerProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (args.open !== open) {
      setOpen(!!args.open);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [args.open]);

  return (
    <>
      <McButton
        onClick={() => {
          setOpen(true);
        }}
      >
        Click Here to Open
      </McButton>
      <FmpDrawer
        {...args}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export const Controllable: Story = {
  args: {
    fit: 'medium',
    closeOnOutsideClick: true,
    header: 'HERE JSX or use title prop',
    children: 'HERE JSX FOR CONTENT',
  },
  render: (args) => {
    return <FmpDrawerStory {...args} />;
  },
};
