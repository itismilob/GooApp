import * as React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import './global.css';

import { DefaultNavigator } from './navigation/DefaultNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const Navigation = createStaticNavigation(DefaultNavigator);

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}
