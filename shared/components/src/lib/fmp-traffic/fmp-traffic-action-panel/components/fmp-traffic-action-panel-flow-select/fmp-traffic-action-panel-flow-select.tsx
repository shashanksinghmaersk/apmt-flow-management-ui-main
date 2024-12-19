import { useTranslation } from '@fes/shared-i18n';
import { McInput, McLabel, McPopover } from '@maersk-global/mds-react-wrapper';
import { useCallback, useState } from 'react';
import { FmpTableFilterMenu } from '../../../../fmp-table-filter-menu/fmp-table-filter-menu';

import type { ApiMetaFilter, ThemeFit } from '@fes/shared-types';

import './fmp-traffic-action-panel-flow-select.scss';

export type FmpTrafficActionPanelFlowSelectProps = {
  filters: ApiMetaFilter[];
  fit: ThemeFit;
  onChange: (filters: ApiMetaFilter[]) => void;
};

const getSelectedText = (filters: ApiMetaFilter[]) => {
  const totalFilters = filters.length;
  const selectedFilters = filters.filter((filter) => filter.enabled).length;

  return `${selectedFilters} of ${totalFilters} Selected`;
};

export const FmpTrafficActionPanelFlowSelect = ({
  onChange,
  filters,
  fit,
}: FmpTrafficActionPanelFlowSelectProps) => {
  const { t } = useTranslation();
  const [selectedText, setSelectedText] = useState(getSelectedText(filters));

  const handleFiltersChange = useCallback(
    (_filter: ApiMetaFilter) => {
      onChange(_filter.records || []);
      setSelectedText(getSelectedText(_filter.records || []));
    },
    [onChange],
  );

  return (
    <div className="fmp-traffic-action-panel-flow-select">
      <McPopover position="bottom-right">
        <div
          slot="trigger"
          className="fmp-traffic-action-panel-flow-select__trigger"
        >
          <McLabel label={t('Flows')} fit={fit} />
          <McInput
            readonly
            size={20}
            fit={fit}
            hiddenlabel
            trailingicon="chevron-down"
            label={t('Flows')}
            value={t(selectedText)}
          />
        </div>
        <div className="fmp-traffic-action-panel-flow-select__filter-menu">
          <FmpTableFilterMenu
            filters={filters}
            onChange={handleFiltersChange}
          />
        </div>
      </McPopover>
    </div>
  );
};
