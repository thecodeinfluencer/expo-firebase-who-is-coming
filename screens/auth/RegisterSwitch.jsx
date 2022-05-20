import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import AppText from '../../fragments/AppText';
import CircleGraphic from '../../fragments/CircleGraphic';
import AppButton from '../../paper/AppButton';

export default function RegisterSwitch({ navigation }) {
  return (
    <View style={styles.root}>
      <StatusBar barStyle='light-content' />
      <CircleGraphic />
      <AppText style={styles.text}>Which way are you registering? </AppText>
      <View style={styles.actionButtons}>
        <AppButton
          onPress={() => navigation.navigate('RegisterResident')}
          mode='contained'
        >
          Resident
        </AppButton>
        <AppButton
          onPress={() => navigation.navigate('RegisterVendor')}
          style={styles.vendorButton}
          mode='outlined'
        >
          Service Vendor
        </AppButton>
        <AppButton onPress={() => navigation.navigate('RegisterGuest')}>
          Register Guest
        </AppButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 76,
  },
  text: {
    fontSize: 24,
    color: '#fff',
    marginVertical: 16,
    paddingHorizontal: 32,
  },
  actionButtons: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
    padding: 8,
  },
  vendorButton: {
    marginVertical: 8,
  },
});
