import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DefaultNavigatorParams } from '@/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';

import { getLocalStorage } from '@/stores/mmkvStorage';

import useCheckNetInfo from '@/hooks/useCheckNetInfo';
import TitleText from '@/components/TitleText';

export default function Loading() {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'Loading'
  >;
  const navigation = useNavigation<NavigationProp>();
  const localStorage = getLocalStorage();
  const [isFirst, setIsFirst] = useState<boolean>();

  // 네트워크 확인해서 모달 띄움
  const checkNetInfoTrigger = useCheckNetInfo(
    () => {
      navigation.replace('NicknameNoti');
    },
    () => {
      navigation.navigate('NetworkOfflineModal');
    },
  );

  // 첫 실행인지 확인
  const checkFirstStart = () => {
    // userDataString : 유저 데이터가 존재하는지 확인 (임시 명칭임)
    const userDataString = localStorage.getString('userData');
    return userDataString === undefined;
  };

  useEffect(() => {
    // 테스트용 데이터 초기화
    // localStorage.clearAll();

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
      checkNetInfoTrigger();
    }
  }, [isFirst]);

  return (
    <View className={`bg-default-green flex-1 items-center justify-center`}>
      <TitleText size={50}>Loading</TitleText>
    </View>
  );
}
