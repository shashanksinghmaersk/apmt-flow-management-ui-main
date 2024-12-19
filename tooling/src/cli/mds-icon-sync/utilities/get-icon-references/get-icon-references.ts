import { readFileLines } from '../../../../utilities/read-file-lines/read-file-lines';
import { textHasReference } from '../text-has-reference/text-has-reference';

export const getIconReferences = async (sourceFiles: string[]) => {
  let iconReferencesError = false;
  const iconReferences: Record<string, string> = {};

  try {
    // Collect an object of text lines that matches icon property usage references
    // through the regex match with the text line itself as key to kind of memoize
    for await (const file of sourceFiles) {
      await readFileLines(file, ({ lineText: _lineText }) => {
        const lineText = _lineText.trim();
        const lineTextHasReference = textHasReference(lineText);

        if (lineTextHasReference && !iconReferences[lineText]) {
          iconReferences[lineText] = lineText;
        }
      });
    }
  } catch (err) {
    iconReferencesError = true;
  }

  return { iconReferences, iconReferencesError };
};
