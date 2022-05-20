import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormikButton from '../../formik/FormikButton';
import FormikForm from '../../formik/FormikForm';
import FormikInput from '../../formik/FormikInput';
import FormikSelect from '../../formik/FormikSelect';
import Alert from '../../fragments/Alert';
import AppButton from '../../paper/AppButton';
import { actionUpdateListItem } from '../../redux/actions/dataActions';

const validation = Yup.object().shape({
  names: Yup.string().required().label('Full Name'),
  unitId: Yup.string().required().label('Unit ID'),
});

export default function EditResident({ navigation, route }) {
  const dispatch = useDispatch();
  const state = useSelector(st => st);
  const busy = state.data?.busy?.users;
  const error = state.data?.error?.users;
  const units = state.data?.list?.units;
  const resident = route.params;

  navigation.setOptions({
    headerTitle: 'Edit Resident',
    headerRight: () => (
      <AppButton
        onPress={() => {
          dispatch(
            actionUpdateListItem(
              'users',
              {
                email: null,
                names: null,
                role: null,
                uid: null,
                unitId: null,
              },
              resident?.uid
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
          names: resident?.names || '',
          unitId: resident?.unitId || '',
        }}
        onSubmit={({ names, unitId }) => {
          dispatch(
            actionUpdateListItem(
              'users',
              {
                ...resident,
                names,
                unitId,
              },
              resident?.uid
            )
          );
        }}
      >
        <FormikInput
          label={!resident?.names && 'Full Name'}
          placeholder={resident?.names || 'John Doe'}
          name='names'
          mode='outlined'
          textContentType='name'
        />
        <FormikSelect
          label={resident?.unitId || 'Unit ID'}
          // label='Unit ID'
          mode='outlined'
          name='unitId'
          list={units || []}
        />
        {error && <Alert label={error} />}
        <FormikButton disabled={busy} mode='contained'>
          Update Resident
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
