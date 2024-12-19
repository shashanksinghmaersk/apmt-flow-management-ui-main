import { useTranslation } from '@fes/shared-i18n';
import { McButton, McCheckbox, McIcon } from '@maersk-global/mds-react-wrapper';
import { useCallback, useEffect, useRef } from 'react';
import { useGlobalCheckboxAction } from '../../hooks/use-global-checkbox-action/use-global-checkbox-action';

import type { ComponentProps, ReactNode } from 'react';
import type { FmpTableColumnUiTypeProps } from '../../types';
import type { ActionUiMeta } from './types';

export function Action<T>({
  column,
  record,
  fit = 'medium',
  meta,
}: FmpTableColumnUiTypeProps<T>) {
  const idKey = meta?.idKey as keyof T;
  const idKeyValue = record[idKey] as string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  const { checkboxGlobalItemChange, addCheckboxActionItem } =
    useGlobalCheckboxAction({});
  const { t } = useTranslation();

  const uiMetaProps = (column?.uxMeta || {}) as ActionUiMeta;
  const {
    type = 'button',
    icon,
    label,
    variant = 'outlined',
    appearance = 'neutral',
  } = uiMetaProps;

  const handleClick = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: any) => {
      switch (type) {
        case 'button':
          column.onRecordAction?.(column.id, record);
          break;
        case 'icon':
          column.onRecordAction?.(column.id, record);
          break;
        case 'checkbox':
          column.onRecordAction?.(column.id, record, event.detail);

          if (column.global) {
            checkboxGlobalItemChange(
              column.id,
              event.detail,
              record,
              idKey as string,
              idKeyValue,
              column.onGlobalChange,
            );
          }
          break;
        default:
          break;
      }
    },
    [checkboxGlobalItemChange, column, idKey, idKeyValue, record, type],
  );

  let size: '16' | '20' | '24' = '20';

  switch (fit) {
    case 'small':
      size = '16';
      break;
    case 'medium':
      size = '20';
      break;
    case 'large':
      size = '24';
      break;
    default:
      break;
  }

  let Output: ReactNode = '';

  const buttonProps: ComponentProps<typeof McButton> = {
    fit,
    icon,
    appearance,
    variant,
  };

  if (!label) {
    buttonProps.hiddenlabel = true;
  }

  switch (type) {
    case 'button':
      Output = (
        <McButton
          {...buttonProps}
          ref={ref}
          label={t(label || '')}
          onClick={handleClick}
        />
      );
      break;
    case 'icon':
      Output = (
        <McIcon ref={ref} size={size} icon={icon} onClick={handleClick} />
      );
      break;
    case 'checkbox':
      Output = (
        <McCheckbox
          ref={ref}
          fit={fit}
          hiddenlabel
          label={t(label || '')}
          change={handleClick}
        />
      );
      break;
    default:
      break;
  }

  useEffect(() => {
    if (column.global && type === 'checkbox' && ref.current && idKey) {
      addCheckboxActionItem(column.id, {
        id: idKeyValue,
        ref: ref.current,
        record,
        onAction: column.onRecordAction,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return Output;
}
