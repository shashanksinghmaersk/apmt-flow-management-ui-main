import { McButton } from '@maersk-global/mds-react-wrapper';
import cx from 'classnames';
import { Variants, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { FmpWindow } from '../fmp-window/fmp-window';

import type { FmpWindowProps } from '../fmp-window/fmp-window';

import './fmp-anchored-window.scss';

export type FmpAnchoredWindowProps = {
  collapsed?: boolean;
} & FmpWindowProps;

export const FmpAnchoredWindow = ({
  title,
  collapsed: _collapsed,
  className,
  ...windowProps
}: FmpAnchoredWindowProps) => {
  const [collapsed, setCollapsed] = useState(_collapsed);

  const classNames = cx('fmp-anchored-window', className, {
    'fmp-anchored-window--collapsed': !!collapsed,
  });

  const handleTriggerClick = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => {
      e.stopPropagation();
      setCollapsed(false);
    },
    [setCollapsed],
  );

  const handleMinimizeClick = useCallback(() => {
    setCollapsed(true);
  }, []);

  useEffect(() => {
    if (_collapsed !== collapsed) {
      setCollapsed(_collapsed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_collapsed]);

  const windowVariants: Variants = {
    open: { opacity: 1, scale: 1 },
    closed: { opacity: 0, scale: 0 },
  };

  return (
    <>
      <motion.div className={classNames}>
        <McButton
          variant="outlined"
          appearance={collapsed ? 'neutral' : 'primary'}
          fit="small"
          click={handleTriggerClick}
          trailingicon={collapsed ? 'expand' : ''}
        >
          {title}
        </McButton>
      </motion.div>
      {ReactDOM.createPortal(
        <FmpWindow
          variants={windowVariants}
          initial="open"
          animate={collapsed ? 'closed' : 'open'}
          className="fmp-anchored-window__frame"
          title={title}
          onMinimizeClick={handleMinimizeClick}
          {...windowProps}
        />,
        document.body,
      )}
    </>
  );
};
