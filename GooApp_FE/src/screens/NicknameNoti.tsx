import { Pressable, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DefaultNavigatorParams } from '@/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import userDataJSON from '@/test/userData.json';

import { getLocalStorage } from '@/stores/mmkvStorage';

import { userDataType } from '@/types/dataTypes';

export default function NicknameNoti() {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'NicknameNoti'
  >;
  const navigation = useNavigation<NavigationProp>();
  const LocalStorage = getLocalStorage();

  const [userData, setUserData] = useState<userDataType>();

  // 유저 더미 데이터 생성 -> 유저 닉네임, 아이디 불러오기
  const fetchData = async () => {
    // fetch data await
    setUserData(userDataJSON);
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
    <View>
      <Text>당신은...</Text>
      <Text>{userData?.nickname}</Text>
      <Text>입니다!</Text>
      <Pressable
        onPress={() => {
          navigation.replace('Home');
        }}
      >
        <Text>시작하기</Text>
      </Pressable>
    </View>
  );
}
