import { Dispatch, SetStateAction } from 'react';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface DayAstronomyData {
  sunrise: string;
  sunset: string;
  time: string;
}

export interface DayWeatherData {
  airTemperature: {
    sg: number;
  };
  time: string;
}

export interface DayForecast {
  sunrise: string;
  sunset: string;
  weather: {
    [hour: string]: {
      airTemperature: {
        sg: number;
      };
    };
  };
}

export interface ForecastDataSet {
  [day: string]: DayForecast;
}

export interface Cache {
  name: string;
  type: string;
  key: string;
}

export interface CachesDataSet {
  [id: string]: Cache[];
}

export interface CacheDetails {
  name: string;
  short_description: string;
  size2: string;
  difficulty: number;
  recommendations: number;
  rating_votes: number;
  rating: number;
  founds: number;
  watchers: number;
  images: {
    is_spoiler: string;
    uuid: string;
    thumb_url: string;
  }[];
}

export interface AuthProviderValue {
  isAuthenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
}
