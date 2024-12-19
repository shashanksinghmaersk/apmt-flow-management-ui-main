import { FmpBrand, Typography } from '@fes/shared-components';
import { McLoadingIndicator } from '@maersk-global/mds-react-wrapper';

import type { ReactNode } from 'react';

export type PageStatusProps = {
  message?: string;
  children?: ReactNode;
};

export const PageStatus = ({ message, children }: PageStatusProps) => {
  return (
    <div className="page-status">
      <div className="page-status__brand">
        <FmpBrand />
      </div>
      <div className="page-status__separator" />
      <div className="page-status__children">
        {message && (
          <h1 title={message}>
            <Typography
              type="headline"
              size="small"
              weight="medium"
              variant="weakest"
            >
              <McLoadingIndicator
                label="Loading"
                orientation="horizontal"
                fit="large"
                hiddenlabel
              ></McLoadingIndicator>
            </Typography>
          </h1>
        )}
        {children}
      </div>
    </div>
  );
};
