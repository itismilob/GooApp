import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Sizes } from '@/constants/Styles';
import { useState } from 'react';

import Title from '@/components/layouts/Title';
import Header from '@/components/layouts/Header';
import SubTitle from '@/components/layouts/SubTitle';
import Contents from '@/components/layouts/Contents';
import { useRouter } from 'expo-router';

export default function Main() {
  const router = useRouter();

  const [userName, setUserName] = useState<string>('User Name');
  const startBtnHandler = () => {
    router.push('/pages/Difficulty');
  };
  const statusBtnHandler = () => {
    router.push('/pages/Status');
  };
  const rankBtnHandler = () => {
    router.push('/pages/Rank');
  };

  return (
    <>
      <Header />
      <Title>GooApp</Title>
      <SubTitle>{userName}</SubTitle>
      <Contents>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={startBtnHandler}>
            <Text style={styles.buttonText}>Game Start</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={statusBtnHandler}>
            <Text style={styles.buttonText}>Status</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={rankBtnHandler}>
            <Text style={styles.buttonText}>Rank</Text>
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
