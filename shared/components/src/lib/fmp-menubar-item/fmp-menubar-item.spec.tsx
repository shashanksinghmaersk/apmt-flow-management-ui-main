import { render } from '@testing-library/react';

import { FmpMenubarItem } from './fmp-menubar-item';

describe('FmpMenubarItem', () => {
  it('should andon button successfully', () => {
    const { baseElement } = render(
      <FmpMenubarItem icon="chart-bars-vertical" link="andons" text="Andons" />,
    );
    expect(baseElement).toBeTruthy();
  });
});
