import { DefaultTheme } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { Card } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormikButton from '../../formik/FormikButton';
import FormikForm from '../../formik/FormikForm';
import FormikInput from '../../formik/FormikInput';
import FormikSelect from '../../formik/FormikSelect';
import Alert from '../../fragments/Alert';
import AppText from '../../package/AppText';
import CircleGraphic from '../../package/CircleGraphic';
import { actionLoadList, actionSetList } from '../../redux/actions/dataActions';

const validation = Yup.object().shape({
  names: Yup.string().required().label('Full Name'),
  email: Yup.string().email().required().label('Email'),
  phone: Yup.number().required().label('Phone'),
  unitId: Yup.string().required().label('Unit ID'),
  plate: Yup.string().required().label('Plate Number'),
});

export default function RegisterGuest({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector(st => st);
  const busy = state.data?.busy?.requests;
  const error = state.data?.error?.requests;
  const units = state.data?.list?.units;

  useEffect(() => {
    dispatch(actionLoadList('units'));
  }, [dispatch]);

  return (
    <View>
      <StatusBar barStyle='light-content' />
      <CircleGraphic />
      <ScrollView contentContainerStyle={styles.container}>
        <AppText style={styles.text}>Register a guest visit</AppText>
        <Card style={styles.form}>
          <FormikForm
            validationSchema={validation}
            initialValues={{
              names: '',
              email: '',
              phone: '',
              unitId: '',
              plate: '',
            }}
            onSubmit={(
              { names, email, phone, unitId, plate },
              { resetForm }
            ) => {
              dispatch(
                actionSetList('guests', {
                  names,
                  email,
                  phone,
                  unitId,
                  plate,
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
            <FormikSelect
              label='Unit ID'
              mode='outlined'
              name='unitId'
              list={units || []}
            />
            <FormikInput
              label='Phone'
              placeholder='254 XXX XXX XXX'
              name='phone'
              mode='outlined'
              keyboardType='number-pad'
              textContentType='telephoneNumber'
            />
            <FormikInput
              label='Plate Number'
              placeholder='KBK 678A'
              name='plate'
              mode='outlined'
            />
            {error && <Alert label={error} />}
            <FormikButton disabled={busy} mode='contained'>
              Register Visit
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
    color: '#fff',
    marginVertical: 24,
    textAlign: 'center',
  },
  action: {
    marginVertical: 16,
    marginHorizontal: 4,
  },
  actionText: {
    color: DefaultTheme.colors.primary,
  },
});
