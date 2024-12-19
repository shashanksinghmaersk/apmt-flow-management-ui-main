import { I18nLanguage } from '@fes/shared-i18n';
import { useAppStore } from '@fes/shared-store';
import { RouteName } from '@fes/shared-types';
import { ReactNode, useEffect, useRef } from 'react';
import { PageHeader } from '../page-header/page-header';
import { PageLayout } from '../page-layout/page-layout';
import { PageMenuDesktop } from '../page-menu-desktop/page-menu-desktop';
import { PageMenuMobile } from '../page-menu-mobile/page-menu-mobile';

export type PageApplicationProps = {
  children?: ReactNode;
  route?: RouteName;
  onLanguageChange: (language: I18nLanguage) => void;
  onRouteChange: (route?: RouteName | undefined) => void;
  onSignout: () => void;
  onDesktopMenuExpandedChange: (expanded: boolean) => void;
  onMobileMenuExpandedChange: (expanded: boolean) => void;
};

export const PageApplication = ({
  children,
  route,
  onLanguageChange,
  onRouteChange,
  onSignout,
  onDesktopMenuExpandedChange,
  onMobileMenuExpandedChange,
}: PageApplicationProps) => {
  const store = useAppStore();
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollEvent = new CustomEvent('appMainScroll', {
        detail: { message: 'Application Main has been scrolled' },
      });

      window.dispatchEvent(scrollEvent);
    };

    const element = mainRef.current;

    if (element) {
      element.addEventListener('scroll', handleScroll);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <>
      <div className="app__header">
        <PageHeader onLanguageChange={onLanguageChange} onSignout={onSignout} />
      </div>
      <div className="app__body">
        {store.fit !== 'small' && (
          <div className="app__menu">
            <PageMenuDesktop
              onMenuItemClick={onRouteChange}
              onMenuExpandChange={onDesktopMenuExpandedChange}
              route={route}
            />
          </div>
        )}
        <div ref={mainRef} className="app__main">
          <PageLayout>{children}</PageLayout>
        </div>
      </div>
      {store.fit === 'small' && (
        <PageMenuMobile
          onMenuItemClick={onRouteChange}
          onMenuExpandChange={onMobileMenuExpandedChange}
        />
      )}
    </>
  );
};
