import { useEndpoint } from '@fes/shared-api';

import { useCallback, useEffect, useState } from 'react';
import { useDidMount } from 'rooks';

import { FmpSearch } from '../fmp-remote-handling-search/fmp-remote-handling-search';
import { FmpRemoteHandlingTable } from '../fmp-remote-handling-table/fmp-remote-handling-table';

import type {
  RemoteHandling,
  RemoteHandlingKey,
  RemoteHandlingRequest,
  RemoteHandlingResponse,
} from '@fes/shared-types';

import './fmp-remote-handling-tables.scss';

export const FmpRemoteHandlingTables = () => {
  const { data, getRequest } = useEndpoint<
    RemoteHandling,
    RemoteHandling,
    RemoteHandlingResponse,
    RemoteHandlingRequest
  >({
    endpoint: 'remote-handling',
  });

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [filteredData, setFilteredData] = useState<RemoteHandling>();
  const [searchValue, setSearchValue] = useState('');

  const remoteHandlingKeys: RemoteHandlingKey[] = ['QCs', 'RTGs', 'EHs', 'TTs'];
  // const data1 = REMOTE_CONTROL_OPS2OPS_UI_MOCK_DATA;
  useDidMount(() => {
    getRequest();
    if (data) {
      setFilteredData(data);
    }
  });

  // Search function
  const searchItem = useCallback((data: RemoteHandling, searchValue: string) => {
    if (!data) return;

    const sanitizedSearchValue = searchValue?.trim() || '';

    if (sanitizedSearchValue === '') {
      setIsSearchActive(false);
      setFilteredData(data); // Reset to full data if search is cleared
    } else {
      setSearchValue(sanitizedSearchValue);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const filteredData: any = {};
      Object.entries(data).forEach(([key, items]) => {
        const filteredItems = items.filter((item) =>
          item.cheShortName.includes(searchValue),
        );
        if (filteredItems.length > 0) {
          filteredData[key] = filteredItems;
        }
      });
      setIsSearchActive(true);
      setFilteredData(filteredData);
    }
  }, []);

  useEffect(() => {
    if (data) {
      searchItem(data, searchValue);
    }
  }, [data, searchItem, searchValue]);

  return (
    <div>
      {data && <FmpSearch data={data} searchItem={searchItem} />}

      <div className="fmp-remote-handling-tables">
        {(isSearchActive ? filteredData : data) &&
          remoteHandlingKeys.map((itemKey) => {
            const currentData = isSearchActive ? filteredData : data;
            console.log(currentData);
            if (currentData?.[itemKey] && currentData[itemKey].length > 0) {
              return (
                <div key={itemKey} className="fmp-remote-handling-tables__table">
                  <FmpRemoteHandlingTable
                    itemKey={itemKey}
                    data={(isSearchActive ? currentData : data)?.[itemKey] || []}
                  />
                </div>
              );
            }
            return null;
          })}
      </div>
    </div>
  );
};
