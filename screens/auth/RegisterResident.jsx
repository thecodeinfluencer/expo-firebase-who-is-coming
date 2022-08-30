import React, { useEffect } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { Card } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormikButton from '../../formik/FormikButton';
import FormikForm from '../../formik/FormikForm';
import FormikInput from '../../formik/FormikInput';
import FormikSelect from '../../formik/FormikSelect';
import AppAlert from '../../fragments/AppAlert';
import AppText from '../../fragments/AppText';
import CircleGraphic from '../../fragments/CircleGraphic';
import { actionRegister } from '../../redux/actions/authActions';
import { actionLoadList } from '../../redux/actions/dataActions';

const validation = Yup.object().shape({
  names: Yup.string().required().label('Full Name'),
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
  cpassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
});

export default function RegisterResident({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector(st => st);
  const busy = state.auth?.busy?.register;
  const error = state.auth?.error?.register;
  const units = state.data?.list?.units;

  useEffect(() => {
    dispatch(actionLoadList('units'));
  }, [dispatch]);

  return (
    <View>
      <StatusBar barStyle='light-content' />
      <CircleGraphic />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/icon2.png')}
          />
          <AppText style={styles.text}>Register as Resident</AppText>
        </View>
        <Card style={styles.form}>
          <FormikForm
            validationSchema={validation}
            initialValues={{
              names: '',
              email: '',
              unitId: '',
              password: '',
              cpassword: '',
            }}
            onSubmit={({ names, email, password, unitId }) => {
              dispatch(
                actionRegister({
                  names,
                  email,
                  unitId,
                  password,
                  role: 'resident',
                })
              );
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
            <FormikSelect
              label='Unit ID'
              mode='outlined'
              name='unitId'
              list={units || []}
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
            {error && <AppAlert label={error} />}
            <FormikButton disabled={busy} mode='contained'>
              Register
            </FormikButton>
          </FormikForm>
          <View style={styles.action}>
            <AppText>Already have an account?</AppText>
            <AppText
              onPress={() => navigation.navigate('Login')}
              style={styles.actionText}
            >
              Login.
            </AppText>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 32,
  },
  form: {
    padding: 16,
    borderRadius: 24,
  },
  text: {
    fontSize: 24,
    marginVertical: 16,
    color: '#fff',
  },
  action: {
    marginVertical: 16,
    marginHorizontal: 4,
  },
  actionText: {
    // color: DefaultTheme.colors.primary,
  },
  image: {
    height: 136,
    width: 136,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
});
