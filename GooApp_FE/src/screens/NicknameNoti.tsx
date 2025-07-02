import { Pressable, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DefaultNavigatorParams } from '@/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import userDataJSON from '@/test/userData.json';

import { getLocalStorage } from '@/stores/mmkvStorage';

import { UserDataType } from '@/types/dataTypes';
import { defaultGap, defaultGreen } from '@/styles/const';
import DefaultButton from '@/components/DefaultButton';
import TitleText from '@/components/TitleText';
import axios from 'axios';

export default function NicknameNoti() {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'NicknameNoti'
  >;
  const navigation = useNavigation<NavigationProp>();
  const LocalStorage = getLocalStorage();

  const [userData, setUserData] = useState<UserDataType>();

  // 유저 더미 데이터 생성 -> 유저 닉네임, 아이디 불러오기
  const fetchData = async () => {
    const { SERVER_URI } = process.env;

    // 서버 연결 - 유저 생성
    const res = await axios.post(`${SERVER_URI}/users`);

    setUserData(res.data);

    // 더미 닉네임 입력
    // setUserData(userDataJSON);
  };

  // 유저 정보 저장하기
  const saveUserData = () => {
    if (userData) {
      const userDataString = JSON.stringify(userData);
      LocalStorage.set('userData', userDataString);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    saveUserData();
  }, [userData]);

  return (
    <View
      className={`bg-default-green flex-1 items-center justify-center p-[50]`}
    >
      <View className="flex-1 justify-center">
        <TitleText size={30}>당신은...</TitleText>
        <TitleText size={50}>
          {userData?.nickname}
          {/* {'멋있는 주황색 코뿔소'} */}
        </TitleText>
        <View>
          <TitleText size={30} className="w-full text-right overflow-scroll">
            입니다!
          </TitleText>
        </View>
      </View>
      <DefaultButton
        color="green"
        onPress={() => {
          navigation.replace('Home');
        }}
      >
        시작하기
      </DefaultButton>
    </View>
  );
}
