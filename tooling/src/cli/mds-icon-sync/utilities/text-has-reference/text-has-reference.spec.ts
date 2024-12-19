import { textHasReference } from './text-has-reference';

const iconNames = [
  'flag',
  'emergency-light',
  'exclamation-triangle',
  'door-arrow-right',
  'user-circle',
  'clock',
  'double-chevron-right',
  'container-up',
  'user',
  'airplane-arrival',
];

describe('textHasReference', () => {
  it('should return true for code with "icon"', () => {
    const text = `<Component icon="${iconNames[0]}" />`;
    const result = textHasReference(text);

    expect(result).toBe(true);
  });

  it('should return true for code with "trailingicon"', () => {
    const text = `<Component trailingicon="${iconNames[1]}"></Component>`;
    const result = textHasReference(text);

    expect(result).toBe(true);
  });

  it('should return false for code without icon reference', () => {
    const text = '<Component></Component>';
    const result = textHasReference(text);

    expect(result).toBe(false);
  });

  it('should return true for mixed minified code with both "icon" and "trailingicon"', () => {
    const text = `<Component icon="${iconNames[2]}"><Component trailingicon="${iconNames[3]}"></Component></Component>`;
    const result = textHasReference(text);

    expect(result).toBe(true);
  });

  it('should return false for minified code with custom icon property name', () => {
    const text = `<Component customicon="${iconNames[4]}"></Component>`;
    const result = textHasReference(text);

    expect(result).toBe(false);
  });

  it('should return false for minified code with not whole word icon property name', () => {
    const text = `<Componenticon="${iconNames[4]}"></Component>`;
    const result = textHasReference(text);

    expect(result).toBe(false);
  });

  it('should handle trailingicon before an occurrence of icon', () => {
    const text = `<Component trailingicon="${iconNames[5]}"><Component icon="${iconNames[6]}"></Component></Component>`;
    const result = textHasReference(text);

    expect(result).toBe(true);
  });
});
