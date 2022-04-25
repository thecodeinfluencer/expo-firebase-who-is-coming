import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ListEmptyCard from '../../fragments/ListEmptyCard';
import SuspicionCard from '../../fragments/SuspicionCard';
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
      {(!suspicions || suspicions?.length < 1) && <ListEmptyCard />}
      {suspicions?.map(suspicion => (
        <SuspicionCard key={suspicion?.id} suspicion={suspicion} />
      ))}
    </View>
  );
}
