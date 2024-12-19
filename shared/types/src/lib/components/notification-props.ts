export type NotificationProps = {
  title?: string;
  subtitle?: string;
  message?: string;
  icon?: string;
  appearance?:
    | 'error'
    | 'success'
    | 'warning'
    | 'info'
    | 'primary'
    | 'secondary';
};
