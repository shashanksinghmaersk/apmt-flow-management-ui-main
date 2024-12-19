import { McIcon } from '@maersk-global/mds-react-wrapper';
import cx from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Typography } from '../typography/typography';
import ReactDOM from 'react-dom';
import { useOnClickOutside } from 'usehooks-ts';

import type { ThemeFit } from '@fes/shared-types';
import type { CSSProperties, ReactNode } from 'react';

import './fmp-drawer.scss';

export type FmpDrawerProps = {
  preventBackground?: boolean;
  closeOnOutsideClick?: boolean;
  fit?: ThemeFit;
  className?: string;
  children?: ReactNode;
  open?: boolean;
  header?: ReactNode;
  title?: string;
  style?: CSSProperties;
  offsetTop?: number;
  offsetBottom?: number;
  onClose?: () => void;
  onOpen?: () => void;
};

export const FmpDrawer = ({
  preventBackground,
  closeOnOutsideClick,
  className,
  fit = 'medium',
  open: _open,
  children,
  header,
  style = {},
  title,
  offsetTop = 0,
  offsetBottom = 0,
  onClose,
  onOpen,
}: FmpDrawerProps) => {
  const modalRef = useRef(null);
  const [open, setOpen] = useState(false);

  const classNames = cx('fmp-drawer__modal', className, {
    [`fmp-drawer__modal--${fit}`]: true,
  });

  const drawerVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
  };

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  if (fit === 'small') {
    style.left = 0;
  }

  const handleCloseClick = useCallback(() => {
    setOpen(false);
    onClose?.();
  }, [onClose]);

  useOnClickOutside(modalRef, () => {
    if (closeOnOutsideClick) {
      setOpen(false);
      onClose?.();
    }
  });

  useEffect(() => {
    if (_open !== open) {
      const newOpenState = !!_open;

      if (newOpenState) {
        onOpen?.();
      } else {
        onClose?.();
      }

      setOpen(newOpenState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_open]);

  const modalStyles: CSSProperties = {};

  if (offsetTop) {
    modalStyles.top = offsetTop;
  }

  if (offsetBottom) {
    modalStyles.bottom = offsetBottom;
  }

  return ReactDOM.createPortal(
    <AnimatePresence>
      {open && (
        <>
          {!preventBackground && (
            <motion.div
              className="fmp-drawer__background"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={backgroundVariants}
              transition={{ duration: 0.3 }}
            />
          )}
          <motion.div
            ref={modalRef}
            className={classNames}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{ ...modalStyles, ...style }}
            variants={drawerVariants}
            transition={{ duration: 0.3 }}
          >
            <div className="fmp-drawer__modal-header">
              <div className="fmp-drawer__modal-header-start">
                {title && (
                  <Typography
                    className="fmp-drawer__modal-header-title"
                    type="headline"
                    size={fit === 'small' ? 'x-small' : 'small'}
                  >
                    {title}
                  </Typography>
                )}
                {!title && header}
              </div>
              <div className="fmp-drawer__modal-header-end" onClick={handleCloseClick}>
                <McIcon icon="times" />
              </div>
            </div>
            <div className="fmp-drawer__modal-main">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};
