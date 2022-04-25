import React from 'react';
import { Drawer } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function Alert({ label }) {
  return <Drawer.Item style={styles.root} icon='alert' label={label} />;
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#ff000033',
    marginHorizontal: 0,
    color: '#999',
  },
});
