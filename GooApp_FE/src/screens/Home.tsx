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

      <View>
        <DefaultButton
          className="bg-green-700"
          onPress={() => {
            navigation.navigate('Tutorial');
          }}
        >
          <TitleText size={30}>퍼즐</TitleText>
        </DefaultButton>

        <DefaultButton
          className="bg-green-700"
          onPress={() => {
            navigation.navigate('Record');
          }}
        >
          <TitleText size={30}>기록</TitleText>
        </DefaultButton>
        <DefaultButton
          className="bg-green-700"
          onPress={() => {
            navigation.navigate('Rank');
          }}
        >
          <TitleText size={30}>랭킹</TitleText>
        </DefaultButton>
      </View>
    </View>
  );
}
