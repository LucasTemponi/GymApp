import {StyleSheet} from 'react-native';
import {DefaultTheme} from 'react-native-paper';

export const styles = StyleSheet.create({
  container: {
    height: 75,
    backgroundColor: DefaultTheme.colors.backdrop,
    width: '100%',
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
  },
  imageContainer: {
    overflow: 'hidden',
    width: 70,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 20,
    marginVertical: 5,
    overflow: 'hidden',
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  menuButton: {
    display: 'flex',
    marginTop: 17,
  },
  setContainer: {display: 'flex', flexDirection: 'row', gap: 1},
});
