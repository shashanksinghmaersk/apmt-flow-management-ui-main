import { McButton } from '@maersk-global/mds-react-wrapper';
import { useCallback, useState } from 'react';
import { FmpCountNotification } from '../fmp-count-notification/fmp-count-notification';
import { FmpDropdown } from '../fmp-dropdown/fmp-dropdown';
import { Typography } from '../typography/typography';

import type { ThemeFit } from '@fes/shared-types';
import type { ReactNode } from 'react';
import type { FmpDropdownPlacement } from '../fmp-dropdown/types';

import './fmp-filter-button.scss';

export type FmpFilterButtonProps = {
  fit?: ThemeFit;
  children?: ReactNode;
  count?: number;
  maxCount?: number;
  label?: string;
  placement?: FmpDropdownPlacement;
};

export const FmpFilterButton = ({
  fit = 'medium',
  children,
  label,
  count,
  maxCount,
  placement,
}: FmpFilterButtonProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <FmpDropdown
      onClose={handleClose}
      onOpen={handleOpen}
      placement={placement}
      spacing={8}
      trigger={
        <McButton
          className="fmp-filter-button"
          fit={fit}
          trailingicon={open ? 'chevron-up' : 'chevron-down'}
          label={label}
          variant="outlined"
          appearance="neutral"
        >
          <div className="fmp-filter-button__trigger-inner">
            <Typography size={fit === 'small' ? 'small' : 'medium'}>{label}</Typography>
            <FmpCountNotification
              className="fmp-filter-button__counter"
              appearance="primary"
              count={count}
              maxCount={maxCount}
              fit={fit}
              type="square"
            />
          </div>
        </McButton>
      }
    >
      {children}
    </FmpDropdown>
  );
};
