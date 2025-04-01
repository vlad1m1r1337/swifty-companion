import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { View } from 'react-native';

export const Checkmark = () => {
  return (
    <View>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={50} // Увеличенные размеры
        height={50}
        viewBox="0 0 24 24"
        fill="transparent" // Прозрачный fill
        stroke="black" // Черная обводка
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ backgroundColor: 'transparent' }} // Добавлен стиль для теста
      >
        <Circle cx="12" cy="12" r="10" />
        <Path d="m9 12 2 2 4-4" />
      </Svg>
    </View>
  );
};

export default Checkmark;