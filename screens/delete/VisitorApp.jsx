import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import ListEmptyCard from '../../fragments/ListEmptyCard';
import VendorCard from '../../fragments/VendorCard';
import { actionLoadList } from '../../redux/actions/dataActions';

export default function VendorApp({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector(st => st);
  const user = state.auth.user;
  const requests = state.data?.list?.requests;
  const myRequests = requests?.filter(({ uid }) => uid == user?.uid);

  navigation.setOptions({
    headerRight: () => (
      <IconButton
        icon='cog'
        onPress={() => navigation.navigate('VendorSettings')}
      />
    ),
  });

  useEffect(() => {
    dispatch(actionLoadList('requests'));
  }, [dispatch]);

  return (
    <ScrollView>
      <Text style={styles.text}>Requested Services</Text>
      {(!myRequests || myRequests?.length < 1) && <ListEmptyCard />}
      {myRequests?.map(request => (
        <VendorCard
          key={request.uid}
          navigation={navigation}
          request={request}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    marginVertical: 12,
    marginHorizontal: 16,
    color: '#999',
  },
});
