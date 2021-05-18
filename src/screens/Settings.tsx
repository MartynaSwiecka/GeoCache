import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Button } from 'react-native';
import { resetGenericPassword } from 'react-native-keychain';
import { colors } from '../styles/colors';
import { AuthContext } from '../services/context/AuthProvider';
import auth0 from '../services/auth/authService';
import { AuthProviderValue } from '../types/types';

const Settings = () => {
  const { setAuthenticated } = useContext<AuthProviderValue>(AuthContext);

  const logout = async () => {
    try {
      await auth0.webAuth.clearSession();
      await resetGenericPassword();
      setAuthenticated(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.content}>
        <Button
          title="Log out"
          onPress={logout}
          color={colors.accentSecondary}
        />
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

export default Settings;
