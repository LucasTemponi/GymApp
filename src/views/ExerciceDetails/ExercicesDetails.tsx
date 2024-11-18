import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Image, View, ScrollView} from 'react-native';
import {Text, List} from 'react-native-paper';
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

  console.log(exercise);

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.imageContainer} source={{uri: exercise?.gifUrl}} />
      <View style={styles.card}>
        <Text numberOfLines={1} style={styles.title}>{`Target: `}</Text>
        <Text>{exercise?.target}</Text>
        <Text numberOfLines={1} style={styles.subtitle}>{`Secondary: `}</Text>
        <Text>{`${exercise?.secondaryMuscles}`}</Text>
      </View>

      <View style={styles.card}>
        <Text numberOfLines={1} style={styles.title}>{`Equipment: `}</Text>
        <Text>{`${exercise?.equipment}`}</Text>
      </View>
      <View style={styles.card}>
        <Text numberOfLines={1} style={styles.title}>
          Instructions
        </Text>
        {exercise?.instructions?.map((instruction, index) => (
          <Text key={index}>{`${index + 1} - ${instruction}`}</Text>
        ))}
      </View>
    </ScrollView>
  );
};
