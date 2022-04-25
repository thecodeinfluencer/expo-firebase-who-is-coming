import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, List } from 'react-native-paper';

export default function ResidentCard({ activity }) {
  return (
    <Card style={styles.root}>
      <Card.Content>
        <List.Item
          title={`${activity.names} . ${activity.service}`}
          style={styles.item}
          left={props => <List.Icon {...props} icon='account' />}
        />
        <List.Item
          title={`${activity.user?.names} (${activity.user?.unitId})`}
          style={styles.item}
          left={props => <List.Icon {...props} icon='car' />}
        />
        <List.Item
          title={activity.plate?.toUpperCase()}
          style={styles.item}
          left={props => <List.Icon {...props} icon='car' />}
        />
        <List.Item
          title={`${activity?.arrival} - ${activity?.departure}`}
          style={styles.item}
          left={props => <List.Icon {...props} icon='clock' />}
        />
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 8,
    marginVertical: 4,
  },
  item: {
    padding: 0,
  },
});
