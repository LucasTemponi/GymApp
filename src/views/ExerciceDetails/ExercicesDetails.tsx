import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Image, View} from 'react-native';
import {ScreensStackList} from '../../types';
import {styles} from './styles';

type Props = NativeStackScreenProps<ScreensStackList, 'Exercise Details'>;

export const ExerciceDetails = ({route}: Props) => {
  const {exercise} = route.params;

  return (
    <View style={styles.container}>
      <Image style={styles.imageContainer} source={{uri: exercise?.gifUrl}} />
    </View>
  );
};
