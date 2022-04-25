import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Card, Colors, DefaultTheme, List } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormikButton from '../../formik/FormikButton';
import FormikForm from '../../formik/FormikForm';
import FormikInput from '../../formik/FormikInput';
import Alert from '../../fragments/Alert';
import { actionUpdateUser } from '../../redux/actions/authActions';

const validation = Yup.object().shape({
  names: Yup.string().required().label('Full Name'),
  phone: Yup.number().required().label('Phone'),
});

export default function VendorSettings({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector(st => st);
  const busy = state.data?.busy?.update;
  const error = state.data?.error?.update;
  const user = state.auth.user;

  navigation.setOptions({
    headerTitle: 'Profile',
    headerRight: () => (
      <Button onPress={() => dispatch({ type: 'USER_LOGOUT' })}>Logout</Button>
    ),
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.root}>
        <Card.Content>
          <List.Item
            titleStyle={styles.text}
            descriptionStyle={styles.text}
            title={user?.names}
            // description='Name'
            style={styles.item}
          />
          <List.Item
            titleStyle={styles.text}
            descriptionStyle={styles.text}
            title={user?.phone}
            description='Phone'
            style={styles.item}
            left={props => (
              <List.Icon {...props} icon='phone' color={Colors.white} />
            )}
          />
          <List.Item
            titleStyle={styles.text}
            descriptionStyle={styles.text}
            title={user?.email}
            description='Email'
            style={styles.item}
            left={props => (
              <List.Icon {...props} icon='mail' color={Colors.white} />
            )}
          />
          <List.Item
            titleStyle={styles.text}
            descriptionStyle={styles.text}
            title={user?.service}
            description='Service'
            style={styles.item}
            left={props => (
              <List.Icon {...props} icon='basket' color={Colors.white} />
            )}
          />
        </Card.Content>
      </Card>

      <FormikForm
        validationSchema={validation}
        initialValues={{
          names: user?.names || '',
          phone: user?.phone || '',
        }}
        onSubmit={({ names, phone }) => {
          dispatch(actionUpdateUser({ names, phone }));
        }}
      >
        <FormikInput
          label={!user?.names && 'Full Name'}
          placeholder={user?.names || 'John Doe'}
          name='names'
          mode='outlined'
          textContentType='name'
        />
        <FormikInput
          label={!user?.phone && 'Full Name'}
          placeholder={user?.phone || 'John Doe'}
          name='phone'
          mode='outlined'
          keyboardType='numeric'
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
    padding: 16,
  },
  root: {
    backgroundColor: DefaultTheme.colors.primary,
    marginBottom: 8,
  },
  item: {
    padding: 0,
  },
  text: {
    color: '#fff',
  },
});
