import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function AppButton({ children, style, labelStyle, ...props }) {
  return (
    <Button
      style={{ ...styles.button, ...style }}
      labelStyle={{ ...styles.label, ...labelStyle }}
      {...props}
    >
      {children}
    </Button>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Nunito',
    fontSize: 14,
    paddingVertical: 8,
  },
  button: {
    borderRadius: 24,
  },
});
