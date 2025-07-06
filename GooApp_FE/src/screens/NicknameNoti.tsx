import { Alert, Pressable, Text, View } from 'react-native';
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
import { SERVER_URI } from '@env';

export default function NicknameNoti() {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'NicknameNoti'
  >;
  const navigation = useNavigation<NavigationProp>();
  const LocalStorage = getLocalStorage();

  const [userData, setUserData] = useState<UserDataType | undefined>();
  const [createCount, setCreateCount] = useState<number>(0);

  // 유저 더미 데이터 생성 -> 유저 닉네임, 아이디 불러오기
  // 이거 서비스로 분리하기
  const createUser = async () => {
    try {
      // 서버 연결 - 유저 생성
      const res = await axios.post(`${SERVER_URI}/users`);

      if (res.data) {
        setUserData({ ...res.data, topScore: 0 });
      } else {
        throw new Error('UserNotCreated');
      }

      // 더미 닉네임 입력
      // setUserData(userDataJSON);
    } catch (error) {
      setCreateCount(createCount + 1);
    }
  };

  // 유저 정보 저장하기
  const saveUserData = () => {
    if (userData) {
      const userDataString = JSON.stringify(userData);
      LocalStorage.set('userData', userDataString);
    }
  };

  const showAlert = () => {
    Alert.alert(
      '유저를 생성하지 못했습니다.',
      '개발자에게 문의해 주시기 바랍니다.',
      [{ text: '확인' }],
    );
  };

  useEffect(() => {
    if (createCount < 5) {
      createUser();
    } else {
      showAlert();
    }
  }, [createCount]);

  useEffect(() => {
    saveUserData();
  }, [userData]);

  return (
    <View
      className={`bg-default-green flex-1 items-center justify-center p-[50]`}
    >
      {createCount < 5 ? (
        <>
          <View className="flex-1 justify-center">
            <TitleText size={30}>당신은...</TitleText>
            <TitleText size={50}>
              {userData?.nickname}
              {/* {'멋있는 주황색 코뿔소'} */}
            </TitleText>
            <View>
              <TitleText
                size={30}
                className="w-full text-right overflow-scroll"
              >
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
        </>
      ) : (
        <View className="flex-1 justify-center items-center gap-3">
          <TitleText size={30}>유저를 생성하지 못했습니다.</TitleText>
          <TitleText size={20}>개발자에게 문의해 주시기 바랍니다.</TitleText>
        </View>
      )}
    </View>
  );
}
