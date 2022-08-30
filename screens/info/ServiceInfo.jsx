import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Empty from '../../paper/Empty';
import ListItem from '../../paper/ListItem';
import { actionLoadList } from '../../redux/actions/dataActions';

export default function ServiceInfo({ navigation, route }) {
  const dispatch = useDispatch();
  const state = useSelector(st => st);
  const providers = state.data?.list?.users?.filter(
    ({ service }) => service?.toLowerCase() == route.params.value?.toLowerCase()
  );

  navigation.setOptions({
    headerTitle: route?.params?.label,
  });

  useEffect(() => {
    dispatch(actionLoadList('users'));
  }, [dispatch]);

  return (
    <ScrollView>
      {providers?.map(provider => (
        <ListItem
          key={provider.id}
          title={provider.names + ' . ' + provider?.service}
          description={`${provider.phone}`}
          left={props => <List.Icon {...props} icon='phone' color='#fff' />}
        />
      ))}
      {!providers ||
        (providers?.length < 1 && (
          <Empty label={`No ${route?.params?.value} yet`} />
        ))}
    </ScrollView>
  );
}
