import { getIconValues } from './get-icon-values';

describe('getIconValues', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should collect icon values from multiple lines of text', () => {
    const iconReferences = {
      '<JSX icon="flag"></JSX>': '<JSX icon="flag"></JSX>',
      '<JSX trailingicon="user"></JSX>': '<JSX trailingicon="user"></JSX>',
    };

    const result = getIconValues(iconReferences);

    expect(result.iconValues).toEqual(['flag', 'user']);
    expect(result.iconValuesError).toBe(false);
  });

  it('should handle multiple occurrences of the same icon value', () => {
    const iconReferences = {
      '<JSX icon="flag"></JSX>': '<JSX icon="flag"></JSX>',
      '<JSX trailingicon="flag"></JSX>': '<JSX trailingicon="flag"></JSX>', // Repeated icon value
    };

    const result = getIconValues(iconReferences);

    expect(result.iconValues).toEqual(['flag']);
    expect(result.iconValuesError).toBe(false);
  });

  it('should handle no icon values in the input', () => {
    const iconReferences = {
      '<JSX noicon="value"></JSX>': '<JSX noicon="value"></JSX>',
      '<JSX customicon="value"></JSX>': '<JSX customicon="value"></JSX>',
    };

    const result = getIconValues(iconReferences);

    expect(result.iconValues).toEqual([]);
    expect(result.iconValuesError).toBe(false);
  });
});
