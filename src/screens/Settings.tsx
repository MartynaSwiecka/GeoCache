import React, { FC } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Button } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { resetGenericPassword } from 'react-native-keychain';

import { colors } from '../styles/colors';
import auth0 from '../services/auth/authService';

type RootStackParamList = {
  Settings: undefined;
};

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: SettingsScreenNavigationProp;
};

const Settings: FC<Props> = ({ navigation }) => {
  const logout = async () => {
    try {
      await auth0.webAuth.clearSession();
      await resetGenericPassword();
      navigation.dispatch(StackActions.popToTop());
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
