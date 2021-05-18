import 'react-native-gesture-handler';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import { Welcome, CachesList, Settings } from './src/screens';
import { colors } from './src/styles/colors';

const Tab = createBottomTabNavigator();

const Root = () => (
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
      name="CachesList"
      component={CachesList}
      options={{
        tabBarLabel: 'Caches',
        tabBarIcon: ({ color, size }) => (
          <IoniconsIcons name="map-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Settings"
      component={Settings}
      options={{
        tabBarLabel: 'Settings',
        tabBarIcon: ({ color, size }) => (
          <IoniconsIcons name="settings-outline" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default Root;
