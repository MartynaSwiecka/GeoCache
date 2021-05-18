import { STORMGLASS_API_KEY } from 'react-native-dotenv';
import { DateTime } from 'luxon';
import {
  DayAstronomyData,
  DayWeatherData,
  Coordinates,
} from '../../types/types';

const baseUrl = 'https://api.stormglass.io/v2';
const defaultDaysCount = 10;

export const getAstronomyInfo: (
  coordinates: Coordinates,
) => Promise<DayAstronomyData[]> = async coordinates => {
  const { latitude, longitude } = coordinates;
  const endDate = DateTime.now().plus({ days: defaultDaysCount }).toISODate();

  try {
    let response = await fetch(
      `${baseUrl}/astronomy/point?lat=${latitude}&lng=${longitude}&end=${endDate}`,
      {
        headers: {
          Authorization: STORMGLASS_API_KEY,
        },
      },
    );

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error(error);
  }
};

export const getWeather: (
  coordinates: Coordinates,
) => Promise<DayWeatherData[]> = async coordinates => {
  const { latitude, longitude } = coordinates;
  const endDate = DateTime.now().plus({ days: defaultDaysCount }).toISODate();

  try {
    let response = await fetch(
      `${baseUrl}/weather/point?lat=${latitude}&lng=${longitude}&params=airTemperature&end=${endDate}`,
      {
        headers: {
          Authorization: STORMGLASS_API_KEY,
        },
      },
    );

    const json = await response.json();

    return json.hours;
  } catch (error) {
    console.error(error);
  }
};
