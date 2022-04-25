import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormikButton from '../../formik/FormikButton';
import FormikForm from '../../formik/FormikForm';
import FormikInput from '../../formik/FormikInput';
import Alert from '../../fragments/Alert';
import { actionSetList } from '../../redux/actions/dataActions';

const validation = Yup.object().shape({
  title: Yup.string().required().min(5).label('Title'),
  description: Yup.string().required().min(10).label('Description'),
});

export default function ReportSuspicion({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector(st => st);
  const busy = state.data?.busy?.suspicions;
  const error = state.data?.error?.suspicions;
  const user = state.auth.user;

  navigation.setOptions({
    headerTitle: 'Report Suspicion',
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FormikForm
        validationSchema={validation}
        initialValues={{
          title: '',
          description: '',
        }}
        onSubmit={({ title, description }, { resetForm }) => {
          dispatch(
            actionSetList('suspicions', {
              title,
              description,
              user: {
                uid: user?.uid,
                names: user?.names,
                unitId: user?.unitId,
              },
            })
          );

          resetForm();
        }}
      >
        <FormikInput
          label='Title'
          placeholder='Brief Title'
          name='title'
          mode='outlined'
        />
        <FormikInput
          label='Description'
          placeholder='Brief Description'
          name='description'
          mode='outlined'
          multiline
          numberOfLines={4}
        />
        {error && <Alert label={error} />}
        <FormikButton disabled={busy} mode='contained'>
          Report
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
