import { useCallback, useState } from 'react';
import { useGlobalCheckboxAction } from '../../hooks/use-global-checkbox-action/use-global-checkbox-action';
import { FmpTableGlobalHeadersCheckbox } from './components/fmp-table-global-headers-checkbox';

import type { ThemeFit } from '@fes/shared-types';
import type { FmpTableColumn } from '../../types';

export type FmpTableGlobalHeadersProps<T> = {
  onGlobalChange?: (props: { records: T[]; id: string }) => void;
  columns: FmpTableColumn<T>[];
  fit?: ThemeFit;
};

export function FmpTableGlobalHeaders<T>({
  columns,
  fit,
  onGlobalChange,
}: FmpTableGlobalHeadersProps<T>) {
  const [checked, setChecked] = useState(false);

  const handleRecordsChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (props: { records: any[]; id: string; globalChecked: boolean }) => {
      setChecked(props.globalChecked);
    },
    [],
  );

  const { addCheckboxAction, checkboxGlobalChange } = useGlobalCheckboxAction({
    onChange: handleRecordsChange,
  });

  const globalCheckboxColumns = columns
    .filter((column) => column.uiType === 'Action' && column.global)
    .map((column) => {
      return column.id;
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = useCallback(
    (id: string, checked: boolean) => {
      checkboxGlobalChange(id, checked, onGlobalChange);
    },
    [checkboxGlobalChange, onGlobalChange],
  );

  const handleCheckboxMount = useCallback(
    (id: string, ref: HTMLElement) => {
      addCheckboxAction({ id, headerRef: ref });
    },
    [addCheckboxAction],
  );

  return (
    <>
      {globalCheckboxColumns.map((id) => {
        return (
          <div key={id} slot={`${id}_header`}>
            <FmpTableGlobalHeadersCheckbox
              key={id}
              id={id}
              fit={fit}
              checked={checked}
              onChange={handleChange}
              onMount={handleCheckboxMount}
            />
          </div>
        );
      })}
    </>
  );
}
