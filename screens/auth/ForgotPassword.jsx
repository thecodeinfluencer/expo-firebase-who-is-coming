import { DefaultTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';
import { auth, sendPasswordResetEmail } from '../../config/firebase';
import FormikButton from '../../formik/FormikButton';
import FormikForm from '../../formik/FormikForm';
import FormikInput from '../../formik/FormikInput';
import Alert from '../../fragments/Alert';
import AppText from '../../package/AppText';

const validation = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),
});

export default function ForgotPassword({ navigation }) {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  return (
    <View style={styles.container}>
      <AppText style={styles.text}>Password Reset</AppText>
      <FormikForm
        validationSchema={validation}
        initialValues={{
          email: '',
        }}
        onSubmit={({ email }) => {
          setBusy(true);
          sendPasswordResetEmail(auth, email)
            .then(() => {
              setBusy(false);
            })
            .catch(error => {
              setError(error.code || error.message);
              setBusy(false);
            });
        }}
      >
        <FormikInput
          label='Email'
          name='email'
          mode='outlined'
          keyboardType='email-address'
          textContentType='emailAddress'
        />
        {error.length > 0 && <Alert label={error} />}
        <FormikButton disabled={busy} mode='contained'>
          Send
        </FormikButton>
      </FormikForm>
      <View style={styles.action}>
        <AppText>Dont need to reset password??</AppText>
        <AppText
          onPress={() => navigation.navigate('Login')}
          style={styles.actionText}
        >
          Login.
        </AppText>
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
  action: {
    marginVertical: 16,
    marginHorizontal: 4,
  },
  actionText: {
    color: DefaultTheme.colors.primary,
  },
});