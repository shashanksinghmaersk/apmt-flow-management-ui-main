import { useTranslation } from '@fes/shared-i18n';
import { useAppStore } from '@fes/shared-store';
import cx from 'classnames';
import { useEffect } from 'react';
import { Typography } from '../typography/typography';

import type { HTMLAttributes, ReactNode } from 'react';

import './fmp-page.scss';

export type FmpPageProps = {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  Action?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export const FmpPage = ({
  title,
  subtitle,
  className,
  Action,
  children,
  ...rest
}: FmpPageProps) => {
  const {
    updateAppStore: updateStore,
    pageTitle,
    pageSubtitle,
    fit,
  } = useAppStore();
  const { t } = useTranslation();

  const classNames = cx(className, 'fmp-page', {
    'fmp-page--mobile': fit === 'small',
    [`${className}--mobile`]: className && fit === 'small',
  });

  useEffect(() => {
    updateStore?.({ pageTitle: title, pageSubtitle: subtitle });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classNames} {...rest}>
      {(pageTitle || pageSubtitle) && (
        <div className="fmp-page__header">
          <div className="fmp-page__header-titles">
            {fit !== 'small' && (
              <>
                {pageTitle && (
                  <Typography weak type="headline" size="small">
                    {t(pageTitle)}
                  </Typography>
                )}
                {pageSubtitle && (
                  <Typography type="text" size="large">
                    {t(pageSubtitle)}
                  </Typography>
                )}
              </>
            )}
          </div>
          <div className="fmp-page__header-action">{Action}</div>
        </div>
      )}
      <div className="fmp-page__main">{children}</div>
    </div>
  );
};
