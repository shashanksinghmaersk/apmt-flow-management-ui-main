import { McPagination } from '@maersk-global/mds-react-wrapper';
import cx from 'classnames';
import deepEqual from 'deep-equal';
import { useCallback, useEffect, useState } from 'react';

import type { ApiMetaPagination, ThemeFit } from '@fes/shared-types';

import './fmp-table-pagination.scss';

export type FmpTablePaginationProps = {
  pagination?: ApiMetaPagination;
  className?: string;
  fit?: ThemeFit;
  onPaginationChange?: (pagination: ApiMetaPagination) => void;
};

export const FmpTablePagination = ({
  pagination: _pagination,
  className,
  fit,
  onPaginationChange,
}: FmpTablePaginationProps) => {
  const [pagination, setPagination] = useState<ApiMetaPagination>({
    page: 0,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    ...(_pagination || {}),
  });

  let startRecordNumber = 1;
  if (pagination.itemsPerPage && pagination.page && pagination.page > 1) {
    startRecordNumber = (pagination.page - 1) * pagination.itemsPerPage + 1;
  }

  let endRecordNumber = 1;
  if (pagination.totalItems && pagination.itemsPerPage && pagination.page) {
    endRecordNumber = Math.min(
      pagination.page * pagination.itemsPerPage,
      pagination.totalItems,
    );
  }

  const presentationString = `${startRecordNumber || '?'} - ${endRecordNumber || '?'} of ${pagination.totalItems || '?'}`;

  const classNames = cx(className, 'fmp-table-pagination', {
    'fmp-table-pagination--mobile': fit === 'small',
  });

  const handlePaginationChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: any) => {
      const newPage = event.detail as number;
      const newPagination: ApiMetaPagination = {
        ...pagination,
        page: newPage,
        hasNextPage: newPage !== pagination.totalPages,
        hasPreviousPage: newPage !== 1,
      };

      setPagination(newPagination);
      onPaginationChange?.(newPagination);
    },
    [onPaginationChange, pagination],
  );

  useEffect(() => {
    if (_pagination && !deepEqual(_pagination, pagination)) {
      setPagination(_pagination);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_pagination]);

  return (
    <div className={classNames}>
      <div className="fmp-table-pagination__info">
        {String(presentationString)}
      </div>
      <McPagination
        className="fmp-table-pagination__pagination"
        totalpages={pagination.totalPages}
        visiblepages={0}
        fit="small"
        previouslabel=""
        nextlabel=""
        pagechange={handlePaginationChange}
      />
    </div>
  );
};
