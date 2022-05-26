import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Banner, Colors, IconButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import AppText from '../../fragments/AppText';
import AppButton from '../../paper/AppButton';
import ListItem from '../../paper/ListItem';
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
          <ListItem
            key={name}
            title={text}
            bg={bg}
            left={() => (
              <View style={styles.icon}>
                <Icon color={Colors.white} size={28} name={icon} />
              </View>
            )}
            right={() => (
              <View style={styles.right}>
                <AppButton
                  small
                  labelStyle={styles.buttonText}
                  style={styles.button}
                  mode='outlined'
                  onPress={() => navigation.navigate(name)}
                >
                  Manage
                </AppButton>
              </View>
            )}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  icon: { justifyContent: 'center' },
  actionsContainer: {
    padding: 8,
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
    bg: '#009996',
    icon: 'warehouse',
  },
  {
    name: 'ManageServices',
    text: 'Service Categories',
    bg: '#39b54a',
    icon: 'apps-box',
  },
];
