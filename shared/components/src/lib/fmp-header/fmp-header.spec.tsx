import { render } from '@testing-library/react';

import { FmpHeader } from './fmp-header';

describe('FmpHeader', () => {
  it('should andon button successfully', () => {
    const { baseElement } = render(
      <FmpHeader InfoArea={<div />} ActionArea={<div />} />,
    );
    expect(baseElement).toBeTruthy();
  });
});
