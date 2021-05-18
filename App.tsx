import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LocationProvider from './src/services/context/LocationProvider';
import { Login } from './src/screens';
import { colors } from './src/styles/colors';
import Root from './Root';

const Stack = createStackNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: colors.dark,
  },
  headerTintColor: colors.font,
};

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <LocationProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {!isAuthenticated ? (
            <Stack.Screen
              name="Login"
              component={Login}
              options={screenOptions}
              initialParams={{ setAuthenticated }}
            />
          ) : (
            <Stack.Screen
              name="GeoCache"
              component={Root}
              options={screenOptions}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </LocationProvider>
  );
};

export default App;
