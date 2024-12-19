import { millisecondsToReadable } from './miliseconds-to-readable';

describe('millisecondsToReadable', () => {
  it('should handle milliseconds less than 10 correctly', () => {
    const result = millisecondsToReadable({ milliseconds: 9, digits: 3 });
    expect(result).toBe('00:00.009');
  });

  it('should return "00:00" for 0 milliseconds', () => {
    const result = millisecondsToReadable({ milliseconds: 0 });
    expect(result).toBe('00:00');
  });

  it('should format milliseconds to readable string with default options', () => {
    const result = millisecondsToReadable({ milliseconds: 1234567 });
    expect(result).toBe('20:34');
  });

  it('should format milliseconds to readable string with custom separator', () => {
    const result = millisecondsToReadable({
      milliseconds: 1234567,
      separator: '-',
    });
    expect(result).toBe('20-34');
  });

  it('should format milliseconds to readable string with 1 digit precision', () => {
    const result = millisecondsToReadable({ milliseconds: 1234567, digits: 1 });
    expect(result).toBe('20:34.5');
  });

  it('should format milliseconds to readable string with 2 digit precision', () => {
    const result = millisecondsToReadable({ milliseconds: 1234567, digits: 2 });
    expect(result).toBe('20:34.56');
  });

  it('should format milliseconds to readable string with 3 digit precision', () => {
    const result = millisecondsToReadable({ milliseconds: 1234567, digits: 3 });
    expect(result).toBe('20:34.567');
  });

  it('should omit hours if they are zero and always include minutes', () => {
    const result = millisecondsToReadable({ milliseconds: 59000 });
    expect(result).toBe('00:59');
  });

  it('should handle milliseconds greater than 999 correctly', () => {
    const result = millisecondsToReadable({ milliseconds: 61000, digits: 2 });
    expect(result).toBe('01:01.00');
  });

  it('should return "00:00" for 0 milliseconds with digits set to 0', () => {
    const result = millisecondsToReadable({ milliseconds: 0, digits: 0 });
    expect(result).toBe('00:00');
  });

  it('should return "00:00.000" for 0 milliseconds with digits set to 3', () => {
    const result = millisecondsToReadable({ milliseconds: 0, digits: 3 });
    expect(result).toBe('00:00.000');
  });
});
