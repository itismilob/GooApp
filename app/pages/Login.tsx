import Contents from '@/components/layouts/Contents';
import Header from '@/components/layouts/Header';
import SubTitle from '@/components/layouts/SubTitle';
import Title from '@/components/layouts/Title';
import { Colors, Fonts, Sizes } from '@/constants/Styles';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import ThemedText from '@/components/theme/ThemedText';

export default function Login() {
  const [user, setUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    console.log(user, password);
  }, [user, password]);

  const signInHandler = () => {
    console.log('Sign In');
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
              autoCapitalize='none'
              onChangeText={setUser}
              style={styles.textInput}
            ></TextInput>
            <TextInput
              autoCapitalize='none'
              onChangeText={setPassword}
              style={styles.textInput}
            ></TextInput>
          </View>
          <View style={styles.btnsContainer}>
            <Pressable onPress={signInHandler} style={styles.signIn}>
              <ThemedText style={styles.signInText}>Sign In</ThemedText>
            </Pressable>
            <Pressable onPress={signUpHandler} style={styles.signUp}>
              <ThemedText style={styles.signUpText}>Sign Up</ThemedText>
            </Pressable>
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
  },
  textInputContainer: {
    flex: 1,
    width: '100%',
    gap: 20,
  },
  textInput: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    borderRadius: 20,
    fontSize: Fonts.default,
    paddingLeft: 10,
  },
  btnsContainer: {
    flex: 1,
    width: '100%',
    gap: 10,
  },
  signIn: {
    width: '100%',
    height: 60,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.highlight,
  },
  signInText: { color: 'white', fontSize: Fonts.default, fontWeight: 'bold' },
  signUp: {
    alignItems: 'center',
  },
  signUpText: {
    fontSize: Fonts.smallText,
    color: 'white',
  },
});
