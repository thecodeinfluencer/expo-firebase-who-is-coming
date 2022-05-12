import { DefaultTheme } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormikButton from '../../formik/FormikButton';
import FormikForm from '../../formik/FormikForm';
import FormikInput from '../../formik/FormikInput';
import FormikSelect from '../../formik/FormikSelect';
import Alert from '../../fragments/Alert';
import AppText from '../../package/AppText';
import { actionRegister } from '../../redux/actions/authActions';
import { actionLoadList } from '../../redux/actions/dataActions';

const validation = Yup.object().shape({
  names: Yup.string().required().label('Full Name'),
  email: Yup.string().email().required().label('Email'),
  phone: Yup.number().required().label('Phone'),
  service: Yup.string().required().label('Service'),
  password: Yup.string().required().min(6).label('Password'),
  cpassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
});

export default function RegisterVendor({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector(st => st);
  const busy = state.data?.busy?.requests;
  const error = state.data?.error?.requests;
  const services = state.data?.list?.services;

  useEffect(() => {
    dispatch(actionLoadList('services'));
  }, [dispatch]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AppText style={styles.text}>Register as Vendor</AppText>
      <FormikForm
        validationSchema={validation}
        initialValues={{
          names: '',
          email: '',
          phone: '',
          password: '',
          cpassword: '',
          service: '',
        }}
        onSubmit={(
          { names, email, phone, password, service },
          { resetForm }
        ) => {
          dispatch(
            actionRegister({
              names,
              email,
              phone,
              service,
              password,
              visited: false,
              role: 'vendor',
            })
          );

          resetForm();
        }}
      >
        <FormikInput
          label='Full Name'
          placeholder='John Doe'
          name='names'
          mode='outlined'
          textContentType='name'
        />
        <FormikInput
          label='Email Address'
          placeholder='name@example.com'
          name='email'
          mode='outlined'
          keyboardType='email-address'
          textContentType='emailAddress'
        />
        <FormikInput
          label='Phone'
          placeholder='254 XXX XXX XXX'
          name='phone'
          mode='outlined'
          keyboardType='number-pad'
          textContentType='telephoneNumber'
        />
        <FormikSelect
          label='Service'
          mode='outlined'
          name='service'
          list={services || []}
        />
        <FormikInput
          secureTextEntry
          label='Password'
          name='password'
          mode='outlined'
          textContentType='password'
        />
        <FormikInput
          secureTextEntry
          label='Confirm Password'
          name='cpassword'
          mode='outlined'
          textContentType='password'
        />
        {/* <View style={styles.time}>
          <FormikInput
            style={styles.time1}
            label='Arriving'
            placeholder='9:30AM'
            name='arrival'
            mode='outlined'
            keyboardType='decimal-pad'
          />
          <FormikInput
            style={styles.time2}
            label='Leaving'
            placeholder='9:30AM'
            name='departure'
            mode='outlined'
            keyboardType='decimal-pad'
          />
        </View>
        <FormikInput
          label='Plate Number'
          placeholder='KBK 678A'
          name='plate'
          mode='outlined'
        /> */}
        {error && <Alert label={error} />}
        <FormikButton disabled={busy} mode='contained'>
          Register
        </FormikButton>
      </FormikForm>
      <View style={styles.action}>
        <AppText>Need to login?</AppText>
        <AppText
          onPress={() => navigation.navigate('Login')}
          style={styles.actionText}
        >
          Login.
        </AppText>
      </View>
    </ScrollView>
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
});
