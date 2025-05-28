import { Pressable, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DefaultNavigatorParams } from '@/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';

import HeaderButton from '@/components/HeaderButton';
import TitleText from '@/components/TitleText';
import DefaultButton from '@/components/DefaultButton';
import StyledText from '@/components/StyledText';
import Information from '@/components/Information';

export default function Puzzle() {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'Puzzle'
  >;
  const navigation = useNavigation<NavigationProp>();

  return (
    <View className="bg-green-500 w-full h-full">
      <HeaderButton>퍼즐</HeaderButton>
      {/* 점수, 시간 */}
      <Information>
        <>
          <TitleText size={60}>남은 시간</TitleText>
          <View className="flex-row justify-between">
            <TitleText size={30}>맞은 수 / 틀린 수</TitleText>
            <TitleText size={30}>정확도%</TitleText>
          </View>
          <TitleText size={20}>정답을 짝지어 주세요</TitleText>
        </>
      </Information>
      {/* 버튼 */}
      <View className="flex-row w-full flex-1 gap-2">
        <View className="flex-1 h-full gap-2">
          <DefaultButton className="bg-green-700 flex-1" onPress={() => {}}>
            <StyledText>10 x 2</StyledText>
          </DefaultButton>
          <DefaultButton className="bg-green-700 flex-1" onPress={() => {}}>
            <StyledText>10 x 2</StyledText>
          </DefaultButton>
          <DefaultButton className="bg-green-700 flex-1" onPress={() => {}}>
            <StyledText>10 x 2</StyledText>
          </DefaultButton>
          <DefaultButton className="bg-green-700 flex-1" onPress={() => {}}>
            <StyledText>10 x 2</StyledText>
          </DefaultButton>
          <DefaultButton className="bg-green-700 flex-1" onPress={() => {}}>
            <StyledText>10 x 2</StyledText>
          </DefaultButton>
        </View>
        <View className="flex-1 h-full gap-2">
          <DefaultButton className="bg-green-700 flex-1" onPress={() => {}}>
            <StyledText>10 x 2</StyledText>
          </DefaultButton>
          <DefaultButton className="bg-green-700 flex-1" onPress={() => {}}>
            <StyledText>10 x 2</StyledText>
          </DefaultButton>
          <DefaultButton className="bg-green-700 flex-1" onPress={() => {}}>
            <StyledText>10 x 2</StyledText>
          </DefaultButton>
          <DefaultButton className="bg-green-700 flex-1" onPress={() => {}}>
            <StyledText>10 x 2</StyledText>
          </DefaultButton>
          <DefaultButton className="bg-green-700 flex-1" onPress={() => {}}>
            <StyledText>10 x 2</StyledText>
          </DefaultButton>
        </View>
      </View>
    </View>
  );
}
