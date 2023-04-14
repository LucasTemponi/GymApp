import React from 'react';
import {Exercise} from '../../types/types';
import {Card} from 'react-native-paper';
import {StyleSheet} from 'react-native';

type Props = {
  exercise: Exercise;
  onPress: () => void;
};
export const ExerciseCard = ({exercise, onPress}: Props) => {
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Cover source={{uri: exercise.gifUrl}} />
      <Card.Title
        title={exercise.name.charAt(0).toUpperCase() + exercise.name.slice(1)}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {flex: 0.5, marginBottom: 15, marginHorizontal: 5, display: 'flex'},
});
