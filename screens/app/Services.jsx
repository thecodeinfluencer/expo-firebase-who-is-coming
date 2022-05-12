import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { IconButton, TouchableRipple } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import ListCard from '../../paper/ListCard';
import { actionLoadList } from '../../redux/actions/dataActions';

export default function Services({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector(st => st);

  const services = state.data?.list?.services;

  navigation.setOptions({
    headerTitle: 'Services',
  });

  useEffect(() => {
    dispatch(actionLoadList('services'));
  }, [dispatch]);

  return (
    <ScrollView>
      <View style={styles.buttons}>
        {services?.map(service => (
          <TouchableRipple
            onPress={() =>
              navigation.navigate('ServiceInfo', {
                ...service,
              })
            }
            key={service?.id}
          >
            <ListCard
              title={service?.label}
              right={() => (
                <View style={styles.right}>
                  <IconButton
                    style={styles.icon}
                    color='#fff'
                    icon='chevron-right'
                  />
                </View>
              )}
            />
          </TouchableRipple>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttons: {
    // flexDirection: 'row',
    marginHorizontal: 8,
    marginTop: 16,
  },
  right: {
    justifyContent: 'center',
  },
  icon: {
    padding: 0,
    margin: 0,
  },
});
