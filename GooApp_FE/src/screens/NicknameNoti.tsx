import { Pressable, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DefaultNavigatorParams } from '../types/navigationTypes';
import { useNavigation } from '@react-navigation/native';

export default function NicknameNoti() {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'NicknameNoti'
  >;
  const navigation = useNavigation<NavigationProp>();

  return (
    <View>
      <Text>당신은...</Text>
      <Text>멋있는 파랑 청설모</Text>
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
