import { Alert, Pressable, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DefaultNavigatorParams } from '@/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import userDataJSON from '@/test/userData.json';

import { UserDataType } from '@/types/dataTypes';
import { defaultGap, defaultGreen } from '@/styles/const';
import DefaultButton from '@/components/DefaultButton';
import TitleText from '@/components/TitleText';
import { showErrorAlert } from '@/utils/alert';
import userLocalStore from '@/stores/userStore';

export default function NicknameNoti() {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'NicknameNoti'
  >;
  const navigation = useNavigation<NavigationProp>();

  const user = userLocalStore(state => state.user);

  return (
    <View
      className={`bg-default-green flex-1 items-center justify-center p-[50]`}
    >
      <View className="flex-1 justify-center">
        <TitleText size={30}>당신은...</TitleText>
        <TitleText size={50}>
          {user.nickname}
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
