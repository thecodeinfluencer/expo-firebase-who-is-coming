import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, List } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { actionSetList } from '../redux/actions/dataActions';

export default function ServiceCard({ service }) {
  const dispatch = useDispatch();
  const state = useSelector(st => st);
  const user = state.auth.user;
  const busy = state.data?.busy?.requests;

  return (
    <Card style={styles.root}>
      <Card.Content>
        <List.Item
          title={service.names}
          description={service.service}
          style={styles.item}
          left={props => <List.Icon {...props} icon='basket' />}
          right={() => (
            <View style={styles.right}>
              <Button
                mode='outlined'
                disabled={busy}
                onPress={() => {
                  dispatch(
                    actionSetList('requests', {
                      ...service,
                      status: 'waiting',
                      user: {
                        uid: user?.uid,
                        names: user?.names,
                        unitId: user?.unitId,
                      },
                    })
                  );
                }}
              >
                Request
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
