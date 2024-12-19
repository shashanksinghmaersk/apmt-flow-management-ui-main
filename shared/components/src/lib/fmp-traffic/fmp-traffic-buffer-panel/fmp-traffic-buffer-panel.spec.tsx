import { render } from '@testing-library/react';
import { FmpTrafficBufferPanel } from './fmp-traffic-buffer-panel';

describe('FmpTrafficBufferPanel', () => {
  it('should render successfully with no properties', () => {
    const { baseElement } = render(<FmpTrafficBufferPanel />);
    expect(baseElement).toBeTruthy();
  });

  it('should render successfully with properties', () => {
    const { baseElement } = render(<FmpTrafficBufferPanel />);
    expect(baseElement).toBeTruthy();
  });
});
