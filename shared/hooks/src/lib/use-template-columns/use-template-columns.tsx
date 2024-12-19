import { useAppStore } from '@fes/shared-store';

export type UseTemplateColumnsProps = {
  layout?: number[];
  breakpoints?: number[];
};

export const useTemplateColumns = (props?: UseTemplateColumnsProps) => {
  const { layout = [1, 2, 3], breakpoints = [0, 980, 1400] } = props || {};

  const { appWidth, menuDesktopExpanded: menuExpanded, fit } = useAppStore();

  const menuWidth = menuExpanded ? 248 : 84;
  const width = (appWidth || 0) - (fit === 'small' ? 0 : menuWidth);

  let gridTemplateColumns = '1fr';

  breakpoints.forEach((breakpoint, index) => {
    if (width >= breakpoint) {
      gridTemplateColumns = '1fr '.repeat(layout[index]);
    }
  });

  return { gridTemplateColumns };
};
