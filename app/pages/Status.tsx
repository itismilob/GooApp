import Contents from '@/components/layouts/Contents';
import Header from '@/components/layouts/Header';
import ListLine from '@/components/ListLine';
import SubTitle from '@/components/layouts/SubTitle';
import Title from '@/components/layouts/Title';
import HomeBtn from '@/components/navigation/HomeBtn';

import { Colors, Fonts } from '@/constants/Styles';
import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

type StatusData = {
  mul: string;
  speed: Float;
};

export default function Status() {
  const [statusData, setStatusData] = useState<StatusData[]>([
    { mul: '2 X 2', speed: 22.22 },
    { mul: '2 X 2', speed: 22.22 },
    { mul: '2 X 2', speed: 22.22 },
    { mul: '2 X 2', speed: 22.22 },
    { mul: '2 X 2', speed: 22.22 },
    { mul: '2 X 2', speed: 22.22 },
    { mul: '2 X 2', speed: 22.22 },
    { mul: '2 X 2', speed: 22.22 },
    { mul: '2 X 2', speed: 22.22 },
    { mul: '2 X 2', speed: 22.22 },
    { mul: '2 X 2', speed: 22.22 },
    { mul: '2 X 2', speed: 22.22 },
    { mul: '2 X 2', speed: 22.22 },
    { mul: '2 X 2', speed: 22.22 },
    { mul: '2 X 2', speed: 22.22 },
    { mul: '2 X 2', speed: 22.22 },
    { mul: '2 X 2', speed: 22.22 },
    { mul: '2 X 2', speed: 22.22 },
  ]);

  return (
    <>
      <Header>
        <HomeBtn>Status</HomeBtn>
      </Header>
      <Title>22.22s</Title>
      <SubTitle>Total Mean</SubTitle>
      <Contents>
        <View style={styles.statusContents}>
          <View style={styles.scrollTitleNLine}>
            <View style={styles.scrollTitleContainer}>
              <Text style={styles.scrollTitle}>Multiple</Text>
              <Text style={styles.scrollTitle}>Mean</Text>
            </View>
            <ListLine />
          </View>
          <ScrollView style={styles.scrollView}>
            {statusData.length !== 0 &&
              statusData.map((status, i) => (
                <View key={i} style={styles.scrollContentContainer}>
                  <View style={styles.ScrollContentTextContainer}>
                    <Text style={styles.ScrollContentText}>{status.mul}</Text>
                    <Text style={styles.ScrollContentText}>
                      {status.speed}s
                    </Text>
                  </View>
                  {i != statusData.length - 1 && <ListLine />}
                </View>
              ))}
          </ScrollView>
        </View>
      </Contents>
    </>
  );
}

const styles = StyleSheet.create({
  statusContents: {
    flex: 1,
    // height: '100%',
    width: '100%',
    backgroundColor: Colors.highlight,
    marginBottom: 20,
    borderRadius: 40,
    paddingVertical: 30,
  },
  scrollTitleNLine: {
    paddingHorizontal: 30,
  },
  scrollTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  scrollTitle: {
    color: 'white',
    fontSize: Fonts.default,
    fontWeight: 'bold',
  },
  scrollView: {
    marginTop: 10,
    paddingHorizontal: 30,
  },
  scrollContentContainer: {},
  ScrollContentTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  ScrollContentText: { color: 'white', fontSize: Fonts.default },
});
