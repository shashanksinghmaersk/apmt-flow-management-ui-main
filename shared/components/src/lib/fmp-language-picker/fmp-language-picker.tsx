import { useTranslation } from '@fes/shared-i18n';
import { McOption, McSelect } from '@maersk-global/mds-react-wrapper';
import cx from 'classnames';

import type { I18nLanguage } from '@fes/shared-i18n';
import type { ThemeFit } from '@fes/shared-types';

import './fmp-language-picker.scss';

export type FmpLanguagePickerProps = {
  language?: I18nLanguage;
  onChange?: (language: I18nLanguage) => void;
  className?: string;
  fit?: ThemeFit;
};

export const FmpLanguagePicker = ({
  className,
  language,
  onChange,
  fit = 'medium',
}: FmpLanguagePickerProps) => {
  const { t } = useTranslation();
  const classNames = cx(className, 'fmp-language-picker');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOptionSelect = (e: CustomEvent<any>) => {
    const value = e.detail.value as I18nLanguage;

    if (value !== language) {
      onChange?.(value);
    }
  };

  return (
    <div className={classNames}>
      <McSelect
        fit={fit}
        label={t('Pick Language')}
        optionswidth="trigger"
        name="language"
        value={language}
        optionselected={handleOptionSelect}
      >
        <McOption value="en" selected={language === 'en'}>
          English
        </McOption>
        <McOption value="da" selected={language === 'da'}>
          Danish
        </McOption>
      </McSelect>
    </div>
  );
};
