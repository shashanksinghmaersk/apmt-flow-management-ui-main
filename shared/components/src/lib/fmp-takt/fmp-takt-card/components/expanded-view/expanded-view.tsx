import { useTranslation } from '@fes/shared-i18n';
import { McIcon } from '@maersk-global/mds-react-wrapper';
import cx from 'classnames';
import { FmpTable, FmpTableColumn } from '../../../../fmp-table';

import type { TaktDestination, ThemeFit } from '@fes/shared-types';

export type ExpandedViewProps = {
  data?: TaktDestination[];
  fit?: ThemeFit;
};

export const ExpandedView = ({ data, fit }: ExpandedViewProps) => {
  const { t } = useTranslation();

  const columns: FmpTableColumn<TaktDestination>[] = [
    { id: 'cheId', label: t('CHE ID') },
    { id: 'instruction', label: t('Instruction') },
    {
      id: 'status',
      label: t('Status'),
      render: ({ value }) => {
        const statusIcon = cx({
          check: value === 'R',
          minus: value === 'NA',
          times: value === 'NR',
        });
        return <div>{value && <McIcon icon={statusIcon} />}</div>;
      },
    },
  ];

  if (fit !== 'small') {
    columns.splice(2, 0, { id: 'destination', label: t('Destination') });
  }

  return (
    <div>
      <FmpTable<TaktDestination>
        dataKey="cheId"
        columns={columns}
        data={data}
        fit="small"
        tableProps={{
          disableroundedcorners: true,
        }}
      />
    </div>
  );
};
