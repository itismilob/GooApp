import * as React from 'react';
import { View, Text } from 'react-native';
import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Button } from '@react-navigation/elements';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from './types/navigationTypes';

function HomeScreen() {
  type NavigationProp = NativeStackNavigationProp<RootStackParams, 'Home'>;
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        onPress={() => {
          navigation.navigate('Details');
        }}
      >
        Go to Details
      </Button>
    </View>
  );
}

type DetailsScreenProps = NativeStackScreenProps<RootStackParams, 'Details'>;

function DetailsScreen({ route }: DetailsScreenProps) {
  type NavigationProp = NativeStackNavigationProp<RootStackParams, 'Details'>;
  const navigation = useNavigation<NavigationProp>();

  let pageID = '';
  if (route.params) {
    pageID = route.params.pageID;
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>{pageID}</Text>
      <Button
        onPress={() => {
          navigation.setParams({
            pageID: 'Changed!',
          });
        }}
      >
        Change pageID
      </Button>
      <Button
        onPress={() => {
          navigation.navigate('Home');
        }}
      >
        Go to Home
      </Button>
      <Button
        onPress={() => {
          navigation.navigate('Details', { pageID: 'Details38902' });
        }}
      >
        Go to Details
      </Button>
      <Button
        onPress={() => {
          navigation.push('Details', { pageID: 'Details4802' });
        }}
      >
        Go to Details again...
      </Button>
      <Button
        onPress={() => {
          navigation.goBack();
        }}
      >
        Go back
      </Button>
      <Button
        onPress={() => {
          navigation.popTo('Home');
        }}
      >
        Go back to Home
      </Button>
      <Button
        onPress={() => {
          navigation.popToTop();
        }}
      >
        Go first screen
      </Button>
    </View>
  );
}

const RootStack = createNativeStackNavigator<RootStackParams>({
  initialRouteName: 'Home',
  screenOptions: {
    headerStyle: { backgroundColor: 'tomato' },
  },
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        title: 'Overview',
      },
    },
    Details: { screen: DetailsScreen, initialParams: { pageID: '29809' } },
  },
});

import DefaultNavigation from './navigation/DefaultNavigation';
const Navigation = createStaticNavigation(DefaultNavigation());

export default function App() {
  return <Navigation />;
}
