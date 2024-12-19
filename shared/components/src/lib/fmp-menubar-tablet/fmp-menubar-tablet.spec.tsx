import { render } from '@testing-library/react';

import { FmpMenubarTablet } from './fmp-menubar-tablet';

describe('FmpMenubarTablet', () => {
  it('should andon button successfully', () => {
    const { baseElement } = render(<FmpMenubarTablet />);
    expect(baseElement).toBeTruthy();
  });
});
