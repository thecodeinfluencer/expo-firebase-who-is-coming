import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import ListCard from '../../fragments/ListCard';
import ListEmptyCard from '../../fragments/ListEmptyCard';
import { actionLoadList } from '../../redux/actions/dataActions';

export default function ServiceInfo({ navigation, route }) {
  const dispatch = useDispatch();
  const state = useSelector(st => st);
  const guests = state.data?.list?.guests?.filter(
    ({ service }) => service == route.params.value
  );

  navigation.setOptions({
    headerTitle: route?.params?.label,
  });

  useEffect(() => {
    dispatch(actionLoadList('guests'));
  }, [dispatch]);

  return (
    <ScrollView>
      {guests?.map(guest => (
        <ListCard
          key={guest.id}
          title={guest.names + ' . ' + guest?.service}
          description={`${guest.phone}`}
          left={props => <List.Icon {...props} icon='phone' color='#fff' />}
        />
      ))}
      {!guests ||
        (guests?.length < 1 && (
          <ListEmptyCard label={`No ${route?.params?.value} yet`} />
        ))}
    </ScrollView>
  );
}
