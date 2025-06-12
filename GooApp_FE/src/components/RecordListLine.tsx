import { View } from 'react-native';
import TitleText from './TitleText';
import Line from './Line';

interface props {
  content: string[];
}

export default function RecordListLine({ content }: props) {
  return (
    <View className="pt-10">
      <View className="flex-row h-16 px-3 justify-between grid">
        <TitleText className="flex-1 text-left" size={30}>
          {content[0]}
        </TitleText>
        <TitleText className="flex-1 text-center" size={30}>
          {content[1]}
        </TitleText>
        <TitleText className="flex-1 text-right" size={30}>
          {content[2]}
        </TitleText>
      </View>
      <Line color="default" />
    </View>
  );
}
