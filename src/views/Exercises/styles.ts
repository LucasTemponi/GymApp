import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#fff',
    gap: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBox: {
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
  },
  exerciceContainer: {
    marginVertical: 1,
    flex: 1,
    flexDirection: 'row',
    gap: 1,
    alignItems: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    width: '100%',
    marginBottom: 10,
  },
});
