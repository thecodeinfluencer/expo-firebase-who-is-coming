import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AppButton from '../../paper/AppButton';
import Empty from '../../paper/Empty';
import ListItem from '../../paper/ListItem';
import { actionLoadList } from '../../redux/actions/dataActions';

export default function ManageResidents({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector(st => st);
  const users = state.data?.list?.users;
  const busy = state.data?.busy?.users;
  const residents = users.filter(({ role }) => role === 'resident');

  navigation.setOptions({
    headerTitle: 'Manage Residents',
  });

  useEffect(() => {
    dispatch(actionLoadList('users'));
  }, [dispatch]);

  return (
    <ScrollView contentContainerStyle={styles.root}>
      {residents?.map(resident => (
        <ListItem
          key={resident.id}
          title={resident.names}
          description={resident?.unitId}
          right={() => (
            <View style={styles.right}>
              <AppButton
                small
                labelStyle={styles.buttonText}
                style={styles.button}
                mode='outlined'
                disabled={busy}
                onPress={() =>
                  navigation.navigate('EditResident', { ...resident })
                }
              >
                Edit Info
              </AppButton>
            </View>
          )}
        />
      ))}
      {!residents || (residents?.length < 1 && <Empty />)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingTop: 4,
  },
  right: {
    justifyContent: 'center',
  },
  button: {
    borderColor: '#fff',
  },
  buttonText: {
    color: '#fff',
  },
});
