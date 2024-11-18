import React, {forwardRef} from 'react';
import {Exercise} from '../../types/types';
import {Card} from 'react-native-paper';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  exercise: Exercise;
  onPress?: () => void;
};
export const ExerciseCard = forwardRef<View, Props>(
  ({exercise, onPress}: Props, ref) => {
    return (
      <Card ref={ref} style={styles.card} onPress={onPress}>
        <Card.Cover source={{uri: exercise.gifUrl}} />
        <Card.Title titleStyle={styles.title} title={exercise.name} />
      </Card>
    );
  },
);

const styles = StyleSheet.create({
  card: {
    flex: 0.5,
    marginBottom: 15,
    marginHorizontal: 5,
    display: 'flex',
  },
  title: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
});
