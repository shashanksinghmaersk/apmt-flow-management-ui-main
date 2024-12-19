import { useTranslation } from '@fes/shared-i18n';
import { McButton, McTypeahead } from '@maersk-global/mds-react-wrapper';
import { useCallback, useState } from 'react';

import { RemoteHandling, RemoteHandlingItem } from '@fes/shared-types';

import './fmp-remote-handling-search.scss';

export type FmpSearchProps = {
  data: RemoteHandling;
  searchItem: (data: RemoteHandling, inputValue: string) => void;
};

export const FmpSearch = ({ data, searchItem }: FmpSearchProps) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');

  const handleSearch = useCallback(() => {
    searchItem(data, inputValue);
  }, [data, inputValue, searchItem]);

  const handleChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: any) => {
      const _value = event.target.value;
      setInputValue(_value);
      searchItem(data, _value); // Trigger search with the new value
    },
    [data, searchItem],
  );

  const sanitizedData = (data: RemoteHandling) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sanitizedArray: any[] = [];

    // Using Object.values to iterate over the arrays inside the data object
    Object.values(data).forEach((items) => {
      items.map((item: RemoteHandlingItem) => {
        if (item.cheShortName) {
          sanitizedArray.push({
            label: item.cheShortName,
            value: item.cheShortName,
          });
        }
        return sanitizedArray;
      });
    });

    return sanitizedArray;
  };

  return (
    <div className="fmp-remote-handling-search-field">
      <div className="fmp-remote-handling-search-field__input">
        <McTypeahead
          data={sanitizedData(data)}
          label=""
          placeholder={t('Search for CHE ID')}
          icon="magnifying-glass"
          clearbutton
          search={(e) => setInputValue(e.detail)}
          optionselected={handleChange}
          clearbuttonclick={handleChange}
        />
      </div>
      <div className="fmp-remote-handling-search-field__button">
        <McButton
          label={t('Search')}
          appearance="primary"
          click={handleSearch}
        ></McButton>
      </div>
    </div>
  );
};
