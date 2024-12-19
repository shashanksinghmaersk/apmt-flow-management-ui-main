import { getAppearanceValues } from '@fes/shared-theme';
import { getUniqueId } from '@fes/shared-utilities';
import { McTable } from '@maersk-global/mds-react-wrapper';
import cx from 'classnames';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FmpTableCustomCells } from './components/fmp-table-custom-cells/fmp-table-custom-cells';
import { FmpTableGlobalHeaders } from './components/fmp-table-global-headers/fmp-table-global-headers';
import { FmpTableSpinner } from './components/fmp-table-spinner/fmp-table-spinner';
import { createFmpTableColumns } from './utilities/create-fmp-table-columns/create-fmp-table-columns';
import { createFmpTableCustomstyles } from './utilities/create-fmp-table-customstyles/create-fmp-table-customstyles';

import type { ApiMeta } from '@fes/shared-types';
import type { TableColumn as McTableColumn } from '@maersk-global/mds-components-core/mc-table/types';
import type { FmpTableColumn, FmpTableColumnOnChangeProps, FmpTableProps } from './types';

import { FmpTableEmpty } from './components/fmp-table-empty/fmp-table-empty';
import { FmpTablePlaceHolder } from './components/fmp-table-placeholder/fmp-table-placeholder';
import './fmp-table.scss';

type FmpTableColumnMap<T> = {
  mcColumns: McTableColumn[];
  fmpColumns: FmpTableColumn<T>[];
};

type FmpTableNewRowState<T> = {
  page: number;
  newIds: T[keyof T][];
  previousIds: T[keyof T][];
  initialized: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FmpTable = <T extends Record<string, any>>(props: FmpTableProps<T>) => {
  const idRef = useRef(props.id || getUniqueId());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tableRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const model: Partial<Record<keyof T, any>> = useMemo(() => ({}), []);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_counter, setCounter] = useState(0);

  const newRowState = useRef<FmpTableNewRowState<T>>({
    page: 0,
    newIds: [],
    previousIds: [],
    initialized: false,
  });

  const [columnMap, setColumnMap] = useState<FmpTableColumnMap<T>>({
    mcColumns: props.columns || [],
    fmpColumns: props.columns || [],
  });

  const handleRecordChange = useCallback(
    ({ record, value, column }: FmpTableColumnOnChangeProps<T>) => {
      const newRecord = { ...record, [column.id]: value };
      props.onRecordChange?.({ record: newRecord, value, column });
    },
    [props],
  );

  const initializeColumns = useCallback(
    (__columns: FmpTableColumn<T>[]) => {
      const fmp = createFmpTableColumns({
        ...props,
        columns: __columns,
        onRecordChange: handleRecordChange,
      });

      const native = fmp.map((column) => {
        const newColumn = { ...column };

        try {
          model[column.id as keyof T] = { column };
          delete newColumn.render;
          delete newColumn.outerRender;
          delete newColumn.onRecordAction;
          delete newColumn.onRecordEditEnd;
          delete newColumn.onRecordEditStart;
          delete newColumn.onGlobalChange;
          delete newColumn.disabled;
          // eslint-disable-next-line no-empty
        } catch (err) {}

        return newColumn;
      });

      setColumnMap({ fmpColumns: fmp, mcColumns: native });
    },
    [props, handleRecordChange, model],
  );

  const handleAnimatedNewRowBackground = useCallback(() => {
    if (props.flashNewColumns && !!newRowState.current.newIds.length) {
      const mcTable = tableRef.current as HTMLElement;
      const newRows = mcTable.shadowRoot?.querySelectorAll('tbody tr');

      newRows?.forEach((row) => {
        // Get the slot element
        const slot = row.querySelector('slot');

        let statusBgNew: HTMLDivElement | null = null;

        if (slot) {
          // Traverse the distributed nodes to find the div with the desired class
          const assignedNodes = slot.assignedNodes({
            flatten: true,
          }) as HTMLElement[];

          assignedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              // Look for the element within the subtree of each assigned node
              const targetElement = node.querySelector(
                '.fmp-table-uitype-status-background--new',
              );

              if (targetElement) {
                statusBgNew = targetElement as HTMLDivElement;
              }
            }
          });
        }

        if (statusBgNew) {
          const { backgroundColor } = getAppearanceValues('info', 'weak');

          const _statusBgNew = statusBgNew as HTMLDivElement;
          // Ensuring statusBgNew is not null
          const rowRect = row.getBoundingClientRect();
          // Calculate position and dimensions relative to mcTable
          const width = rowRect.width;

          const oldWidth = _statusBgNew.style.width;
          const oldBackground = _statusBgNew.style.backgroundColor;

          _statusBgNew.style.width = `${width}px`;
          _statusBgNew.style.transition = 'width 0ms ease-in-out';
          _statusBgNew.style.backgroundColor = `var(${backgroundColor})`;

          const statusBgTimeout = setTimeout(() => {
            _statusBgNew.style.width = oldWidth;
            _statusBgNew.style.transition = 'all 550ms ease-in-out';
            _statusBgNew.style.backgroundColor = oldBackground;

            clearTimeout(statusBgTimeout);
          }, 2000);
        }
      });
    }
  }, [props.flashNewColumns]);

  const getTableHeadHeight = useCallback(() => {
    const mcTable = tableRef.current as HTMLElement;
    let height = 0;

    if (mcTable) {
      const mcTableHead = mcTable.shadowRoot?.querySelector('thead');
      height = mcTableHead ? mcTableHead.offsetHeight : 0;
    }

    return height;
  }, []);

  const getRowIdsFromResponse = useCallback((_data: T[], _meta?: ApiMeta<T>) => {
    const idKey = _meta?.idKey as keyof T;

    const rowIds = _data
      .map((record) => record[idKey])
      .filter((value) => value !== null && value !== undefined);

    return rowIds;
  }, []);

  const getRowIdsNotAlreadyGotten = useCallback(
    (_data: T[], _meta?: ApiMeta<T>) => {
      // All current IDs in the data that are not null or undefined
      const rowIds = getRowIdsFromResponse(_data, _meta);

      // Find all the rowIds not in the list of previousIds
      // Remove those possibly already in the newIds
      const newRowIds = rowIds
        .map((rowId) =>
          newRowState.current.previousIds.includes(rowId) ? undefined : rowId,
        )
        .filter((value) => value !== null && value !== undefined)
        .filter(
          (value) => value && !newRowState.current.newIds.includes(value),
        ) as T[keyof T][];

      return newRowIds;
    },
    [getRowIdsFromResponse],
  );

  const handleDataChange = useCallback(
    (data?: T[], meta?: ApiMeta<T>) => {
      const currentPage = meta?.pagination?.page || 0;
      const previousPage = newRowState.current.page;

      if (currentPage === previousPage) {
        // All current IDs in the data that are not null or undefined

        // Find all the rowIds not in the list of previousIds
        const newIds = getRowIdsNotAlreadyGotten(data || [], meta);

        newRowState.current.newIds = newIds;

        if (newIds.length) {
          setTimeout(() => {
            handleAnimatedNewRowBackground();
          }, 8);

          setCounter((c) => c + 1);

          const rowChangeTimeout = setTimeout(() => {
            newRowState.current.previousIds = [
              ...newRowState.current.previousIds,
              ...newIds,
            ];

            newRowState.current.newIds = newRowState.current.newIds.filter((item) => {
              return !newIds.includes(item);
            });

            clearTimeout(rowChangeTimeout);
            setCounter((c) => c + 1);
          }, 30000);
        }
      } else {
        if (currentPage === 1 && !newRowState.current.initialized) {
          newRowState.current.previousIds = getRowIdsFromResponse(data || [], meta);
          newRowState.current.initialized = true;
        }
        newRowState.current.page = currentPage;
      }
    },
    [getRowIdsFromResponse, getRowIdsNotAlreadyGotten, handleAnimatedNewRowBackground],
  );

  useEffect(() => {
    handleDataChange(props.data, props.meta);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data, props.meta]);

  useEffect(() => {
    initializeColumns(props.columns || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.columns]);

  useEffect(() => {
    initializeColumns(props.columns || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classNames = cx(props.className, 'fmp-table');

  const key = useMemo(
    () => (props.data ? JSON.stringify(props.data) : idRef.current),
    [props.data],
  );

  const customstyles = useMemo(() => {
    const tableCustomstyles = createFmpTableCustomstyles();

    return `
      ${props.tableProps?.customstyles || ''}
      ${tableCustomstyles || ''}
    `;
  }, [props.tableProps?.customstyles]);

  return (
    <div className={classNames} key={key} hidden={props.hidden}>
      <McTable
        id={idRef.current}
        ref={tableRef}
        data={props.data}
        columns={columnMap.mcColumns}
        datakey={props.dataKey as string}
        fit={props.fit}
        {...props.tableProps}
        customstyles={customstyles}
      >
        <FmpTableGlobalHeaders
          columns={columnMap.fmpColumns}
          fit={props.fit}
          onGlobalChange={props.onGlobalChange}
        />
        {props.children}
        <FmpTablePlaceHolder data={props.data} />
        <FmpTableCustomCells<T>
          newRowIds={newRowState.current.newIds}
          data={props.data}
          dataKey={props.dataKey}
          model={model}
          meta={props.meta}
          fit={props.fit}
          columns={columnMap.fmpColumns}
        />
      </McTable>
      <FmpTableSpinner
        loading={props.loading}
        updating={props.updating}
        top={getTableHeadHeight()}
      />
      <FmpTableEmpty
        top={getTableHeadHeight()}
        data={props.data}
        loadingError={props.loadingError}
        loading={props.loading}
        updating={props.updating}
      />
    </div>
  );
};
