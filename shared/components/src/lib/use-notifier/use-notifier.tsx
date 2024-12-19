import { getUniqueId } from '@fes/shared-utilities';
import { useCallback, useState, useRef } from 'react';
import { FmpNotification } from './components/fmp-notification/fmp-notification';

import type { NotificationProps } from '@fes/shared-types';
import type { ReactNode } from 'react';

export type UseNotifierProps = {
  duration: number;
  throttle?: number; // Throttle duration in milliseconds
};

export type UseNotifierReturn = {
  notify: (props: NotificationProps) => void;
  Notifications: ReactNode;
};

type Notification = NotificationProps & { id: string };

export const useNotifier = ({
  duration,
  throttle = 300, // Default throttle value
}: UseNotifierProps): UseNotifierReturn => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const lastNotificationTime = useRef<number>(0);

  const notify = useCallback(
    (props: NotificationProps) => {
      const now = Date.now();

      if (now - lastNotificationTime.current < throttle) {
        return; // Skip notification if it's within the throttle window
      }

      const id = getUniqueId();
      setNotifications((prev) => [...prev, { ...props, id }]);
      lastNotificationTime.current = now;

      setTimeout(() => {
        setNotifications((prev) =>
          prev.filter((notification) => notification.id !== id),
        );
      }, duration * 1000);
    },
    [duration, throttle],
  );

  const removeNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  };

  const Notifications = notifications.map((props) => (
    <FmpNotification {...props} key={props.id} onClose={removeNotification} />
  ));

  return { notify, Notifications };
};
