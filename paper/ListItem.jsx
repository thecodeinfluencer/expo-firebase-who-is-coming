import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, List, DefaultTheme } from 'react-native-paper';

export default function ListItem({ title, description, right, left, bg }) {
  const styles = StyleSheet.create({
    root: {
      marginHorizontal: 8,
      marginVertical: 4,
      backgroundColor: bg || DefaultTheme.colors.primary,
    },
    item: {
      padding: 0,
    },
    text: {
      color: '#fff',
      marginLeft: left && 4,
    },
  });

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
