import dynamic from 'next/dynamic';

export * from './lib/theme';
export * from './lib/utilities/get-appearance-values/get-appearance-values';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MdsConfig: any = dynamic(
  () =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (import('@maersk-global/mds-config') as any).then(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mdsFramework: any) => mdsFramework.MdsConfig,
    ),
  { ssr: false },
);
