import { Fragment } from 'react';
import cx from 'classnames';
import { FmpCard } from '../../fmp-card/fmp-card';
import { Typography } from '../../typography/typography';

import type { ThemeFit } from '@fes/shared-types';
import type { FmpInsightsDeviationFilter } from '../types';

import './fmp-insights-deviation-filters.scss';

export type FmpInsightsDeviationFiltersProps = {
  fit?: ThemeFit;
  filters?: FmpInsightsDeviationFilter[];
  active?: FmpInsightsDeviationFilter;
  onChange?: (filter: FmpInsightsDeviationFilter) => void;
};

export const FmpInsightsDeviationFilters = ({
  filters = [],
  active,
  onChange,
}: FmpInsightsDeviationFiltersProps) => {
  return (
    <div className="fmp-insights-deviation-filters">
      {filters.map((filter, index) => {
        const isActive = filter.value === active?.value;
        const filterCx = cx('fmp-insights-deviation-filters__item', {
          [`fmp-insights-deviation-filters__item--active`]: isActive,
        });

        return (
          <Fragment key={index}>
            <Typography
              className={filterCx}
              size="small"
              onClick={() => {
                onChange?.(filter);
              }}
            >
              {filter.label}
            </Typography>
            {isActive && (
              <FmpCard
                className="fmp-insights-deviation-filters__slider"
                layoutId="fmp-insights-deviation-filters"
                style={{ left: index * 53 }}
                elevation={2}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};
