import { useTranslation } from '@fes/shared-i18n';
import {
  McButton,
  McCheckbox,
  McPopover,
} from '@maersk-global/mds-react-wrapper';
import deepEqual from 'deep-equal';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { ApiMeta } from '@fes/shared-types';
import type { ComponentProps } from 'react';
import type { FmpTableColumn } from '../../types';

import './fmp-table-column-config.scss';

export type FmpTableColumnConfigProps<T> = {
  selected?: string[];
  columns?: FmpTableColumn<T>[];
  meta?: ApiMeta<T>;
  buttonProps?: ComponentProps<typeof McButton>;
  onChangeColumns?: (columns: FmpTableColumn<T>[]) => void;
  onChangeSelected?: (selected: string[]) => void;
};

export function FmpTableColumnConfig<T>({
  columns = [],
  selected,
  onChangeColumns,
  onChangeSelected,
}: FmpTableColumnConfigProps<T>) {
  const columnsRef = useRef(columns);
  const { t } = useTranslation();
  const [selectedColumns, setSelectedColumns] = useState(
    selected || columns.filter((c) => !c.hidden).map((c) => c.id),
  );

  const getSelectedColumns = useCallback((_selected: string[]) => {
    const newColumns = columnsRef.current.map((column) => ({
      ...column,
      hidden: !_selected.includes(column.id),
    })) as unknown;

    return newColumns as FmpTableColumn<T>[];
  }, []);

  const handleCheckedChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => {
      const name = e.target.name;
      const checked = e.detail;
      let newSelectedColumns: string[] = [];

      if (checked && !selectedColumns.includes(name)) {
        newSelectedColumns = [...selectedColumns, name];
      } else if (!checked && selectedColumns.includes(name)) {
        newSelectedColumns = selectedColumns.filter((c) => c !== name);
      }

      setSelectedColumns(newSelectedColumns);

      const newColumns = getSelectedColumns(newSelectedColumns);

      onChangeSelected?.(newSelectedColumns);
      onChangeColumns?.(newColumns as FmpTableColumn<T>[]);
    },
    [getSelectedColumns, onChangeColumns, onChangeSelected, selectedColumns],
  );

  useEffect(() => {
    if (!deepEqual(columns, columnsRef.current)) {
      columnsRef.current = columns;
    }
  }, [columns]);

  useEffect(() => {
    onChangeSelected?.(selectedColumns);

    const newColumns = getSelectedColumns(selectedColumns);
    onChangeColumns?.(newColumns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <McPopover position="bottom-right">
      <McButton
        variant="outlined"
        appearance="neutral"
        slot="trigger"
        label={t('Customize')}
        icon="eye"
      />
      <div className="fmp-table-column-config">
        <ul className="fmp-table-column-config__list">
          {columnsRef.current?.map((column, index) => {
            return (
              <li
                key={`fmp-table-column-config__list-item-${index}`}
                className="fmp-table-column-config__list-item"
              >
                <McCheckbox
                  name={column.id}
                  label={column.label || column.id}
                  checked={selectedColumns.includes(column.id)}
                  change={handleCheckedChange}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </McPopover>
  );
}
