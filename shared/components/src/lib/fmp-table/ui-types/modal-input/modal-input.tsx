import { useTranslation } from '@fes/shared-i18n';
import { McButton } from '@maersk-global/mds-react-wrapper';
import { useCallback, useState } from 'react';
import { ModalInputModal } from './components/modal-input-modal/modal-input-modal';
import { ModalInputValue } from './components/modal-input-value/modal-input-value';

import type { FmpTableColumnUiTypeProps } from '../../types';
import type { ModalInputUiMeta } from './types';

export function ModalInput<T>({
  column,
  value,
  record,
  fit = 'medium',
  disabled,
}: FmpTableColumnUiTypeProps<T>) {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const callbackFn = column?.onRecordChange;
  const uiMeta = (column.uxMeta || {}) as ModalInputUiMeta;
  const { addLabel, editLabel, addIcon, ...restUiMeta } = uiMeta;

  const handleEditClick = useCallback(() => {
    if (!disabled) {
      setModalOpen(true);
      column.onRecordEditStart?.();
    }
  }, [column, disabled]);

  const handleModalClose = useCallback(
    (newValue: string) => {
      setModalOpen(false);

      if (newValue !== undefined) {
        callbackFn?.({ column, record, value: newValue });
      }

      column.onRecordEditEnd?.();
    },
    [callbackFn, column, record],
  );

  const Cell = value ? (
    <ModalInputValue
      value={value}
      width={column.width || '100%'}
      editLabel={editLabel || 'Edit'}
      onClick={handleEditClick}
      disabled={disabled}
    />
  ) : (
    <McButton
      icon={addIcon || 'comment'}
      label={t(uiMeta.addLabel || 'Add')}
      appearance="neutral"
      fit={fit}
      disabled={disabled}
      onClick={handleEditClick}
    />
  );

  return (
    <>
      {Cell}
      <ModalInputModal
        open={modalOpen}
        onClose={handleModalClose}
        value={value}
        metaProps={restUiMeta}
        fit={fit}
      />
    </>
  );
}
