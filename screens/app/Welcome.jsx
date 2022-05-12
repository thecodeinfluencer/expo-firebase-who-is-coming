import React from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';
import AppText from '../../package/AppText';

export default function Welcome({ navigation }) {
  return (
    <View style={styles.root}>
      <StatusBar barStyle='light-content' />
      <Image
        style={styles.landing}
        imageStyle={styles.imageStyle}
        source={require('../../assets/pages/landing.png')}
      />
      <View style={styles.textContainer}>
        <AppText style={styles.text}>Welcome to Whos</AppText>
        <Image
          style={styles.image}
          source={require('../../assets/pages/cars.png')}
        />
      </View>
      <View style={styles.container}>
        <View>
          <Button
            onPress={() => navigation.navigate('Login')}
            style={styles.button}
            mode='contained'
          >
            Login
          </Button>
          <Button
            onPress={() => navigation.navigate('RegisterSwitch')}
            style={styles.button}
            mode='outlined'
          >
            Register
          </Button>
        </View>
        {/* </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  text: {
    fontSize: 28,
    marginVertical: 16,
    color: '#fff',
  },
  textContainer: {
    padding: 32,
    paddingTop: 88,
    backgroundColor: 'transparent',
    position: 'absolute',
    width: '100%',
  },
  container: {
    padding: 32,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  button: {
    marginBottom: 8,
    width: '100%',
  },
  landing: {
    width: Dimensions.get('screen').width,
  },
  imageStyle: {
    resizeMode: 'cover',
    alignSelf: 'flex-end',
  },
  image: {
    width: Dimensions.get('screen').width * 0.6,
    height: Dimensions.get('screen').width * 0.6,
  },
});
