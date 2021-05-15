import React, { ReactNode } from 'react';
import { StyleSheet, Text, Platform, TextProps } from 'react-native';
import { colors } from '../styles/colors';

interface StyledTextProps extends TextProps {
  children: ReactNode;
}

const StyledText = ({ children, style, ...props }: StyledTextProps) => (
  <Text style={[styles.text, style]} {...props}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: Platform.OS === 'ios' ? 'Trebuchet MS' : 'monospace',
    color: colors.font,
  },
});

export default StyledText;
