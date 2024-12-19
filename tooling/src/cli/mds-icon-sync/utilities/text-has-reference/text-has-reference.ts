import { MAERSK_ICON_PROPERTY_NAMES } from '../../constants';

const createIconPropertyRegex = (propertyNames: string[]): RegExp => {
  const regexString = `\\b(${propertyNames.join('|')}=")`;
  return new RegExp(regexString);
};

const propertyRegex = createIconPropertyRegex(MAERSK_ICON_PROPERTY_NAMES);

export const textHasReference = (text: string) => propertyRegex.test(text);
