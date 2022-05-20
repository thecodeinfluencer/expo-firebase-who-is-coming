import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormikButton from '../../formik/FormikButton';
import FormikForm from '../../formik/FormikForm';
import FormikInput from '../../formik/FormikInput';
import Alert from '../../fragments/Alert';
import AppButton from '../../paper/AppButton';
import ListItem from '../../paper/ListItem';
import {
  actionLoadList,
  actionSetList,
  actionUpdateListItem,
} from '../../redux/actions/dataActions';

const validation = Yup.object().shape({
  value: Yup.string().required().label('Service Categories'),
});

export default function ManageServices() {
  const dispatch = useDispatch();
  const state = useSelector(st => st);
  const busy = state.auth?.busy?.services;
  const error = state.auth?.error?.services;
  const services = state.data?.list?.services;

  useEffect(() => {
    dispatch(actionLoadList('services'));
  }, [dispatch]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <FormikForm
          validationSchema={validation}
          initialValues={{
            value: '',
            description: '',
          }}
          onSubmit={({ value, description }, { resetForm }) => {
            dispatch(
              actionSetList('services', {
                value,
                description,
                label: value?.toUpperCase(),
              })
            );

            resetForm();
          }}
        >
          <FormikInput
            label='Service Name'
            placeholder='Internet Service'
            name='value'
            mode='outlined'
          />
          <FormikInput
            label='Description'
            placeholder='Optional'
            name='description'
            mode='outlined'
            multiline
            numberOfLines={3}
          />
          {error && <Alert label={error} />}
          <FormikButton disabled={busy} mode='contained'>
            Add Service
          </FormikButton>
        </FormikForm>
      </View>

      <View style={styles.container2}>
        {services?.map(service => (
          <ListItem
            key={service?.id}
            title={service.label}
            // description={unit.service || unit.unitID || null}
            right={() => (
              <View style={styles.right}>
                <AppButton
                  labelStyle={styles.buttonText}
                  contentStyle={styles.button}
                  mode='outlined'
                  disabled={busy}
                  onPress={() =>
                    dispatch(
                      actionUpdateListItem(
                        'services',
                        {
                          description: null,
                          label: null,
                          value: null,
                          id: null,
                        },
                        service?.id
                      )
                    )
                  }
                >
                  Delete
                </AppButton>
              </View>
            )}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 36,
  },
  container2: {
    padding: 8,
  },
  right: {
    justifyContent: 'center',
  },
  button: {
    borderColor: '#fff',
    borderWidth: 2,
  },
  buttonText: {
    color: '#fff',
  },
});
