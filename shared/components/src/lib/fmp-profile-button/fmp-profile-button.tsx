import { useTranslation } from '@fes/shared-i18n';
import { McList, McListItem, McMenu } from '@maersk-global/mds-react-wrapper';
import { FmpLanguagePicker } from '../fmp-language-picker/fmp-language-picker';
import { FmpProfileButtonAccount } from './components/fmp-profile-button-account/fmp-profile-button-account';
import { FmpProfileButtonIcon } from './components/fmp-profile-button-icon/fmp-profile-button-icon';

import type { I18nLanguage } from '@fes/shared-i18n';
import type { ThemeFit } from '@fes/shared-types';
import type { KeycloakProfile } from 'keycloak-js';

import './fmp-profile-button.scss';

export type FmpProfileButtonProps = {
  fit?: ThemeFit;
  language?: I18nLanguage;
  onLanguageChange?: (language: I18nLanguage) => void;
  onSignout?: () => void;
  profile?: KeycloakProfile;
};

export const FmpProfileButton = ({
  fit,
  profile,
  language,
  onLanguageChange,
  onSignout,
}: FmpProfileButtonProps) => {
  const { t } = useTranslation();

  return (
    <div className="fmp-profile-button">
      <McMenu position="bottom-right">
        <FmpProfileButtonIcon
          className="fmp-profile-button__trigger"
          fit={fit}
          slot="trigger"
        />
        <div className="fmp-profile-button__content">
          <div className="fmp-profile-button__content-item">
            <FmpProfileButtonAccount profile={profile} />
          </div>
          <div className="fmp-profile-button__content-item">
            <FmpLanguagePicker
              onChange={onLanguageChange}
              className="fmp-profile-button__content__language-picker"
              fit="small"
              language={language}
            />
          </div>
          <div className="fmp-profile-button__content-list">
            <McList fit="small" className="fmp-profile-button__list">
              <McListItem>{t('Manage Account')}</McListItem>
              <McListItem onClick={onSignout}>{t('Log Out')}</McListItem>
            </McList>
          </div>
        </div>
      </McMenu>
    </div>
  );
};
