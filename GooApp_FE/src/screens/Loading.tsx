import { useEffect } from 'react';
import { View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DefaultNavigatorParams } from '../types/navigationTypes';
import { useNavigation } from '@react-navigation/native';

import StyledText from '../components/StyledText';

import { useNetInfo } from '@react-native-community/netinfo';

export default function Loading() {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'Loading'
  >;
  const navigation = useNavigation<NavigationProp>();

  // 첫 실행 확인 더미 데이터
  const isFirst = true;
  const NetInfo = useNetInfo();

  useEffect(() => {
    if (isFirst) {
      if (NetInfo.isConnected === true) {
        navigation.replace('NicknameNoti');
      } else if (NetInfo.isConnected === false) {
        navigation.navigate('NetworkOfflineModal');
      }
    } else {
      navigation.replace('Home');
    }
  }, [NetInfo]);

  return (
    <View>
      <StyledText className="text-red-500 text-6xl">Loading</StyledText>
    </View>
  );
}
