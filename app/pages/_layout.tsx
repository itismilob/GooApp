import { Colors } from "@/constants/Styles";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import "react-native-reanimated";

import { Provider } from "react-redux";
import store from "@/stores/store";

export default function PagesLayout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: styles.background,
        }}
      ></Stack>
    </Provider>
  );
}

const styles = StyleSheet.create({
  background: {
    paddingHorizontal: 20,
    backgroundColor: Colors.background,
  },
});
