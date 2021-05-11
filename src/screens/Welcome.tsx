import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { colors } from '../styles/colors';
import {
  getAstronomyInfo,
  getWeather,
} from '../services/weather/weatherService';
import { Coordinates, ForecastDataSet } from '../types/types';
import { formatDateTime } from '../services/formatters/dateAndTime';
import { roundHalf } from '../services/formatters/number';

const App = () => {
  const [location, setLocation] = useState<Coordinates>();
  const [forecast, setForecast] = useState<ForecastDataSet>();

  useEffect(() => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    let watcherId: number;
    check(permission).then(permissionResult => {
      if (permissionResult === RESULTS.GRANTED) {
        watcherId = enableLocation();
      } else if (permissionResult === RESULTS.DENIED) {
        request(permission).then(result => {
          if (result === RESULTS.GRANTED) {
            watcherId = enableLocation();
          }
        });
      }
    });

    return () => {
      Geolocation.clearWatch(watcherId);
    };
  }, []);

  const enableLocation = () => {
    return Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      undefined,
      {
        enableHighAccuracy: true,
        interval: 1000,
        showLocationDialog: false,
      },
    );
  };

  useEffect(() => {
    if (!location) {
      return;
    }
    const init = async () => {
      const [astronomy, weather] = await Promise.all([
        getAstronomyInfo(location),
        getWeather(location),
      ]);

      console.log(astronomy, weather);

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

        console.log(date, hour, forecastData[date], forecastData[date].weather);

        if (!forecastData[date]) {
          return;
        }

        forecastData[date] = {
          ...forecastData[date],
          weather: { ...forecastData[date].weather, [hour]: weatherHourInfo },
        };
      });

      console.log('forecastData', forecastData);

      setForecast(forecastData);
    };

    init();
  }, [location]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
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
                <Text style={styles.text}>
                  Temperature:
                  {roundHalf(forecast[day].weather['12:00'].airTemperature.sg)}
                  °C
                </Text>
                <View>
                  <Text style={styles.text}>
                    Sunrise: {formatDateTime(forecast[day].sunrise)}
                  </Text>
                  <Text style={styles.text}>
                    Sunset: {formatDateTime(forecast[day].sunset)}
                  </Text>
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
    color: colors.font,
  },
  dayContainer: {
    marginBottom: 10,
  },
  day: {
    marginBottom: 2,
    fontSize: 20,
    color: colors.font,
  },
  forecastContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: colors.font,
  },
});

export default App;
