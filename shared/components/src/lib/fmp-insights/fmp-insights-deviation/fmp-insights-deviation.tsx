import { useTranslation } from '@fes/shared-i18n';
import { FmpCard } from '../../fmp-card/fmp-card';
import { FmpInsightsDeviationFilters } from '../fmp-insights-deviation-filters/fmp-insights-deviation-filters';

import type { ThemeFit } from '@fes/shared-types';
import type { FmpInsightsDeviationFilter } from '../types';

export type FmpInsightsDeviationProps = {
  fit?: ThemeFit;
  active?: FmpInsightsDeviationFilter;
  filters?: FmpInsightsDeviationFilter[];
  onFiltersChange?: (filter: FmpInsightsDeviationFilter) => void;
};

export const FmpInsightsDeviation = ({
  fit = 'medium',
  active,
  filters,
  onFiltersChange,
}: FmpInsightsDeviationProps) => {
  const { t } = useTranslation();

  return (
    <FmpCard
      fit={fit}
      icon="truck-side"
      title={t('Truck Planning Deviations')}
      HeaderUtility={
        <FmpInsightsDeviationFilters
          fit={fit}
          filters={filters}
          active={active}
          onChange={onFiltersChange}
        />
      }
    >
      <div>HERE GOES THE D3</div>
    </FmpCard>
  );
};
