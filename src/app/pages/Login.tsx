import Contents from '@/components/layouts/Contents';
import Header from '@/components/layouts/Header';
import SubTitle from '@/components/layouts/SubTitle';
import Title from '@/components/layouts/Title';
import { Colors, Fonts, Sizes } from '@/constants/Styles';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import ThemedText from '@/components/theme/ThemedText';
import { useDispatch } from 'react-redux';
import { setUserAction } from '@/stores/userSlice';

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(username, password);
  }, [username, password]);

  const signInHandler = () => {
    console.log('Sign In');
    if (username === '') return;
    dispatch(setUserAction({ username }));
    router.push('/pages/Main');
  };
  const signUpHandler = () => {
    console.log('Sign Up');
  };

  return (
    <>
      <Header />
      <Title>GooApp</Title>
      <SubTitle />
      <Contents>
        <View style={styles.form}>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder='Username'
              autoCapitalize='none'
              onChangeText={setUsername}
              style={styles.textInput}
            />
            {/* <TextInput
              placeholder='Password'
              autoCapitalize='none'
              onChangeText={setPassword}
              style={styles.textInput}
            /> */}
          </View>
          <View style={styles.btnsContainer}>
            <Pressable onPress={signInHandler} style={styles.signIn}>
              <ThemedText style={styles.signInText}>Sign In</ThemedText>
            </Pressable>
            {/* <Pressable onPress={signUpHandler} style={styles.signUp}>
              <ThemedText style={styles.signUpText}>Sign Up</ThemedText>
            </Pressable> */}
          </View>
        </View>
      </Contents>
    </>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: Sizes.defaultPadding,
  },
  textInputContainer: {
    flex: 1,
    width: '100%',
    gap: 20,
  },
  textInput: {
    width: '100%',
    height: 80,
    backgroundColor: 'white',
    borderRadius: 20,
    fontSize: Fonts.subTitle,
    paddingLeft: 20,
  },
  btnsContainer: {
    flex: 1,
    width: '100%',
    gap: 10,
  },
  signIn: {
    width: '100%',
    height: Sizes.buttonHeight,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.highlight,
  },
  signInText: { color: 'white', fontSize: Fonts.bigText },
  signUp: {
    alignItems: 'center',
  },
  signUpText: {
    fontSize: Fonts.subTitle,
    color: 'white',
  },
});
