export const getLayoutValues = <T extends HTMLElement>(element?: T | null) => {
  if (!element) {
    return { paddingLeft: 0, paddingRight: 0, borderWidthLeft: 0, borderWidthRight: 0 };
  }

  const computedStyle = getComputedStyle(element);

  return {
    paddingLeft: parseFloat(computedStyle.paddingLeft),
    paddingRight: parseFloat(computedStyle.paddingRight),
    borderWidthLeft: parseFloat(computedStyle.borderLeftWidth),
    borderWidthRight: parseFloat(computedStyle.borderLeftWidth),
  };
};
