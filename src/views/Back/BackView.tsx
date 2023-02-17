import React from 'react';
import {View, Image, Text, FlatList, StatusBar, StyleSheet} from 'react-native';
import {Notifications} from 'react-native-notifications';
import {exercices} from './Back';

export const BackView = () => {
  const handlePartClick = (bodyPart: string) => {
    Notifications.postLocalNotification({
      type: '',
      badge: 1,
      body: bodyPart,
      identifier: '',
      payload: '',
      sound: '',
      thread: '',
      title: 'Clicou!',
    });
  };
  const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    logo: {
      width: 66,
      height: 58,
    },
  });

  return (
    <View>
      <StatusBar />
      <FlatList
        data={exercices}
        renderItem={({item}) => (
          <View>
            <Text onPress={() => handlePartClick(item.name)}>{item.name}</Text>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: item.gifUrl,
              }}
            />
          </View>
        )}
      />
    </View>
  );
};
