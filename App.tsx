import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import { Welcome, Map } from './src/screens';

import { colors } from './src/styles/colors';

const Tab = createBottomTabNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Welcome"
        tabBarOptions={{
          tabStyle: {
            backgroundColor: colors.dark,
          },
          activeTintColor: colors.accentPrimary,
          inactiveTintColor: colors.accentSecondary,
          style: { backgroundColor: colors.dark },
          labelPosition: 'beside-icon',
        }}>
        <Tab.Screen
          name="Welcome"
          component={Welcome}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <IoniconsIcons name="home-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Map"
          component={Map}
          options={{
            tabBarLabel: 'Map',
            tabBarIcon: ({ color, size }) => (
              <IoniconsIcons name="map-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
