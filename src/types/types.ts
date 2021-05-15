export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface DayAstronomyData {
  sunrise: string;
  sunset: string;
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
  location: string;
  type: string;
}

export interface CachesDataSet {
  [id: string]: Cache[];
}
