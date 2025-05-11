/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
function App(): React.JSX.Element {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyle}>This is Test!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  textStyle: {color: 'red', fontSize: 30, fontWeight: 'bold'},
});

export default App;
