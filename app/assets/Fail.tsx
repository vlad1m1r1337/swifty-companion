import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { View } from 'react-native';

export const Fail = () => {
  return (
    <View>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={50} // Увеличенные размеры
        height={50}
        viewBox="0 0 24 24"
        fill="transparent"
        stroke="black" // Заменен currentColor на черный
        strokeWidth="2"
        strokeLinecap="round"
        style={{ backgroundColor: 'transparent' }} // Добавлен стиль для теста
        strokeLinejoin="round"
      >
        <Circle cx="12" cy="12" r="10" />
        <Path d="m15 9-6 6" />
        <Path d="m9 9 6 6" />
      </Svg>
    </View>
  );
};

export default Fail;