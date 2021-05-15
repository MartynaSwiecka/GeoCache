import { OKAPI_CONSUMER_KEY } from 'react-native-dotenv';
import { CachesDataSet, Coordinates } from '../../types/types';

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
      `${baseUrl}/caches/shortcuts/search_and_retrieve?search_method=services/caches/search/nearest&search_params={"limit":"100","center":"${latitude}|${longitude}","radius": ${searchingRadius}, "status": "Available"}&retr_method=services/caches/geocaches&retr_params={"fields":"name|location|type"}&wrap=false&consumer_key=${OKAPI_CONSUMER_KEY}`,
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
