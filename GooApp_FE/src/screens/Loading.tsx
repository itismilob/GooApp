import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DefaultNavigatorParams } from '../types/navigationTypes';
import { useNavigation } from '@react-navigation/native';

import StyledText from '../components/StyledText';

import { useNetInfo } from '@react-native-community/netinfo';
import { getLocalStorage } from '../stores/mmkvStorage';

export default function Loading() {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'Loading'
  >;
  const navigation = useNavigation<NavigationProp>();
  const LocalStorage = getLocalStorage();
  const NetInfo = useNetInfo();
  const [isFirst, setIsFirst] = useState<boolean>();

  // 첫 실행인지 확인
  function checkFirstStart() {
    // userDataString : 유저 데이터가 존재하는지 확인 (임시 명칭임)
    const userDataString = LocalStorage.getString('userData');
    return userDataString === undefined;
  }

  // 네트워크 확인해서 모달 띄움
  function checkNetwork() {
    if (NetInfo.isConnected === true) {
      navigation.replace('NicknameNoti');
    } else if (NetInfo.isConnected === false) {
      navigation.navigate('NetworkOfflineModal');
    }
  }

  useEffect(() => {
    // 첫 실행인지 확인하고 아니면 Home으로 이동
    const result = checkFirstStart();
    setIsFirst(result);
    if (!result) {
      navigation.replace('Home');
    }
  }, []);

  useEffect(() => {
    // 첫 실행인지 확인이 된 후 네트워크 확인
    if (isFirst) {
      checkNetwork();
    }
  }, [NetInfo]);

  return (
    <View>
      <StyledText className="text-red-500 text-6xl">Loading</StyledText>
    </View>
  );
}
