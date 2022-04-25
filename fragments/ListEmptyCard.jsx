import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';

export default function ListEmptyCard({ label }) {
  return (
    <View style={styles.root}>
      <IconButton color='#999' size={36} icon='file' />
      <Text style={styles.text}>{label || 'Nothing Here Yet'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: '#999',
  },
});
