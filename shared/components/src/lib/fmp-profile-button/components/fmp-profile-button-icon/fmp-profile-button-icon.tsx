import { ThemeFit } from '@fes/shared-types';

import type { HTMLAttributes } from 'react';

export type FmpProfileButtonIconProps = {
  fit?: ThemeFit;
} & HTMLAttributes<SVGSVGElement>;

export const FmpProfileButtonIcon = ({
  fit,
  ...rest
}: FmpProfileButtonIconProps) => {
  const size = fit === 'small' ? '24' : '32';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      {...rest}
    >
      <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" fill="#FFEFEC" />
      <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#FF6000" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 10C14.4687 10 13.2273 11.2414 13.2273 12.7727C13.2273 14.3041 14.4687 15.5455 16 15.5455C17.5313 15.5455 18.7727 14.3041 18.7727 12.7727C18.7727 11.2414 17.5313 10 16 10ZM12.2273 12.7727C12.2273 10.6891 13.9164 9 16 9C18.0836 9 19.7727 10.6891 19.7727 12.7727C19.7727 14.8563 18.0836 16.5455 16 16.5455C13.9164 16.5455 12.2273 14.8563 12.2273 12.7727ZM12.1818 18.4909C11.253 18.4909 10.5 19.2439 10.5 20.1727V21.8545H21.5V20.1727C21.5 19.2439 20.747 18.4909 19.8182 18.4909H12.1818ZM9.5 20.1727C9.5 18.6916 10.7007 17.4909 12.1818 17.4909H19.8182C21.2993 17.4909 22.5 18.6916 22.5 20.1727V22.8545H9.5V20.1727Z"
        fill="#FF6000"
      />
    </svg>
  );
};
