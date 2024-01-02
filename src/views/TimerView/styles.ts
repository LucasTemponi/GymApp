import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
  },
  exerciseName: {
    marginTop: 15,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {position: 'relative', bottom: 0, height: 50, width: '100%'},
  timerContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    flex: 1,
  },

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
