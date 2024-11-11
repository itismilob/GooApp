import { Fonts, Sizes } from '@/constants/Styles';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
import ThemedText from '../theme/ThemedText';

interface GoMainBtnProps {
  children?: null | JSX.Element | string;
}

export default function HomeBtn({ children }: GoMainBtnProps) {
  const router = useRouter();

  const homeBtnHandler = () => {
    router.back();
  };

  return (
    <View style={styles.goMainBtn}>
      <Pressable style={styles.button} onPress={homeBtnHandler}>
        <Entypo name='chevron-left' size={30} color='white' />
        {/* <Text style={styles.buttonText}>{'home'}</Text> */}
      </Pressable>
      {typeof children == 'string' ? (
        <ThemedText style={styles.text}>{children}</ThemedText>
      ) : (
        <View>{children}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  goMainBtn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: Fonts.default,
    // backgroundColor: 'red',
    paddingHorizontal: Sizes.defaultPadding,
  },
  button: { flexDirection: 'row' },
  buttonText: {
    color: 'white',
    fontSize: Fonts.default,
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
    fontSize: Fonts.subTitle,
    fontWeight: 'bold',
  },
});
