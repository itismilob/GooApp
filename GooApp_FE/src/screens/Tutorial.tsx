import { Pressable, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DefaultNavigatorParams } from '@/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import DefaultButton from '@/components/DefaultButton';
import HeaderButton from '@/components/HeaderButton';
import TitleText from '@/components/TitleText';

export default function Tutorial() {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'Tutorial'
  >;
  const navigation = useNavigation<NavigationProp>();

  return (
    <View className="flex w-full h-full">
      <HeaderButton>Tutorial</HeaderButton>

      <DefaultButton
        onPress={() => {
          navigation.replace('Puzzle');
        }}
      >
        <TitleText size={30} className="color-black">
          확인
        </TitleText>
      </DefaultButton>
    </View>
  );
}
