import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Colors, DefaultTheme, List } from 'react-native-paper';
import { useSelector } from 'react-redux';
import moment from 'moment';

export default function GuestInfo({ navigation, route }) {
  const state = useSelector(st => st);
  const guests = state.data?.list?.guests;

  const guest = guests.filter(({ id }) => id == route?.params?.id)[0];

  navigation.setOptions({
    headerTitle: 'Guest Info',
  });

  return (
    <View>
      <Card style={styles.root}>
        <Card.Content>
          <List.Item
            titleStyle={styles.text}
            descriptionStyle={styles.text}
            title={guest?.names}
            description={`Unit ${guest?.unitId}`}
            style={styles.item}
          />
          <>
            <List.Item
              titleStyle={styles.text}
              descriptionStyle={styles.text}
              title={guest?.phone}
              description='Phone'
              style={styles.item}
              left={props => (
                <List.Icon {...props} icon='phone' color={Colors.white} />
              )}
            />
            <List.Item
              titleStyle={styles.text}
              descriptionStyle={styles.text}
              title={guest?.plate?.toUpperCase()}
              description='Plate number'
              style={styles.item}
              left={props => (
                <List.Icon {...props} icon='car' color={Colors.white} />
              )}
            />
            <List.Item
              titleStyle={styles.text}
              descriptionStyle={styles.text}
              title={moment(guest.id).format('LLLL')}
              description='Registered'
              style={styles.item}
              left={props => (
                <List.Icon {...props} icon='clock' color={Colors.white} />
              )}
            />
          </>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    margin: 8,
    backgroundColor: DefaultTheme.colors.primary,
  },
  item: {
    padding: 0,
  },
  text: {
    color: '#fff',
  },
});
