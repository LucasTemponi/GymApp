import React from 'react';
import {FlatList, Image, View} from 'react-native';

import {Text, TextInput} from 'react-native-paper';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Button} from 'react-native-paper';

import {styles} from './styles';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Exercice, ScreensStackList} from '../../types';

const instance = axios.create({
  baseURL: 'https://exercisedb.p.rapidapi.com/exercises',
  timeout: 1000,
  headers: {
    'X-RapidAPI-Key': '16aebbac70msh81aa02278bca4ddp179321jsncc2788d06127',
    'X-RapidAPI': 'Host:exercisedb.p.rapidapi.com',
  },
});

type Props = NativeStackScreenProps<ScreensStackList, 'Home'>;

export const Home = ({navigation}: Props) => {
  const [exercices, setExercices] = useState<Exercice[]>();
  const [query, setQuery] = useState('');

  const handleSearch = (text: string) => {
    setQuery(text);
  };

  useEffect(() => {
    instance
      .get('')
      .then(result => setExercices(result.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBox}
        label="Busca"
        onChangeText={handleSearch}
        right={<TextInput.Icon icon="magnify" />}
      />
      <FlatList
        data={exercices?.filter(exercice =>
          exercice.name.includes(query.toLowerCase()),
        )}
        renderItem={({item}) => (
          <View style={styles.exerciceContainer}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: item.gifUrl,
              }}
            />
            <Text
              onPress={() =>
                navigation.navigate('Exercise Details', {exercise: item})
              }>
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </Text>
          </View>
        )}
      />
      <Button mode="elevated">Teste</Button>
    </View>
  );
};

export default Home;
