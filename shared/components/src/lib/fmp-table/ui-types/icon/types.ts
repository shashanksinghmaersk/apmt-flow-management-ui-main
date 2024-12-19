import { McIcon } from '@maersk-global/mds-react-wrapper';

type IconProps = React.ComponentProps<typeof McIcon>;

export type IconUiMeta = {
  map?: Record<string, string>;
} & IconProps;
