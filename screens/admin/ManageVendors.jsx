import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AppButton from '../../paper/AppButton';
import ListItem from '../../paper/ListItem';
import Empty from '../../paper/Empty';
import { actionLoadList } from '../../redux/actions/dataActions';

export default function ManageVendors({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector(st => st);
  const users = state.data?.list?.users;
  const busy = state.data?.busy?.users;

  const vendors = users.filter(({ role }) => role === 'vendor');

  navigation.setOptions({
    headerTitle: 'Manage Vendors',
  });

  useEffect(() => {
    dispatch(actionLoadList('users'));
  }, [dispatch]);

  return (
    <ScrollView contentContainerStyle={styles.root}>
      {vendors?.map(vendor => (
        <ListItem
          key={vendor.id}
          title={vendor.names}
          description={vendor?.service}
          right={() => (
            <View style={styles.right}>
              <AppButton
                small
                labelStyle={styles.buttonText}
                style={styles.button}
                mode='outlined'
                disabled={busy}
                onPress={() => navigation.navigate('EditVendor', { ...vendor })}
              >
                View Info
              </AppButton>
            </View>
          )}
        />
      ))}
      {!vendors || (vendors?.length < 1 && <Empty />)}
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
