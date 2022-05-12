import moment from 'moment';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { List } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import ListCard from '../../paper/ListCard';
import ListEmpty from '../../paper/ListEmpty';
import { actionLoadList } from '../../redux/actions/dataActions';

export default function Suspicions() {
  const dispatch = useDispatch();
  const state = useSelector(st => st);
  const suspicions = state.data?.list?.suspicions;

  useEffect(() => {
    dispatch(actionLoadList('suspicions'));
  }, []);

  return (
    <View>
      {(!suspicions || suspicions?.length < 1) && <ListEmpty />}
      {suspicions?.map(({ id, title, user, description }) => (
        <ListCard
          key={id}
          title={title + ' . ' + user?.names}
          description={description + ' . ' + moment(id).fromNow()}
          left={props => <List.Icon color='#fff' {...props} icon='alert' />}
        />
      ))}
    </View>
  );
}
