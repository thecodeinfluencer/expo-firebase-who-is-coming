import { useFormikContext } from 'formik';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function FormikButton({ children, style, ...props }) {
  const formikContext = useFormikContext();

  return (
    <Button
      style={[styles.button, style]}
      onPress={formikContext.handleSubmit}
      {...props}
    >
      {children}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 8,
  },
});
