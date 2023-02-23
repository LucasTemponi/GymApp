import React from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  StatusBar,
  StyleSheet,
  Platform,
} from 'react-native';
import notifee from '@notifee/react-native';
import {exercices} from './Back';

export const BackView = () => {
  async function onDisplayNotification(exercice: (typeof exercices)[number]) {
    // Request permissions (required for iOS)

    if (Platform.OS === 'ios') {
      try {
        await notifee.requestPermission();
      } catch {
        console.log('Error');
      }
    }

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    try {
      await notifee.displayNotification({
        title: exercice.name,
        body: 'Main body content of the notification',
        android: {
          channelId,
          // pressAction is needed if you want the notification to open the app when pressed
          pressAction: {
            id: 'default',
          },
          ongoing: true,
          showChronometer: true,
          timestamp: Date.now() + 30000,
          chronometerDirection: 'down',
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

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
            <Text onPress={() => onDisplayNotification(item)}>{item.name}</Text>
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
