import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import {Text} from 'react-native-paper';
import {MainStackList} from '../../types/types';
import {styles} from './styles';

type Props = NativeStackScreenProps<MainStackList, 'Exercise Details'>;

export const ExerciceDetails = ({navigation, route}: Props) => {
  const {exercise} = route.params;

  useEffect(() => {
    if (exercise) {
      navigation.setOptions({
        title: exercise?.name.charAt(0).toUpperCase() + exercise?.name.slice(1),
      });
    }
  }, [exercise, navigation]);

  return (
    <View style={styles.container}>
      <Image style={styles.imageContainer} source={{uri: exercise?.gifUrl}} />
      <Text>{`Target: ${exercise?.target}`}</Text>
      <Text>{`Equipment: ${exercise?.equipment}`}</Text>
    </View>
  );
};
