import { View } from 'react-native';
import TitleText from './TitleText';

interface props {
  content: {
    a: string;
    b: string;
    c: string;
  };
}

export default function RecordListLine({ content }: props) {
  return (
    <View className="pt-10">
      <View className="flex-row h-16 justify-between">
        <TitleText size={30}>{content.a}</TitleText>
        <TitleText size={30}>{content.b}</TitleText>
        <TitleText size={30}>{content.c}</TitleText>
      </View>
      <View className="w-full h-1 bg-green-950" />
    </View>
  );
}
