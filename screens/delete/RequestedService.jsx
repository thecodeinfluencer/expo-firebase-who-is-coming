import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, List } from 'react-native-paper';

export default function RequestedService({ navigation, route }) {
  const service = route?.params;

  navigation.setOptions({
    headerTitle: 'Request Status',
  });

  return (
    <View>
      <Card style={styles.root}>
        <Card.Content>
          <List.Item
            title={service?.names}
            description={service?.service}
            style={styles.item}
          />
          {service?.status === 'accepted' ? (
            <>
              <List.Item
                titleStyle={styles.accepted}
                title='Accepted'
                description='Status'
                style={styles.item}
                left={props => <List.Icon {...props} icon='notebook' />}
              />
              <List.Item
                title={service?.plate?.toUpperCase()}
                description='Plate number'
                style={styles.item}
                left={props => <List.Icon {...props} icon='car' />}
              />
              <List.Item
                title={`${service?.arrival} - ${service?.departure}`}
                description='Stay Duration'
                style={styles.item}
                left={props => <List.Icon {...props} icon='clock' />}
              />
            </>
          ) : (
            <List.Item
              titleStyle={styles.waiting}
              title='Waiting Acceptance'
              description='Status'
              style={styles.item}
              left={props => <List.Icon {...props} icon='clock' />}
            />
          )}
        </Card.Content>
      </Card>
    </View>
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
  waiting: {
    color: 'red',
  },
  accepted: {
    color: 'green',
  },
});
