import { McCheckbox } from '@maersk-global/mds-react-wrapper';
import { useCallback, useEffect, useRef } from 'react';

import type { ThemeFit } from '@fes/shared-types';

export type FmpTableGlobalHeadersCheckboxProps = {
  id: string;
  fit?: ThemeFit;
  label?: string;
  checked?: boolean;
  onChange: (id: string, checked: boolean) => void;
  onMount: (id: string, ref: HTMLElement) => void;
};

export const FmpTableGlobalHeadersCheckbox = ({
  id,
  fit,
  label,
  checked,
  onChange,
  onMount,
}: FmpTableGlobalHeadersCheckboxProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);

  const handleChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: any) => {
      const checked = event.detail;
      onChange(id, checked);
    },
    [id, onChange],
  );

  useEffect(() => {
    if (ref.current) {
      onMount(id, ref.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <McCheckbox
      ref={ref}
      hiddenlabel
      fit={fit}
      label={label}
      checked={checked}
      change={handleChange}
    />
  );
};
