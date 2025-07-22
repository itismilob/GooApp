import { View } from 'react-native';
import TitleText from './TitleText';
import Line from './Line';

interface props {
  content: string[];
}

export default function RecordListLine({ content }: props) {
  return (
    <>
      <View className="py-3">
        <View className="flex-row h-16 px-default justify-between items-center">
          <TitleText className="flex-1 text-left" size={20}>
            {content[0]}
          </TitleText>
          <TitleText className="flex-1 text-center" size={20}>
            {content[1]}
          </TitleText>
          <TitleText className="flex-1 text-right" size={20}>
            {content[2]}
          </TitleText>
        </View>
      </View>
    </>
  );
}
