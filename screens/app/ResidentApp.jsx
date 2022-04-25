import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  Card,
  DefaultTheme,
  IconButton,
  TouchableRipple,
} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { actionLoadList, actionSetList } from '../../redux/actions/dataActions';

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
      <View style={styles.buttons}>
        <TouchableRipple
          style={styles.button1}
          onPress={() => {
            // const value = 'unt36';

            // dispatch(
            //   actionSetList('units', {
            //     id: Date.now(),
            //     label: value.toUpperCase(),
            //     description: `Unit ${value}`,
            //   })
            // );

            navigation.navigate('ReportSuspicion');
          }}
        >
          <Card style={styles.card} mode='outlined'>
            <Text style={styles.cardText}>Report Suspicious Activity</Text>
          </Card>
        </TouchableRipple>
        <TouchableRipple
          style={styles.button2}
          onPress={() => navigation.navigate('Suspicions')}
        >
          <Card style={styles.card} mode='outlined'>
            <Text style={styles.cardText}> View Suspicious activities</Text>
          </Card>
        </TouchableRipple>
      </View>
      <View style={styles.buttons}>
        <TouchableRipple
          style={styles.button1}
          onPress={() => navigation.navigate('Services')}
        >
          <Card style={styles.card} mode='outlined'>
            <Text style={styles.cardText}>Request Service</Text>
          </Card>
        </TouchableRipple>
        <TouchableRipple
          style={styles.button2}
          onPress={() => navigation.navigate('ViewResidents')}
        >
          <Card style={styles.card} mode='outlined'>
            <Text style={styles.cardText}>View Neighbors</Text>
          </Card>
        </TouchableRipple>
      </View>
      <View style={styles.buttons}>
        <TouchableRipple
          style={styles.button1}
          onPress={() => navigation.navigate('ManageGuests')}
        >
          <Card style={styles.card} mode='outlined'>
            <Text style={styles.cardText}>Manage Guests</Text>
          </Card>
        </TouchableRipple>
        <View style={styles.button3} />
      </View>
      {/* <Text style={styles.text}>Coming to neighbourhood</Text>
      {(!activities || activities?.length < 1) && <ListEmptyCard />}
      {activities?.map(activity => (
        <ResidentCard key={activity.id} activity={activity} />
      ))} */}
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
  button3: {
    flex: 1,
    marginLeft: 8,
  },
  // text: {
  //   fontSize: 24,
  //   marginVertical: 12,
  //   marginHorizontal: 16,
  //   color: '#999',
  // },
  cardText: {
    fontSize: 16,
    color: DefaultTheme.colors.primary,
    fontWeight: '400',
  },
});
