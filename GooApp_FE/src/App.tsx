import * as React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import './global.css';

import { DefaultNavigator } from './navigation/DefaultNavigation';
const Navigation = createStaticNavigation(DefaultNavigator);

export default function App() {
  return <Navigation />;
}
