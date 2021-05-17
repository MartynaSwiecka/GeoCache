import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  FC,
} from 'react';
import { Platform } from 'react-native';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import { Coordinates } from '../../types/types';

// @ts-ignore no default values for context
export const LocationContext = createContext();

interface LocationProviderProps {
  children: ReactNode;
}

const LocationProvider: FC<LocationProviderProps> = ({ children }) => {
  const [location, setLocation] = useState<Coordinates>();

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

  return (
    <LocationContext.Provider value={location as Coordinates}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
