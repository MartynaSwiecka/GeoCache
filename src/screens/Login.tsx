import React, { FC, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { setGenericPassword, getGenericPassword } from 'react-native-keychain';
import { colors } from '../styles/colors';
import auth0 from '../services/auth/authService';

type RootStackParamList = {
  Login: { setAuthenticated: (isAuthenticated: boolean) => void };
  GeoCache: undefined;
};
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};

const Login: FC<Props> = ({ navigation, route }) => {
  const { setAuthenticated } = route.params;
  useEffect(() => {
    const init = async () => {
      try {
        const credentials = await getGenericPassword();
        if (credentials) {
          setAuthenticated(true);
          navigation.navigate('GeoCache');
        }
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }
    };

    init();
  }, [navigation, setAuthenticated]);

  const login = async () => {
    try {
      const { idToken, accessToken } = await auth0.webAuth.authorize({
        scope: 'openid email profile',
      });

      await setGenericPassword(accessToken, idToken);
      setAuthenticated(true);
      navigation.navigate('GeoCache');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.content}>
        <Button title="Log in" onPress={login} color={colors.accentSecondary} />
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
});

export default Login;
