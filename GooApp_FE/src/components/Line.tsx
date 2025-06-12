import { View } from 'react-native';

interface props {
  color: 'light' | 'default' | 'dark';
}

export default function Line({ color }: props) {
  return <View className={'h-2 w-full rounded-full ' + `bg-${color}-green`} />;
}
