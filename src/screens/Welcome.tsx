import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from '../components';
import { colors } from '../styles/colors';
import {
  getAstronomyInfo,
  getWeather,
} from '../services/weather/weatherService';
import { Coordinates, ForecastDataSet } from '../types/types';
import { formatDateTime } from '../services/formatters/dateAndTime';
import { roundHalf } from '../services/formatters/number';
import { LocationContext } from '../services/context/LocationProvider';

const App = () => {
  const [forecast, setForecast] = useState<ForecastDataSet>();
  const location = useContext(LocationContext) as Coordinates;

  useEffect(() => {
    if (!location) {
      return;
    }
    const init = async () => {
      const [astronomy, weather] = await Promise.all([
        getAstronomyInfo(location),
        getWeather(location),
      ]);

      const forecastData = astronomy.reduce<ForecastDataSet>(
        (results, { time, sunrise, sunset }) => {
          const date = formatDateTime(time, 'dd/MM/yyyy');
          results[date] = { sunrise, sunset, weather: {} };
          return results;
        },
        {},
      );

      weather.map(({ time, ...weatherHourInfo }) => {
        const date = formatDateTime(time, 'dd/MM/yyyy');
        const hour = formatDateTime(time, 'HH:mm');

        if (!forecastData[date]) {
          return;
        }

        forecastData[date] = {
          ...forecastData[date],
          weather: { ...forecastData[date].weather, [hour]: weatherHourInfo },
        };
      });

      setForecast(forecastData);
    };

    init();
  }, [location]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.content}>
        <Text style={styles.welcomeTitle}>Hello!</Text>
        <Text style={styles.welcomeText}>
          Here is the forecast for today and the next few days...
        </Text>

        {forecast ? (
          Object.keys(forecast).map(day => (
            <View style={styles.dayContainer} key={day}>
              <Text style={styles.day}>{day}</Text>
              <View style={styles.forecastContainer}>
                <Text>
                  Temperature:{' '}
                  {roundHalf(forecast[day].weather['12:00']?.airTemperature.sg)}
                  °C
                </Text>
                <View>
                  <Text>Sunrise: {formatDateTime(forecast[day].sunrise)}</Text>
                  <Text>Sunset: {formatDateTime(forecast[day].sunset)}</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text>Loading...</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    height: '100%',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: colors.darkSecondary,
  },
  welcomeTitle: {
    marginBottom: 20,
    fontSize: 36,
    color: colors.font,
  },
  welcomeText: {
    marginBottom: 30,
    fontSize: 30,
  },
  dayContainer: {
    marginBottom: 10,
  },
  day: {
    marginBottom: 2,
    fontSize: 20,
  },
  forecastContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default App;
