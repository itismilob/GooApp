import { Pressable, Text, View } from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DefaultNavigatorParams } from '@/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import DefaultButton from '@/components/DefaultButton';
import TitleText from '@/components/TitleText';
import HeaderButton from '@/components/HeaderButton';
import { useEffect, useState } from 'react';
import { UserDataType } from '@/types/dataTypes';
import { getLocalStorage } from '@/stores/mmkvStorage';
import IconButton from '@/components/IconButton';

import IonIcons from 'react-native-vector-icons/Ionicons';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FA5Icons from 'react-native-vector-icons/FontAwesome5';
import {
  getLocalScoreData,
  getLocalUserData,
} from '@/stores/localStorageFunctions';

export default function Home() {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'Home'
  >;
  const navigation = useNavigation<NavigationProp>();
  const LocalStorage = getLocalStorage();

  const [userData, setUserData] = useState<UserDataType>();

  useEffect(() => {
    const localData = getLocalUserData();
    setUserData(localData);
  }, []);

  return (
    <View className="bg-default-green flex-1 p-default">
      <View className="h-header items-center justify-center gap-6">
        <TitleText size={60}>GooApp</TitleText>
        <TitleText size={30}>{userData?.nickname}</TitleText>
      </View>

      <View className="flex-1 gap-default justify-center ">
        <IconButton
          onPress={() => {
            navigation.navigate('Tutorial');
          }}
          text="퍼즐"
        >
          <IonIcons name="extension-puzzle" size={30} color={'white'} />
        </IconButton>
        <IconButton
          onPress={() => {
            navigation.navigate('Record');
          }}
          text="기록"
        >
          <MCIcons name="bullseye-arrow" size={30} color={'white'} />
        </IconButton>
        <IconButton
          onPress={() => {
            navigation.navigate('Rank');
          }}
          text="랭킹"
        >
          <FA5Icons name="trophy" size={24} color={'white'} />
        </IconButton>
      </View>
    </View>
  );
}
