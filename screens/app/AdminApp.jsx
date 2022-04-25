import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  Card,
  DefaultTheme,
  IconButton,
  TouchableRipple,
} from 'react-native-paper';
import { useDispatch } from 'react-redux';
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
      <View style={styles.buttons}>
        <TouchableRipple
          style={styles.button1}
          onPress={() => navigation.navigate('ManageResidents')}
        >
          <Card style={styles.card} mode='outlined'>
            <Text style={styles.cardText}>Manage Residents</Text>
          </Card>
        </TouchableRipple>
        <TouchableRipple
          style={styles.button2}
          onPress={() => navigation.navigate('ManageVendors')}
        >
          <Card style={styles.card} mode='outlined'>
            <Text style={styles.cardText}>Service Vendors</Text>
          </Card>
        </TouchableRipple>
      </View>
      <View style={styles.buttons}>
        <TouchableRipple
          style={styles.button1}
          onPress={() => navigation.navigate('ManageUnits')}
        >
          <Card style={styles.card} mode='outlined'>
            <Text style={styles.cardText}>House Units</Text>
          </Card>
        </TouchableRipple>
        <TouchableRipple
          style={styles.button2}
          onPress={() => navigation.navigate('ManageServices')}
        >
          <Card style={styles.card} mode='outlined'>
            <Text style={styles.cardText}>Service Categories</Text>
          </Card>
        </TouchableRipple>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    marginHorizontal: 8,
    marginTop: 16,
  },
  card: {
    padding: 14,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: DefaultTheme.colors.primary,
  },
  button1: {
    flex: 1,
    marginRight: 8,
  },
  button2: {
    flex: 1,
    marginLeft: 8,
  },
  cardText: {
    fontSize: 16,
    color: DefaultTheme.colors.primary,
    fontWeight: '400',
  },
});
