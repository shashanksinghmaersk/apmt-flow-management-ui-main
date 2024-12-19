import { McInput } from '@maersk-global/mds-react-wrapper';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import type { FmpTableColumnUiTypeProps } from '../../types';
import type { InputUiMeta } from './types';

import './input.scss';

export function Input<T>({
  column,
  value: _value,
  record,
  fit = 'medium',
  disabled,
}: FmpTableColumnUiTypeProps<T>) {
  const [value, setValue] = useState(_value);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  const isEditing = useRef(false);
  const uiMetaProps = (column?.uxMeta || {}) as InputUiMeta;

  const blurInput = useCallback(() => {
    const refElement = ref.current as HTMLElement;

    if (refElement) {
      refElement.blur();
    }
  }, []);

  const handleSave = useCallback(
    (_newValue?: string) => {
      const newValue = _newValue === undefined ? value : _newValue;

      blurInput();

      column?.onRecordChange?.({ column, record, value: newValue });
    },
    [blurInput, column, record, value],
  );

  const handleChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: any) => {
      const newValue = event.target.__value;
      setValue(newValue);
    },
    [setValue],
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

  const handleKeypress = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: any) => {
      if (event.code === 'Enter') {
        handleSave();
      }
    },
    [handleSave],
  );

  const handleSaveIconClick = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: any) => {
      event.stopPropagation();
      handleSave();
    },
    [handleSave],
  );

  const handleClickOutside = () => {
    if (isEditing.current) {
      setValue(_value);
    }
  };

  useOnClickOutside(ref, handleClickOutside);

  useEffect(() => {
    if (_value !== value) {
      setValue(_value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_value]);

  useEffect(() => {
    const mcInput = ref.current as HTMLElement;
    const mcTrailingIcon = mcInput.shadowRoot?.querySelector('mc-icon');

    if (mcInput) {
      mcInput.addEventListener('focus', handleEditStart);
      mcInput.addEventListener('blur', handleEditEnd);
    }

    if (mcTrailingIcon) {
      mcTrailingIcon.addEventListener('click', handleSaveIconClick);
    }

    return () => {
      if (mcInput) {
        mcInput.removeEventListener('focus', handleEditStart);
        mcInput.removeEventListener('blur', handleEditEnd);
      }

      if (mcTrailingIcon) {
        mcTrailingIcon.removeEventListener('click', handleSaveIconClick);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fmp-table-uitype-input">
      <McInput
        {...uiMetaProps}
        label=""
        clearbutton
        ref={ref}
        value={value}
        disabled={disabled}
        fit={fit}
        trailingicon="check-circle"
        input={handleChange}
        keypress={handleKeypress}
      />
    </div>
  );
}
