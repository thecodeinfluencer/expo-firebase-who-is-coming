import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, DefaultTheme, List } from 'react-native-paper';

export default function ListItem({ title, description, right, left }) {
  return (
    <Card style={styles.root}>
      <Card.Content>
        <List.Item
          titleStyle={styles.text}
          descriptionStyle={styles.text}
          title={title}
          description={description}
          style={styles.item}
          left={left}
          right={right}
        />
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 8,
    marginVertical: 4,
    backgroundColor: DefaultTheme.colors.primary,
  },
  item: {
    padding: 0,
  },
  text: {
    color: '#fff',
    fontFamily: 'Nunito',
  },
});
