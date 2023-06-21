import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#fff',
    gap: 1,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 0.3,
    aspectRatio: 1,
  },
  text: {
    margin: 10,
    padding: 10,
    fontSize: 20,
  },

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  flatList: {paddingVertical: 20, paddingHorizontal: 10},
});
