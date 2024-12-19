import {
  FmpBrand,
  FmpHeader,
  FmpProfileButton,
  Typography,
} from '@fes/shared-components';
import { useTranslation } from '@fes/shared-i18n';
import { useAppStore, useKeycloakStore } from '@fes/shared-store';

import type { I18nLanguage } from '@fes/shared-i18n';

export type PageHeaderProps = {
  onLanguageChange: (language: I18nLanguage) => void;
  onSignout: () => void;
};

export const PageHeader = ({ onLanguageChange, onSignout }: PageHeaderProps) => {
  const { language = 'en', fit, appWidth = 0, pageTitle = '' } = useAppStore();
  const { profile } = useKeycloakStore();
  const { t } = useTranslation();

  return (
    <FmpHeader
      fit={fit}
      className="app__header"
      InfoArea={
        <div className="app__header-info">
          <FmpBrand fit={fit} />
          {fit === 'small' && (
            <div className="app__header-info-text">
              <Typography
                type="text"
                size="small"
                weak
                weight="bold"
                style={{
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  width: appWidth - 200,
                }}
              >
                {t(pageTitle)}
              </Typography>
            </div>
          )}
        </div>
      }
      ActionArea={
        <FmpProfileButton
          onLanguageChange={onLanguageChange}
          onSignout={onSignout}
          language={language}
          profile={profile}
          fit={fit}
        />
      }
    />
  );
};
