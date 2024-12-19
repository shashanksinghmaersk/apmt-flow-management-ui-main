export const getBoundingClientRect = (element?: HTMLElement | null) => {
  if (!element) {
    return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
  }

  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  const shadowRoot = element.getRootNode() as ShadowRoot;

  if (shadowRoot && shadowRoot.host) {
    const shadowRect = (shadowRoot.host as HTMLElement).getBoundingClientRect();
    return {
      top: rect.top + scrollTop + shadowRect.top,
      bottom: rect.bottom + scrollTop + shadowRect.top,
      left: rect.left + scrollLeft + shadowRect.left,
      right: rect.right + scrollLeft + shadowRect.left,
      width: rect.width,
      height: rect.height,
    };
  }

  return {
    top: rect.top + scrollTop,
    bottom: rect.bottom + scrollTop,
    left: rect.left + scrollLeft,
    right: rect.right + scrollLeft,
    width: rect.width,
    height: rect.height,
  };
};
