import { View } from 'react-native';
import TitleText from './TitleText';
import Line from './Line';
import Trophy from './Trophy';

interface props {
  content: [number, string, string];
}

export default function RankListLine({ content }: props) {
  return (
    <>
      <View className="py-3">
        <View className="flex-row h-16 px-default gap-3 justify-between items-center">
          {content[0] <= 3 ? (
            <View className="right-5 w-[50]">
              <Trophy rank={content[0]} />
            </View>
          ) : (
            <TitleText className="w-[50] text-left" size={30}>
              {content[0]}
            </TitleText>
          )}
          <TitleText className="flex-1 text-left" size={20}>
            {content[1]}
          </TitleText>
          <TitleText className="w-30 text-right" size={20}>
            {content[2]}
          </TitleText>
        </View>
      </View>
    </>
  );
}
