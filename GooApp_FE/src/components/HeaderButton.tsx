import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import StyledText from './StyledText';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DefaultNavigatorParams } from '@/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import TitleText from './TitleText';

interface props {
  // 화면 타이틀
  children: string;
}

export default function HeaderButton({ children }: props) {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'Home'
  >;
  const navigation = useNavigation<NavigationProp>();

  return (
    <View className="px-6 pt-14 pb-4 bg-green-700 flex-row items-center justify-between">
      <TouchableOpacity
        className="w-3"
        onPress={() => {
          navigation.popToTop();
        }}
      >
        <Icon name="angle-left" size={30} color="white" />
      </TouchableOpacity>
      <TitleText size={30}>{children}</TitleText>
    </View>
  );
}
