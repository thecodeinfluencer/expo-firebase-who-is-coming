import { DefaultTheme } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormikButton from '../../formik/FormikButton';
import FormikForm from '../../formik/FormikForm';
import FormikInput from '../../formik/FormikInput';
import Alert from '../../fragments/Alert';
import AppText from '../../package/AppText';
import { actionLogin } from '../../redux/actions/authActions';

const validation = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
});

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector(st => st);
  const busy = state.auth?.busy?.login;
  const error = state.auth?.error?.login;

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('../../assets/icon.png')} />
        <AppText style={styles.text}>Login</AppText>
      </View>
      <FormikForm
        validationSchema={validation}
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={({ email, password }) => {
          dispatch(actionLogin(email, password));
        }}
      >
        <FormikInput
          label='Email'
          name='email'
          mode='outlined'
          keyboardType='email-address'
          textContentType='emailAddress'
        />
        <FormikInput
          secureTextEntry
          label='Password'
          name='password'
          mode='outlined'
          textContentType='password'
        />
        {error && <Alert label={error} />}
        <FormikButton disabled={busy} mode='contained'>
          Login
        </FormikButton>
      </FormikForm>
      <View style={styles.action}>
        <AppText>Dont have an account yet?</AppText>
        <AppText
          onPress={() => navigation.navigate('RegisterSwitch')}
          style={styles.actionText}
        >
          Register.
        </AppText>
      </View>
      <AppText
        onPress={() => navigation.navigate('ForgotPassword')}
        style={styles.actionText}
      >
        Forgot password?
      </AppText>
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
    paddingTop: 32,
  },
  action: {
    marginVertical: 16,
    marginHorizontal: 4,
  },
  actionText: {
    color: DefaultTheme.colors.primary,
  },
  image: {
    height: 148,
    width: 148,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
});
