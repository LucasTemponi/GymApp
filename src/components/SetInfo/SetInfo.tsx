import React from 'react';
import {ExerciseSet} from '../../types/types';
import {View, Text} from 'react-native';
import {weightUnit} from '../../consts/units';
import {DefaultTheme} from 'react-native-paper';

type Props = {
  set: ExerciseSet;
};
export const SetInfo = ({set}: Props) => {
  return (
    <View
      style={{
        marginRight: 5,
        padding: 2,
        // backgroundColor: DefaultTheme.colors.secondary,
      }}>
      <View>
        <Text
          style={{
            fontSize: DefaultTheme.fonts.labelMedium.fontSize,
            // textAlign: 'center',
          }}>
          {`${set.reps} x`}
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontSize: DefaultTheme.fonts.labelLarge.fontSize,
          }}>{`${set.load}${weightUnit.kilo}`}</Text>
      </View>
    </View>
  );
};
