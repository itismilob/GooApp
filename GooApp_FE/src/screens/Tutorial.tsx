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
import checkboxLocalStore from '@/stores/checkboxStore';
import { useShallow } from 'zustand/react/shallow';

export default function Tutorial() {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'Tutorial'
  >;
  const navigation = useNavigation<NavigationProp>();

  // 화면 크기
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  // 다음 화면이 있는지 확인
  const [next, setNext] = useState<boolean>(false);

  // checkbox 데이터 (튜토리얼 봤는지 확인용)
  const [checkbox, setCheckbox] = checkboxLocalStore(
    useShallow(state => [state.checkbox, state.setCheckbox]),
  );

  useEffect(() => {
    // 튜토리얼을 봤는지 확인
    if (checkbox.doneTutorial) {
      navigation.replace('Puzzle');
    }
  }, []);

  return (
    <View className="flex-1 bg-default-green">
      <Frame height={windowHeight} width={windowWidth} />
      <View className="flex-1 w-full h-full absolute bg-transparent-dark">
        {next === false ? (
          <Tutorial1 height={windowHeight} width={windowWidth} />
        ) : (
          <Tutorial2 height={windowHeight} width={windowWidth} />
        )}
      </View>
      <Pressable
        onPress={() => {
          if (next) {
            setCheckbox({ ...checkbox, doneTutorial: true });
            navigation.replace('Puzzle');
          } else setNext(true);
        }}
        className="absolute w-full h-full p-default align-bottom justify-end"
      >
        <TitleText size={30} className="text-center">
          확인
        </TitleText>
      </Pressable>
    </View>
  );
}
