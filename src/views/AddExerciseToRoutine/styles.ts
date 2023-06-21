import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
    gap: 1,
  },
  imageContainer: {
    height: 400,
    aspectRatio: 1,
  },
  setContainer: {
    height: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    marginHorizontal: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
