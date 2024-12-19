import { render } from '@testing-library/react';

import { FmpMenubar } from './fmp-menubar';

describe('FmpMenubar', () => {
  it('should andon button successfully', () => {
    const { baseElement } = render(<FmpMenubar />);
    expect(baseElement).toBeTruthy();
  });
});
