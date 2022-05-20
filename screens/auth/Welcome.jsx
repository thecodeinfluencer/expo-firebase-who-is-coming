import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import AppText from '../../package/AppText';
import AppButton from '../../paper/AppButton';

const SCREEN_WIDTH = Dimensions.get('screen').width;

export default function Welcome({ navigation }) {
  return (
    <View style={styles.root}>
      <StatusBar barStyle='light-content' />
      <View style={styles.textContainer}>
        <AppText style={styles.title}>Welcome to Whos</AppText>
        <AppText style={styles.text}>
          A residential security management application which allows Residents
          of a community manage guests,access services and report suspicious
          activities.
        </AppText>
      </View>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={require('../../assets/icon2.png')}
          style={styles.imageBackground}
        >
          <View style={styles.backgroundCover}></View>
        </ImageBackground>
      </View>
      <View style={styles.container}>
        <View>
          <AppButton
            onPress={() => navigation.navigate('RegisterSwitch')}
            labelStyle={styles.signupButtonText}
            style={styles.signupButton}
            mode='contained'
            color='#fff'
          >
            Sign Up
          </AppButton>
          <AppText style={styles.text}>Already a member?</AppText>
          <AppButton
            onPress={() => navigation.navigate('Login')}
            style={styles.signinButton}
            color='#fff'
          >
            Sign In
          </AppButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#6200ee',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    marginVertical: 8,
    color: '#fff',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginVertical: 4,
    color: '#fff',
    textAlign: 'center',
  },
  imageContainer: {
    width: '100%',
    backgroundColor: '#6200ee',
    alignItems: 'center',
  },
  imageBackground: {
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_WIDTH * 0.4,
    backgroundColor: '#6200ee',
  },
  backgroundCover: {
    backgroundColor: '#6200ee',
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  textContainer: {
    padding: 24,
    paddingTop: 76,
    width: '100%',
  },
  container: {
    padding: 32,
    width: '100%',
  },
  signupButtonText: {
    color: '#6200ee',
  },
  signupButton: {
    marginBottom: 8,
    width: '100%',
  },
  signinButton: {
    marginBottom: 8,
    width: '100%',
  },
});
