import { StyleSheet, Text, View } from 'react-native';
import TitleText from '../components/TitleText';
import { fileMapCacheDirectory } from '../../metro.config';
import DefaultButton from '../components/DefaultButton';
import StyledText from '../components/StyledText';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DefaultNavigatorParams } from '../types/navigationTypes';
import { useNavigation } from '@react-navigation/native';

export default function NetworkOfflineModal() {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'NetworkOfflineModal'
  >;
  const navigation = useNavigation<NavigationProp>();

  return (
    <View className="h-full w-full bg-black/60 flex">
      <TitleText size={60}>Network Fail;</TitleText>
      <DefaultButton
        onPress={() => {
          navigation.popToTop();
        }}
      >
        <StyledText>확인</StyledText>
      </DefaultButton>
    </View>
  );
}
