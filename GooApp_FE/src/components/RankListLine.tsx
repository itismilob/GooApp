import { View } from 'react-native';
import TitleText from './TitleText';
import Line from './Line';

interface props {
  content: string[];
}

export default function RankListLine({ content }: props) {
  return (
    <>
      <View className="py-3">
        <View className="flex-row h-16 px-3 gap-3 justify-between items-center">
          <TitleText className="w-[40] text-left" size={30}>
            {content[0]}
          </TitleText>
          <TitleText className="flex-1 text-left" size={20}>
            {content[1]}
          </TitleText>
          <TitleText className="w-30 text-right" size={20}>
            {content[2]}
          </TitleText>
        </View>
      </View>
      <Line color="default" />
    </>
  );
}
