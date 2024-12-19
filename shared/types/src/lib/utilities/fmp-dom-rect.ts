export type FmpDOMRect =
  | DOMRect
  | {
      top: number;
      bottom: number;
      left: number;
      right: number;
      width: number;
      height: number;
    };
