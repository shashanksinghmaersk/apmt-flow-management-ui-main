import { useTranslation } from '@fes/shared-i18n';
import { McTypeahead } from '@maersk-global/mds-react-wrapper';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { sanitizeMetaOptionsToObject } from '../../utilities/sanitize-meta-options/sanitize-meta-options-to-object';

import type { ApiMetaOptionsKey } from '@fes/shared-types';
import type { FmpTableColumnUiTypeProps } from '../../types';
import type { TypeaheadUiMeta } from './types';

export function Typeahead<T>({
  column,
  disabled,
  fit = 'medium',
  meta,
  record,
  value: _value,
}: FmpTableColumnUiTypeProps<T>) {
  const id = column?.id as ApiMetaOptionsKey<T>;
  const uiMetaProps = column?.uxMeta || ({} as TypeaheadUiMeta);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  const { t } = useTranslation();
  const [value, setValue] = useState(_value);
  const previousValue = useRef(_value);
  const hadFocus = useRef(false);
  const isEditing = useRef(false);

  const data = useMemo(() => {
    return sanitizeMetaOptionsToObject({ id, meta, record, t });
  }, [id, meta, record, t]);

  const updateValue = useCallback(
    (_value: string) => {
      previousValue.current = value; // we will need this when we add server side errors
      setValue(_value);
      column.onRecordChange?.({ column, record, value: _value });
    },
    [column, record, value],
  );

  const handleChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: any) => {
      hadFocus.current = true;
      updateValue(event.detail.value);
    },
    [updateValue],
  );

  const handleEditStart = useCallback(() => {
    if (!isEditing.current) {
      isEditing.current = true;
      column.onRecordEditStart?.();
    }
  }, [column]);

  const handleEditEnd = useCallback(() => {
    if (isEditing.current) {
      isEditing.current = false;
      column.onRecordEditEnd?.();
    }
  }, [column]);

  useEffect(() => {
    const mcTypeahead = ref.current as HTMLElement;
    const mcInput = mcTypeahead.shadowRoot?.querySelector('input');

    if (mcInput) {
      mcInput.addEventListener('focus', handleEditStart);
      mcInput.addEventListener('blur', handleEditEnd);
    }

    return () => {
      if (mcInput) {
        mcInput.removeEventListener('focus', handleEditStart);
        mcInput.removeEventListener('blur', handleEditEnd);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (value !== _value) {
      setValue(_value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_value]);

  return (
    <McTypeahead
      fit={fit}
      ref={ref}
      disabled={disabled}
      value={value}
      data={data}
      label=""
      {...uiMetaProps}
      search={(event) => setValue(event.detail)}
      optionselected={handleChange}
    />
  );
}
