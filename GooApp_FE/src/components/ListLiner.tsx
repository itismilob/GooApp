import { ReactElement } from 'react';
import { Text, View } from 'react-native';
import Line from './Line';

interface props {
  index: number;
  children: ReactElement;
}

export default function ListLiner({ index, children }: props) {
  return (
    <View>
      {index === 0 && <Line color="default" />}
      {children}
      <Line color="default" />
    </View>
  );
}
