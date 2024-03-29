import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Empty from '../../paper/Empty';
import ListItem from '../../paper/ListItem';
import { actionLoadList } from '../../redux/actions/dataActions';

export default function ViewResidents({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector(st => st);
  const users = state.data?.list?.users;
  const user = state.auth.user;

  const residents = users?.filter(
    ({ role, uid }) => role === 'resident' && uid !== user?.uid
  );

  navigation.setOptions({
    headerTitle: 'View Neighbors',
  });

  useEffect(() => {
    dispatch(actionLoadList('users'));
  }, [dispatch]);

  return (
    <ScrollView>
      {(!residents || residents?.length < 1) && <Empty />}
      {residents?.map(resident => (
        <ListItem
          key={resident.uid}
          title={resident.names}
          description={`${resident.unitId?.toUpperCase()}`}
          left={props => <List.Icon {...props} icon='account' color='#fff' />}
        />
      ))}
    </ScrollView>
  );
}
