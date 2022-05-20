import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormikButton from '../../formik/FormikButton';
import FormikForm from '../../formik/FormikForm';
import FormikInput from '../../formik/FormikInput';
import Alert from '../../fragments/Alert';
import AppButton from '../../paper/AppButton';
import { actionUpdateUser } from '../../redux/actions/authActions';

const validation = Yup.object().shape({
  names: Yup.string().required().label('Full Name'),
});

export default function ResidentSettings({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector(st => st);
  const busy = state.data?.busy?.update;
  const error = state.data?.error?.update;
  const user = state.auth.user;

  navigation.setOptions({
    headerTitle: 'Update Profile',
    headerRight: () => (
      <AppButton onPress={() => dispatch({ type: 'USER_LOGOUT' })}>
        Logout
      </AppButton>
    ),
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FormikForm
        validationSchema={validation}
        initialValues={{
          names: user?.names || '',
        }}
        onSubmit={({ names }) => {
          dispatch(actionUpdateUser({ names }));
        }}
      >
        <FormikInput
          label={!user?.names && 'Full Name'}
          placeholder={user?.names || 'John Doe'}
          name='names'
          mode='outlined'
          textContentType='name'
        />
        {error && <Alert label={error} />}
        <FormikButton disabled={busy} mode='contained'>
          Update Profile
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
