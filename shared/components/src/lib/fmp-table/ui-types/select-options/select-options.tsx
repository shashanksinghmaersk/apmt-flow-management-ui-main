import { McOption, McSelect } from '@maersk-global/mds-react-wrapper';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sanitizeMetaOptionsToString } from '../../utilities/sanitize-meta-options/sanitize-meta-options-to-string';

import type { ApiMetaOptionsKey } from '@fes/shared-types';
import type { FmpTableColumnUiTypeProps } from '../../types';
import type { SelectOptionsUiMeta } from './types';

export function SelectOptions<T>({
  column,
  value: _value,
  meta,
  record,
  fit = 'medium',
  disabled,
}: FmpTableColumnUiTypeProps<T>) {
  const { t } = useTranslation();
  const id = column?.id as ApiMetaOptionsKey<T>;
  const uiMetaProps = (column?.uxMeta || {}) as SelectOptionsUiMeta;
  const [value, setValue] = useState(_value);

  const {
    options: metaOptions,
    placeholder,
    label,
    ...restUiMetaProps
  } = uiMetaProps;

  const options = useMemo(() => {
    let _options: string[] = metaOptions || [];

    if (!metaOptions) {
      _options = sanitizeMetaOptionsToString({ id, meta, record });
    }

    return _options;
  }, [id, meta, metaOptions, record]);

  const handleChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: any) => {
      const newValue = event.detail.value;

      if (newValue !== value) {
        setValue(newValue);
        column?.onRecordChange?.({ column, record, value: newValue });
      }
    },
    [column, record, value],
  );

  useEffect(() => {
    if (_value !== value) {
      setValue(_value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_value]);

  const hasNoOptions = options.length === 0;

  return (
    <McSelect
      value={value}
      disabled={disabled || hasNoOptions}
      fit={fit}
      optionswidth="auto"
      optionselected={handleChange}
      opened={column?.onRecordEditStart}
      closed={column?.onRecordEditEnd}
      placeholder={hasNoOptions ? t('No Options') : t(placeholder || '')}
      label={t(label || '')}
      {...restUiMetaProps}
    >
      {options.map((optionsValue) => {
        return (
          <McOption value={optionsValue} key={optionsValue}>
            {t(optionsValue)}
          </McOption>
        );
      })}
    </McSelect>
  );
}
