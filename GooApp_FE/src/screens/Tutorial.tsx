import { Pressable, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DefaultNavigatorParams } from '@/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import TitleText from '@/components/TitleText';

import Tutorial1 from '../assets/images/tutorial1.svg';
import Tutorial2 from '../assets/images/tutorial2.svg';
import Frame from '../assets/images/frame.svg';

import { Dimensions } from 'react-native';
import { useEffect, useState } from 'react';

export default function Tutorial() {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'Tutorial'
  >;
  const navigation = useNavigation<NavigationProp>();

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [next, setNext] = useState<boolean>(false);

  return (
    <Pressable
      onPress={() => {
        if (next) navigation.replace('Puzzle');
        else setNext(true);
      }}
      className="flex-1 bg-default-green"
    >
      <Frame height={windowHeight} width={windowWidth} />
      <View className=" flex-1 w-full h-full absolute bg-transparent-dark">
        {next === false ? (
          <Tutorial1 height={windowHeight} width={windowWidth} />
        ) : (
          <Tutorial2 height={windowHeight} width={windowWidth} />
        )}
      </View>
      <TitleText size={30} className="text-center w-full absolute bottom-10">
        확인
      </TitleText>
    </Pressable>
  );
}
