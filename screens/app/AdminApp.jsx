import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Banner,
  Card,
  Colors,
  IconButton,
  TouchableRipple,
} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import AppText from '../../package/AppText';
import { actionLoadList } from '../../redux/actions/dataActions';

export default function AdminApp({ navigation }) {
  const dispatch = useDispatch();

  navigation.setOptions({
    headerRight: () => (
      <IconButton
        icon='logout'
        onPress={() => dispatch({ type: 'USER_LOGOUT' })}
      />
    ),
  });

  useEffect(() => {
    dispatch(actionLoadList('users'));
    dispatch(actionLoadList('vendors'));
  }, []);

  return (
    <ScrollView>
      <Banner visible actions={[]}>
        <AppText>
          You have priviledges to manage residents, service vendors, house units
          and service categories
        </AppText>
      </Banner>

      <View style={styles.actionsContainer}>
        {actions.map(({ name, text, bg, icon }) => (
          <TouchableRipple
            style={styles.action}
            key={name}
            onPress={() => navigation.navigate(name)}
          >
            <Card style={[styles.actionCard, { backgroundColor: bg }]}>
              <Card.Title
                title={text}
                titleStyle={styles.actionText}
                left={() => <Icon color={Colors.white} size={30} name={icon} />}
                right={() => (
                  <Icon color={Colors.white} size={30} name='chevron-right' />
                )}
              />
            </Card>
          </TouchableRipple>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  actionsContainer: {
    padding: 8,
  },
  action: { marginBottom: 8 },
  actionCard: { backgroundColor: '#009688' },
  actionText: { color: '#fff', fontFamily: 'Nunito' },
});

const actions = [
  {
    name: 'ManageResidents',
    text: 'Manage Residents',
    bg: '#ef5dab',
    icon: 'account-group',
  },
  {
    name: 'ManageVendors',
    text: 'Service Vendors',
    bg: '#aeaff7',
    icon: 'account-cash',
  },
  {
    name: 'ManageUnits',
    text: 'House Units',
    bg: '#a0e3e2',
    icon: 'warehouse',
  },
  {
    name: 'ManageServices',
    text: 'Service Categories',
    bg: '#c3f2a6',
    icon: 'apps-box',
  },
];
