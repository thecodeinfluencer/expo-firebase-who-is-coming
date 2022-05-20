import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormikButton from '../../formik/FormikButton';
import FormikForm from '../../formik/FormikForm';
import FormikInput from '../../formik/FormikInput';
import AppAlert from '../../fragments/AppAlert';
import AppButton from '../../paper/AppButton';
import { actionUpdateListItem } from '../../redux/actions/dataActions';

const validation = Yup.object().shape({
  names: Yup.string().required().label('Full Name'),
  phone: Yup.number().required().label('Phone'),
});

export default function EditVendor({ navigation, route }) {
  const dispatch = useDispatch();
  const state = useSelector(st => st);
  const busy = state.data?.busy?.users;
  const error = state.data?.error?.users;
  const vendor = route.params;

  navigation.setOptions({
    headerTitle: 'Edit Vendor',
    headerRight: () => (
      <AppButton
        onPress={() => {
          dispatch(
            actionUpdateListItem(
              'users',
              {
                names: null,
                email: null,
                phone: null,
                role: null,
                service: null,
                uid: null,
                visited: null,
              },
              vendor?.uid
            )
          );

          navigation.goBack();
        }}
      >
        Delete
      </AppButton>
    ),
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FormikForm
        validationSchema={validation}
        initialValues={{
          names: vendor?.names || '',
          phone: vendor?.phone || '',
        }}
        onSubmit={({ names, phone }) => {
          dispatch(
            actionUpdateListItem(
              'users',
              {
                ...vendor,
                names,
                phone,
              },
              vendor?.uid
            )
          );
        }}
      >
        <FormikInput
          label={!vendor?.names && 'Full Name'}
          placeholder={vendor?.names || 'John Doe'}
          name='names'
          mode='outlined'
          textContentType='name'
        />
        <FormikInput
          label={!vendor?.phone && 'Phone'}
          placeholder={vendor?.phone || '254 XXX XXX XXX'}
          name='phone'
          mode='outlined'
          keyboardType='numeric'
        />
        {error && <AppAlert label={error} />}
        <FormikButton disabled={busy} mode='contained'>
          Update Vendor
        </FormikButton>
      </FormikForm>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
  },
});
