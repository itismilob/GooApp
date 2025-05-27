import { Pressable, Text, View } from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DefaultNavigatorParams } from '@/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import DefaultButton from '@/components/DefaultButton';
import TitleText from '@/components/TitleText';
import HeaderButton from '@/components/HeaderButton';
import { useEffect, useState } from 'react';
import { userDataType } from '@/types/dataTypes';
import { getLocalStorage } from '@/stores/mmkvStorage';

export default function Home() {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'Home'
  >;
  const navigation = useNavigation<NavigationProp>();
  const LocalStorage = getLocalStorage();

  const [userData, setUserData] = useState<userDataType>();

  const getUserData = () => {
    const userDataString = LocalStorage.getString('userData');
    if (userDataString) setUserData(JSON.parse(userDataString));
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View>
      <Text>GooApp</Text>
      <Text>{userData?.nickname}</Text>

      <DefaultButton
        className="bg-green-700"
        onPress={() => {
          navigation.navigate('Tutorial');
        }}
      >
        <TitleText size={30} className="color-white">
          퍼즐
        </TitleText>
      </DefaultButton>

      <Pressable
        onPress={() => {
          navigation.navigate('Record');
        }}
      >
        <Text>기록</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate('Rank');
        }}
      >
        <Text>랭크</Text>
      </Pressable>
    </View>
  );
}
