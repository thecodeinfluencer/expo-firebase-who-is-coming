import moment from 'moment';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, List } from 'react-native-paper';

export default function SuspicionCard({ suspicion }) {
  return (
    <Card style={styles.root}>
      <Card.Content>
        <List.Item
          title={suspicion.title + ' . ' + suspicion?.user?.names}
          description={
            suspicion.description + ' . ' + moment(suspicion?.id).fromNow()
          }
          style={styles.item}
          left={props => <List.Icon {...props} icon='alert' />}
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
