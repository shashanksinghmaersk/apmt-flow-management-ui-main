import { getAppearanceValues } from '@fes/shared-theme';
import { McIcon } from '@maersk-global/mds-react-wrapper';
import { useCallback } from 'react';
import { Typography } from '../../../typography/typography';
import { FmpCard } from '../../../fmp-card/fmp-card';

import type { NotificationProps } from '@fes/shared-types';

import './fmp-notification.scss';

export type FmpNotificationProps = {
  onClose: (id: string) => void;
  id: string;
} & NotificationProps;

export const FmpNotification = ({
  onClose,
  id,
  message,
  title,
  subtitle,
  icon,
  appearance = 'primary',
}: FmpNotificationProps) => {
  const handleOnClose = useCallback(() => {
    onClose(id);
  }, [id, onClose]);

  const { backgroundColor } = getAppearanceValues(appearance, 'default');

  return (
    <FmpCard
      elevation={2}
      className="fmp-notification"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      style={{ borderTop: `5px solid var(${backgroundColor})` }}
      onClick={handleOnClose}
    >
      <div className="fmp-notification__header">
        {icon && (
          <McIcon
            className="fmp-notification__header-icon"
            size="24"
            icon={icon}
          />
        )}
        {(title || subtitle) && (
          <div className="fmp-notification__header-title">
            {title && (
              <Typography weight="bold" size="medium">
                {title}
              </Typography>
            )}
            {subtitle && <Typography size="x-small">{subtitle}</Typography>}
          </div>
        )}
      </div>
      {message && (
        <div className="fmp-notification__body">
          <Typography>{message}</Typography>
        </div>
      )}
    </FmpCard>
  );
};
