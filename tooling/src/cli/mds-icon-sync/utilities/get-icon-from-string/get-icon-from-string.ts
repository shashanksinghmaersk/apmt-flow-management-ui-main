import { MAERSK_ICON_PROPERTY_NAMES } from '../../constants';

export const extractIconValues = (text: string, keys: string[]): string[] => {
  const values: string[] = [];

  const regex = new RegExp(`\\b(?:${keys.join('|')})\\s*=\\s*["']([^"']*)["']`, 'g');
  let match;

  while ((match = regex.exec(text)) !== null) {
    const [, matchedValue] = match;
    if (!values.includes(matchedValue)) {
      values.push(matchedValue);
    }
  }

  return values;
};

export const getIconFromString = (value: string) => {
  let iconValuesError = false;
  let iconValues: string[] = [];

  try {
    iconValues = extractIconValues(value, MAERSK_ICON_PROPERTY_NAMES);
  } catch (err) {
    iconValuesError = true;
  }

  return { iconValues, iconValuesError };
};
