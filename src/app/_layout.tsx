import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        HostGrotesk: require('@/assets/fonts/HostGrotesk.ttf'),
        HostGroteskBold: require('@/assets/fonts/HostGroteskBold.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // 로딩 스크린 등을 추가 가능
  }

  return <Stack screenOptions={{ headerShown: false }}></Stack>;
}
