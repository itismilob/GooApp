import { StyleSheet, Text, View } from 'react-native';
import TitleText from '@/components/TitleText';
import DefaultButton from '@/components/DefaultButton';
import StyledText from '@/components/StyledText';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DefaultNavigatorParams } from '@/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function NetworkOfflineModal() {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'NetworkOfflineModal'
  >;
  const navigation = useNavigation<NavigationProp>();

  return (
    <View className="h-full w-full bg-black/60 items-center justify-center p-[30]">
      <View className="flex-1 justify-center w-full">
        <View
          className={`bg-default-green items-center justify-center w-full h-72 rounded-default gap-10`}
        >
          <Icon
            name={'wifi-strength-off-outline'}
            size={50}
            color="white"
          ></Icon>
          <View className="gap-5">
            <TitleText size={30}>오프라인 상태입니다.</TitleText>
            <TitleText size={20}>네트워크 설정을 확인해주세요.</TitleText>
          </View>
        </View>
      </View>
      <DefaultButton
        onPress={() => {
          navigation.popToTop();
        }}
      >
        확인
      </DefaultButton>
    </View>
  );
}
