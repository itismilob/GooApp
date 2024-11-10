import Contents from '@/components/layouts/Contents';
import Header from '@/components/layouts/Header';
import SubTitle from '@/components/layouts/SubTitle';
import Title from '@/components/layouts/Title';
import HomeBtn from '@/components/navigation/HomeBtn';
import { Colors, Fonts, Sizes } from '@/constants/Styles';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { setTotalQuizAction } from '@/stores/inGameSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/store';

export default function Difficulty() {
  const router = useRouter();
  const dispatch = useDispatch();

  const buttonHandler = (totalQuiz: number) => {
    dispatch(setTotalQuizAction({ totalQuiz }));
    router.replace('/pages/Game');
  };

  return (
    <>
      <Header>
        <HomeBtn />
      </Header>
      <Title>Difficulty</Title>
      <SubTitle>Select one</SubTitle>
      <Contents>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              buttonHandler(20);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>x20</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              buttonHandler(50);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>x50</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              buttonHandler(100);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>x100</Text>
          </TouchableOpacity>
        </View>
      </Contents>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 5,
    alignItems: 'center',
    width: '100%',
    gap: 30,
  },
  button: {
    width: '100%',
    height: Sizes.buttonHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.highlight,
    borderRadius: Sizes.buttonRadius,
  },
  buttonText: {
    fontSize: Fonts.bigText,
    color: 'white',
  },
});
