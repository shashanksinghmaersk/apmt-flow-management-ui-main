import { McSelect } from '@maersk-global/mds-react-wrapper';

export type SelectOptionsUiMeta = {
  options: string[];
} & React.ComponentProps<typeof McSelect>;
