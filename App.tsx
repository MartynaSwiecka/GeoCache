import React, { useEffect } from 'react';
import Welcome from './src/screens/Welcome';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return <Welcome />;
};

export default App;
