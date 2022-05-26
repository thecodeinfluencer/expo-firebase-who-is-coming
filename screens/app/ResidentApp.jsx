import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Colors, IconButton, TouchableRipple } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { actionLoadList } from '../../redux/actions/dataActions';

export default function ResidentApp({ navigation }) {
  const dispatch = useDispatch();

  navigation.setOptions({
    headerRight: () => (
      <IconButton
        icon='cog'
        onPress={() => navigation.navigate('ResidentSettings')}
      />
    ),
  });

  useEffect(() => {
    dispatch(actionLoadList('requests'));
  }, []);

  return (
    <ScrollView>
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
  actionText: { color: '#fff' },
});

const actions = [
  {
    name: 'ReportSuspicion',
    text: 'Report Suspicious Activity',
    bg: '#ef5dab',
    icon: 'alert-plus-outline',
  },
  {
    name: 'Suspicions',
    text: 'View Suspicious activities',
    bg: '#aeaff7',
    icon: 'alert-rhombus-outline',
  },
  {
    name: 'Services',
    text: 'Request Service',
    bg: '#a0e3e2',
    icon: 'account-cash-outline',
  },
  {
    name: 'ViewResidents',
    text: 'View Neighbors',
    bg: '#c3f2a6',
    icon: 'account-group',
  },
  {
    name: 'ManageGuests',
    text: 'Manage Guests',
    bg: '#008b8b',
    icon: 'badge-account-outline',
  },
];
