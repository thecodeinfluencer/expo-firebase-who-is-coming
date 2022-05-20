import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AppButton from '../../paper/AppButton';
import ListItem from '../../paper/ListItem';
import Empty from '../../paper/Empty';
import { actionLoadList } from '../../redux/actions/dataActions';

export default function ManageGuests({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector(st => st);
  const guests = state.data?.list?.guests;
  const busy = state.data?.busy?.guests;
  const user = state.auth.user;

  const myGuests = guests.filter(({ unitId }) => unitId == user?.unitId);

  navigation.setOptions({
    headerTitle: 'Manage Guests',
  });

  useEffect(() => {
    dispatch(actionLoadList('guests'));
  }, [dispatch]);

  return (
    <ScrollView>
      {myGuests?.map(guest => (
        <ListItem
          key={guest.id}
          title={guest.names}
          description={`${guest.plate?.toUpperCase()}`}
          right={() => (
            <View style={styles.right}>
              <AppButton
                labelStyle={styles.buttonText}
                contentStyle={styles.button}
                mode='outlined'
                disabled={busy}
                onPress={() =>
                  navigation.navigate('GuestInfo', { id: guest?.id })
                }
              >
                View Info
              </AppButton>
            </View>
          )}
        />
      ))}
      {!myGuests || (myGuests?.length < 1 && <Empty />)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
