import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
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
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    flex: 1,
  },
});
