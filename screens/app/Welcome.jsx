import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

export default function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('../../assets/icon.png')} />
      </View>
      <View style={styles.center}>
        <Text style={styles.text}>Welcome to Whos</Text>
        <View style={styles.buttons}>
          <Button
            onPress={() => navigation.navigate('Login')}
            style={styles.button}
            mode='contained'
          >
            Login
          </Button>
          <Button
            onPress={() => navigation.navigate('RegisterSwitch')}
            mode='outlined'
          >
            Register
          </Button>
        </View>
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
  },
  button: {
    marginRight: 8,
  },
  image: {
    height: 148,
    width: 148,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  center: {
    alignItems: 'center',
  },
});
