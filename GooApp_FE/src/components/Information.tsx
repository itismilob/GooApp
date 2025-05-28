import { View } from 'react-native';
import { ReactElement } from 'react';

interface props {
  children: ReactElement;
}

export default function Information({ children }: props) {
  return (
    <View className="items-center justify-center h-[300]">{children}</View>
  );
}
