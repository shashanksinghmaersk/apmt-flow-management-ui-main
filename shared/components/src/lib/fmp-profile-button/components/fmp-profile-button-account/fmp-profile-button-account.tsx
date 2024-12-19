import { useTranslation } from '@fes/shared-i18n';
import { McAvatar } from '@maersk-global/mds-react-wrapper';
import { Typography } from '../../../typography/typography';

import type { KeycloakProfile } from 'keycloak-js';

import './fmp-profile-button-account.scss';

export type FmpProfileButtonAccountProps = {
  profile?: KeycloakProfile;
};

export const FmpProfileButtonAccount = ({
  profile,
}: FmpProfileButtonAccountProps) => {
  const { t } = useTranslation();

  const combinedName = `${profile?.firstName} ${profile?.lastName}`;

  return (
    <div className="fmp-profile-button-account">
      <Typography
        className="fmp-profile-button-account__title"
        weight="medium"
        size="x-small"
      >
        {t('Account')}
      </Typography>
      <div className="fmp-profile-button-account__main">
        <div className="fmp-profile-button-account__avatar">
          <McAvatar fit="small" info={combinedName} />
        </div>
        <div>
          <Typography className="fmp-profile-button-account__name" size="small">
            {combinedName}
          </Typography>
          <Typography
            className="fmp-profile-button-account__email"
            size="x-small"
            weak
          >
            {profile?.email}
          </Typography>
        </div>
      </div>
    </div>
  );
};
