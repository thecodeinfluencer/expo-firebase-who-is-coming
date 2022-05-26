import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function AppButton({
  children,
  style,
  labelStyle,
  small,
  ...props
}) {
  const styles = StyleSheet.create({
    label: {
      fontSize: 14,
      paddingVertical: small ? 0 : 8,
    },
    button: {
      borderRadius: 24,
    },
  });

  return (
    <Button
      // compact={small}
      style={{ ...styles.button, ...style }}
      labelStyle={{ ...styles.label, ...labelStyle }}
      {...props}
    >
      {children}
    </Button>
  );
}
