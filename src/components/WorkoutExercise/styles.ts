import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#fff',
    gap: 1,
    width: '100%',
  },
  imageContainer: {
    flex: 0.3,
    aspectRatio: 1,
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
