import { getIconReferences } from './get-icon-references';
import { textHasReference } from '../text-has-reference/text-has-reference';
import { readFileLines } from '../../../../utilities/read-file-lines/read-file-lines';

jest.mock('../text-has-reference/text-has-reference');
jest.mock('../../../../utilities/read-file-lines/read-file-lines');

describe('getIconReferences', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should collect icon references from multiple source files', async () => {
    const sourceFiles = ['file1.txt', 'file2.txt'];

    // Mock the implementation of textHasReference to always return true
    (textHasReference as jest.Mock).mockReturnValue(true);

    // Mock the implementation of readFileLines to call the callback for each line
    (readFileLines as jest.Mock).mockImplementation(async (_, callback) => {
      await Promise.resolve();
      callback({ lineNumber: 1, lineText: 'line1' });
      callback({ lineNumber: 2, lineText: 'line2' });
    });

    const result = await getIconReferences(sourceFiles);

    expect(result.iconReferences).toEqual({
      line1: 'line1', // Mocked textHasReference always returns true
      line2: 'line2', // Mocked textHasReference always returns true
    });
    expect(result.iconReferencesError).toBe(false);
  });

  it('should trim values properly', async () => {
    const sourceFiles = ['file1.txt', 'file2.txt'];

    // Mock the implementation of textHasReference to always return true
    (textHasReference as jest.Mock).mockReturnValue(true);

    // Mock the implementation of readFileLines to call the callback for each line
    (readFileLines as jest.Mock).mockImplementation(async (_, callback) => {
      await Promise.resolve();
      callback({ lineNumber: 1, lineText: '   line1' });
      callback({ lineNumber: 2, lineText: ' line2' });
    });

    const result = await getIconReferences(sourceFiles);

    expect(result.iconReferences).toEqual({
      line1: 'line1', // Mocked textHasReference always returns true
      line2: 'line2', // Mocked textHasReference always returns true
    });
    expect(result.iconReferencesError).toBe(false);
  });

  it('should handle complex text as key', async () => {
    const sourceFiles = ['file1.txt', 'file2.txt'];

    // Mock the implementation of textHasReference to always return true
    (textHasReference as jest.Mock).mockReturnValue(true);

    // Mock the implementation of readFileLines to call the callback for each line
    (readFileLines as jest.Mock).mockImplementation(async (_, callback) => {
      await Promise.resolve();
      callback({
        lineNumber: 1,
        lineText:
          '<Component icon="flag"></Component><Component icon="flag"><Component trailingicon="flag"/></Component>',
      });
      callback({ lineNumber: 2, lineText: ' line2' });
    });

    const result = await getIconReferences(sourceFiles);

    expect(result.iconReferences).toEqual({
      '<Component icon="flag"></Component><Component icon="flag"><Component trailingicon="flag"/></Component>':
        '<Component icon="flag"></Component><Component icon="flag"><Component trailingicon="flag"/></Component>',
      line2: 'line2', // Mocked textHasReference always returns true
    });
    expect(result.iconReferencesError).toBe(false);
  });

  // Add other test cases as needed
});
