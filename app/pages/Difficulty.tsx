import Contents from "@/components/layouts/Contents";
import Header from "@/components/layouts/Header";
import SubTitle from "@/components/layouts/SubTitle";
import Title from "@/components/layouts/Title";
import HomeBtn from "@/components/navigation/HomeBtn";
import { Colors, Fonts, Sizes } from "@/constants/Styles";
import { decrement, increment } from "@/stores/counterSlice";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useDispatch, useSelector } from "react-redux";

export default function Difficulty() {
  const router = useRouter();
  const buttonHandler = (num: number) => {
    router.replace("/pages/Game");
  };

  const count = useSelector((state) => state.counter.value);
  const dispath = useDispatch();

  return (
    <>
      <Header>
        <HomeBtn />
      </Header>
      <Title>Difficulty</Title>
      <SubTitle>Select one</SubTitle>
      <Contents>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              dispath(increment());
            }}
          >
            <Text>increase</Text>
          </TouchableOpacity>
          <Text>{count}</Text>
          <TouchableOpacity
            onPress={() => {
              dispath(decrement());
            }}
          >
            <Text>decrease</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              buttonHandler(20);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>x20</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              buttonHandler(50);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>x50</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              buttonHandler(100);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>x100</Text>
          </TouchableOpacity>
        </View>
      </Contents>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 5,
    alignItems: "center",
    width: "100%",
    gap: 30,
  },
  button: {
    width: "100%",
    height: Sizes.buttonHeight,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.highlight,
    borderRadius: Sizes.buttonRadius,
  },
  buttonText: {
    fontSize: Fonts.bigText,
    color: "white",
  },
});
