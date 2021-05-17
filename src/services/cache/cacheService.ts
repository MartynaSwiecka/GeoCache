import { OKAPI_CONSUMER_KEY } from 'react-native-dotenv';
import { CacheDetails, CachesDataSet, Coordinates } from '../../types/types';

const baseUrl = 'https://opencaching.pl/okapi/services';
const defaultSearchingRadius = 10;

export const getCaches: (
  coordinates: Coordinates,
  searchingRadius?: number,
) => Promise<CachesDataSet | undefined> = async (
  coordinates,
  searchingRadius = defaultSearchingRadius,
) => {
  const { latitude, longitude } = coordinates;

  try {
    let response = await fetch(
      `${baseUrl}/caches/shortcuts/search_and_retrieve?search_method=services/caches/search/nearest&search_params={"limit":"100","center":"${latitude}|${longitude}","radius": ${searchingRadius}, "status": "Available"}&retr_method=services/caches/geocaches&retr_params={"fields":"name|type"}&wrap=false&consumer_key=${OKAPI_CONSUMER_KEY}`,
    );

    const data = await response.json();

    return Object.keys(data).reduce<CachesDataSet>((dataSet, key) => {
      const { type, ...item } = data[key];

      if (dataSet[type]) {
        dataSet[type].push({ ...item, key });
      } else {
        dataSet[type] = [{ ...item, key }];
      }
      return dataSet;
    }, {});
  } catch (error) {
    console.error(error);
  }
};

export const getCache: (
  cacheId: string,
  coordinates: Coordinates,
) => Promise<CacheDetails> = async (cacheId, coordinates) => {
  const { latitude, longitude } = coordinates;

  try {
    let response = await fetch(
      `${baseUrl}/caches/geocache?cache_code=${cacheId}&fields=name|founds|watchers|size2|difficulty|rating|rating|rating_votes|recommendations|short_description|images&my_location=${latitude}|${longitude}&consumer_key=${OKAPI_CONSUMER_KEY}`,
    );

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
