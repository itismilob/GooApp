import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DefaultNavigatorParams } from '@/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';

import { LocalStorage } from '@/stores/mmkvStorage';

import useCheckNetInfo from '@/hooks/useCheckNetInfo';
import TitleText from '@/components/TitleText';
import { customAxios } from '@/services/customAxios';
import { UserDataType } from '@/types/dataTypes';
import {
  getLocalUserData,
  setLocalUserData,
} from '@/stores/localStorageFunctions';
import userDataAPI from '@/services/userDataAPI';

export default function Loading() {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'Loading'
  >;
  const navigation = useNavigation<NavigationProp>();
  const [isTryed, setIsTryed] = useState(false);

  // 네트워크 확인해서 모달 띄움
  const checkNetInfoTrigger = useCheckNetInfo(
    () => {
      createUser();
    },
    () => {
      navigation.navigate('NetworkOfflineModal');
    },
  );

  // 첫 실행인지 확인
  const checkFirstStart = () => {
    const isUserData = getLocalUserData();
    return isUserData === undefined;
  };

  // 유저 정보 저장하기
  const createUser = async () => {
    if (isTryed) return;
    setIsTryed(true);
    const newUser = await userDataAPI.createUser();
    setLocalUserData(newUser);

    // 유저 생성 후 NickNoti로 이동
    navigation.replace('NicknameNoti');
  };

  useEffect(() => {
    // 테스트용 데이터 초기화 ***
    // LocalStorage.clearAll();

    // 첫 실행인지 확인하고 아니면 Home으로 이동
    const isFirst = checkFirstStart();

    if (isFirst) {
      // 첫 실행이라면 네트워크 확인
      checkNetInfoTrigger();
    } else {
      // 첫 실행이 아니면 Home으로
      navigation.replace('Home');
    }
  }, []);

  return (
    <View className={`bg-default-green flex-1 items-center justify-center`}>
      <TitleText size={50}>Loading</TitleText>
    </View>
  );
}
