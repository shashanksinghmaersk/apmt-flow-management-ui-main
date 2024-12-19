import { useTranslation } from '@fes/shared-i18n';
import {
  McButton,
  McInput,
  McModal,
  McTextarea,
} from '@maersk-global/mds-react-wrapper';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ModalInputUiMeta } from '../../types';

import type { ThemeFit } from '@fes/shared-types';

export type ModalInputModalProps = {
  open: boolean;
  metaProps?: ModalInputUiMeta;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClose: (value?: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  fit: ThemeFit;
};

export const ModalInputModal = ({
  metaProps = {},
  onClose,
  open,
  value: _value,
  fit,
}: ModalInputModalProps) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(_value);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const textareaRef = useRef<any>(null);

  const {
    type = 'textarea',
    heading,
    inputLabel,
    inputPlaceholder,
    saveLabel,
    cancelLabel,
    rows = 7,
    maxLength = 250,
  } = metaProps;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleValueChange = useCallback((event: any) => {
    const newValue = event.target.__value;

    setValue(newValue);
  }, []);

  const handleModalClosing = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: any) => {
      const action = event.detail.action;

      if (action === 'ok') {
        setValue(_value);
        onClose(value);
      }

      if (action === 'cancel') {
        setValue(_value);
        onClose();
      }
    },
    [_value, onClose, value],
  );

  const handleAutoFocus = useCallback(() => {
    let elementRef: HTMLElement | null;
    let innerElement: HTMLTextAreaElement | HTMLInputElement | null;

    switch (type) {
      case 'textarea':
        elementRef = textareaRef.current as HTMLElement;
        innerElement = elementRef.shadowRoot?.querySelector(
          'textarea',
        ) as HTMLTextAreaElement;

        if (innerElement) {
          innerElement.focus();
          innerElement.selectionStart = innerElement.value.length;
          innerElement.selectionEnd = innerElement.value.length;
        }

        break;
      case 'input':
        elementRef = inputRef.current as HTMLElement;
        innerElement = elementRef.shadowRoot?.querySelector(
          'input',
        ) as HTMLInputElement;

        if (innerElement) {
          innerElement.focus();
        }

        break;
      default:
        break;
    }
  }, [type]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        handleAutoFocus();
      }, 200);
    }
  }, [handleAutoFocus, open]);

  return (
    <McModal
      heading={t(heading || 'Edit Column Value')}
      dimension="medium"
      open={open}
      closing={handleModalClosing}
    >
      {type === 'textarea' && (
        <McTextarea
          autoFocus
          ref={textareaRef}
          name="modal-input-modal-textarea"
          label={t(inputLabel || 'Enter')}
          placeholder={t(inputPlaceholder || '')}
          maxlength={maxLength}
          fit={fit}
          rows={rows}
          value={value}
          input={handleValueChange}
        />
      )}
      {type === 'input' && (
        <McInput
          autoFocus
          ref={inputRef}
          name="modal-input-modal-input"
          label={t(inputLabel || 'Enter')}
          placeholder={t(inputPlaceholder || '')}
          maxlength={maxLength}
          fit={fit}
          input={handleValueChange}
        />
      )}
      <McButton
        focusstartanchor
        slot="primaryAction"
        appearance="primary"
        dialogaction="ok"
        fit={fit}
        disabled={!value}
      >
        {t(saveLabel || 'Save')}
      </McButton>
      <McButton
        focusendanchor
        slot="secondaryAction"
        appearance="neutral"
        variant="outlined"
        dialogaction="cancel"
        fit={fit}
      >
        {t(cancelLabel || 'Go Back')}
      </McButton>
    </McModal>
  );
};
