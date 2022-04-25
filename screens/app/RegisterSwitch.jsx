import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

export default function RegisterSwitch({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Which way are you registering? </Text>
      <View style={styles.buttons}>
        <Button
          onPress={() => navigation.navigate('RegisterResident')}
          style={styles.button}
          mode='contained'
        >
          Resident
        </Button>
        <Button
          onPress={() => navigation.navigate('RegisterGuest')}
          mode='outlined'
        >
          Guest
        </Button>
      </View>
      <View style={styles.buttons}>
        <Button
          onPress={() => navigation.navigate('RegisterVendor')}
          style={styles.button}
          mode='contained'
        >
          Service Vendor
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    marginVertical: 16,
  },
  container: {
    padding: 32,
    paddingTop: 88,
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  button: {
    marginRight: 8,
  },
});
