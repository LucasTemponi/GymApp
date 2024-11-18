import {StyleSheet} from 'react-native';
import {DefaultTheme} from 'react-native-paper';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 50,
    backgroundColor: '#fff',
    gap: 10,
    overflowY: 'scroll',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 100,
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  card: {
    backgroundColor: DefaultTheme.colors.backdrop,
    padding: 20,
    width: '100%',
    flexDirection: 'column',
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowColor: '#fff',
    shadowOpacity: 0.25,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    overflow: 'hidden',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    overflow: 'hidden',
    marginBottom: 5,
  },
});
