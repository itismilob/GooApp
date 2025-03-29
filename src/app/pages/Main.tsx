import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Sizes } from '@/constants/Styles';
import { useEffect, useState } from 'react';

import Title from '@/components/layouts/Title';
import Header from '@/components/layouts/Header';
import SubTitle from '@/components/layouts/SubTitle';
import Contents from '@/components/layouts/Contents';
import { useRouter } from 'expo-router';
import ThemedText from '@/components/theme/ThemedText';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserData = async () => {
  try {
    const result = await AsyncStorage.getItem('username');
    return result;
  } catch (error) {
    return '';
  }
};

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

  useEffect(() => {
    (async () => {
      const result = await getUserData();
      if (result) setUserName(result);
    })();
  }, []);

  return (
    <>
      <Header />
      <Title>GooApp</Title>
      <SubTitle>{userName}</SubTitle>
      <Contents>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={startBtnHandler}>
            <ThemedText style={styles.buttonText}>Game Start</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={statusBtnHandler}>
            <ThemedText style={styles.buttonText}>Status</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={rankBtnHandler}>
            <ThemedText style={styles.buttonText}>Rank</ThemedText>
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
    paddingHorizontal: Sizes.defaultPadding,
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
