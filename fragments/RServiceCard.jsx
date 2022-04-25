import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, List } from 'react-native-paper';

export default function RServiceCard({ navigation, request }) {
  return (
    <Card mode='outlined' style={styles.root}>
      <Card.Content>
        <List.Item
          title={`${request.names} . ${request?.status}`}
          description={request.service}
          style={styles.item}
          left={props => <List.Icon {...props} icon='basket' />}
          right={() => (
            <View style={styles.right}>
              <Button
                mode='outlined'
                onPress={() =>
                  navigation.navigate('RequestedService', {
                    ...request,
                  })
                }
              >
                View
              </Button>
            </View>
          )}
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
  right: {
    justifyContent: 'center',
  },
});
