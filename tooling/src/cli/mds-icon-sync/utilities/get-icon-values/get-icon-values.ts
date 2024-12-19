import { getIconFromString } from '../get-icon-from-string/get-icon-from-string';

/**
 * Iterates through an object of unique lines of text that contain icon references
 * and gathers all unique icon reference values in each line of text.
 * @param iconReferences - Object of lines of text with icon references
 * @returns Object with unique icon values and an error flag
 */
export const getIconValues = (iconReferences: Record<string, string>) => {
  let hasIconValuesError = false;
  const uniqueIconValues: Set<string> = new Set();

  try {
    for (const lineText in iconReferences) {
      const { iconValues: lineIconValues, iconValuesError: lineIconValuesError } =
        getIconFromString(lineText);

      if (lineIconValuesError) {
        hasIconValuesError = lineIconValuesError;
      } else {
        lineIconValues.forEach((value) => {
          uniqueIconValues.add(value);
        });
      }
    }
  } catch (error) {
    hasIconValuesError = true;
  }

  return { iconValues: [...uniqueIconValues], iconValuesError: hasIconValuesError };
};
