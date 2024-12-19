import { getIconFromString } from './get-icon-from-string';

describe('getIconFromString', () => {
  it('should collect icon values from a string', () => {
    const value = '<Component icon="flag"></Component>';
    const result = getIconFromString(value);

    expect(result.iconValues).toEqual(['flag']);
    expect(result.iconValuesError).toBe(false);
  });

  it('should handle multiple occurrences of the same icon value', () => {
    const value =
      '<Component icon="flag"></Component><Component icon="flag"><Component trailingicon="flag"/></Component>';
    const result = getIconFromString(value);

    expect(result.iconValues).toEqual(['flag']);
    expect(result.iconValuesError).toBe(false);
  });

  it('should handle no icon values in the input', () => {
    const value = '<Component noicon="value"><Component trailingicon="flag"/></Component>';
    const result = getIconFromString(value);

    expect(result.iconValues).toEqual(['flag']);
    expect(result.iconValuesError).toBe(false);
  });

  it('should handle only whole word values in the input', () => {
    const value = '<Component noicon="value"><Componenttrailingicon="flag"/></Component>';
    const result = getIconFromString(value);

    expect(result.iconValues).toEqual([]);
    expect(result.iconValuesError).toBe(false);
  });
});
