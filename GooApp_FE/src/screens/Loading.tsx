import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DefaultNavigatorParams } from '../types/navigationTypes';
import { useNavigation } from '@react-navigation/native';

import { getNetInfo } from '../utils/netinfo';

export default function Loading() {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'Loading'
  >;
  const navigation = useNavigation<NavigationProp>();

  // 첫 실행 확인 더미 데이터
  const isFirst = true;

  const checkNetwork = async () => {
    const netState = await getNetInfo();
    const isNetConnected = netState.isConnected;
    if (isNetConnected) {
      navigation.replace('NicknameNoti');
    } else {
      // open modal
    }
  };

  useEffect(() => {
    if (isFirst) {
      checkNetwork();
    } else {
      navigation.replace('Home');
    }
  }, []);

  return (
    <View>
      <Text>Loading</Text>
    </View>
  );
}
