import { REMOTE_CONTROL_OPS2OPS_UI_MOCK_DATA } from '@fes/shared-api';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { FmpSearch, FmpSearchProps } from './fmp-remote-handling-search';

// Mock the custom hook `useTranslation`
jest.mock('@fes/shared-i18n', () => ({
  useTranslation: jest.fn().mockReturnValue({
    t: (key: string) => key, // Mock translation function to return the key itself
  }),
}));

// Mock the custom components `IcButton` and `IcTypeahead`
jest.mock('@maersk-global/mds-react-wrapper', () => ({
  McButton: ({ label, click }: { label: string; click: () => void }) => (
    <button onClick={click}>{label}</button>
  ),
  McTypeahead: ({
    optionselected,
    clearbuttonclick,
  }: {
    data: Array<{ label: string; value: string }>;
    optionselected: (event: React.ChangeEvent<HTMLInputElement>) => void;
    clearbuttonclick: () => void;
  }) => (
    <div>
      <input
        data-testid="typeahead-input"
        onChange={optionselected}
        placeholder="Type to search..."
      />
      <button onClick={clearbuttonclick} data-testid="clear-button">
        Clear
      </button>
    </div>
  ),
}));

describe('FmpSearch Component', () => {
  const mockSearchItem = jest.fn();

  const setup = (props: Partial<FmpSearchProps> = {}) => {
    render(
      <FmpSearch
        data={REMOTE_CONTROL_OPS2OPS_UI_MOCK_DATA}
        searchItem={mockSearchItem}
        {...props}
      />,
    );
  };

  /* it('should render search input and buttons', () => {
    setup();

    expect(screen.getByPlaceholderText('FmpSearch for ID')).toBeInTheDocument();
    expect(screen.getByText('FmpSearch')).toBeInTheDocument();
    expect(screen.getByTestId('clear-button')).toBeInTheDocument();
  }); */

  it('should call searchItem with correct value on input change', () => {
    setup();

    const input = screen.getByTestId('typeahead-input');
    fireEvent.change(input, { target: { value: 'value1' } });

    expect(mockSearchItem).toHaveBeenCalledWith(
      REMOTE_CONTROL_OPS2OPS_UI_MOCK_DATA,
      'value1',
    );
  });

  it('should call searchItem with empty string on clear button click', () => {
    setup();

    const clearButton = screen.getByTestId('clear-button');
    fireEvent.click(clearButton);

    expect(mockSearchItem).toHaveBeenCalledWith(REMOTE_CONTROL_OPS2OPS_UI_MOCK_DATA, '');
  });

  /* it('should call searchItem with correct value on search button click', () => {
    setup();

    const searchButton = screen.getByText('FmpSearch');
    fireEvent.click(searchButton);

    expect(mockSearchItem).toHaveBeenCalledTimes(1);
  }); */
});
