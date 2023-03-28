import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 75,
    margin: 5,
    backgroundColor: '#fff',
    gap: 1,
    width: '100%',
    flexDirection: 'row',
  },
  imageContainer: {
    width: 75,
    aspectRatio: 1,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
