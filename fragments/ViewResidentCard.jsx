import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, List } from 'react-native-paper';

export default function ViewResidentCard({ resident }) {
  return (
    <Card style={styles.root}>
      <Card.Content>
        <List.Item
          title={resident.names}
          description={resident.unitId || 'HSE XXX'}
          style={styles.item}
          left={props => <List.Icon {...props} icon='account' />}
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
