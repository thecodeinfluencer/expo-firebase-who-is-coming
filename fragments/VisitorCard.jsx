import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, List } from 'react-native-paper';

export default function VendorCard({ navigation, request }) {
  return (
    <Card style={styles.root}>
      <Card.Content>
        <List.Item
          title={request?.user?.names}
          description={request.service}
          style={styles.item}
          left={props => <List.Icon {...props} icon='account' />}
          right={() => (
            <View style={styles.right}>
              <Button
                mode='outlined'
                onPress={() =>
                  navigation.navigate('CreateVisit', {
                    ...request,
                  })
                }
              >
                {request.status == 'accepted' ? 'Edit' : 'Accept'}
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
