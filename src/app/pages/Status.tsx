import Contents from '@/components/layouts/Contents';
import Header from '@/components/layouts/Header';
import ListLine from '@/components/ListLine';
import SubTitle from '@/components/layouts/SubTitle';
import Title from '@/components/layouts/Title';
import HomeBtn from '@/components/navigation/HomeBtn';

import { Colors, Fonts, Sizes } from '@/constants/Styles';
import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STATUS_KEY, StatusData } from '@/constants/Types';

import ThemedText from '@/components/theme/ThemedText';

type StatusArray = [string, { count: number; mean: number }][];

export default function Status() {
  const [statusArray, setStatusArray] = useState<StatusArray>([]);
  const [totalMean, setTotalMean] = useState<number>(0);

  const getStatus = async () => {
    // await AsyncStorage.clear();
    const json = await AsyncStorage.getItem(STATUS_KEY);
    if (!json) return;
    const result: StatusData = await JSON.parse(json);

    const sortedStatusArray: StatusArray = Object.entries(result)
      .sort((a, b) => b[1].mean - a[1].mean)
      .map((data) => {
        const quiz = data[0];
        const mean = data[1].mean;
        const count = data[1].count;
        return [quiz, { mean, count }];
      });

    setStatusArray(sortedStatusArray);

    // total mean
    const mean =
      sortedStatusArray.reduce((acc, data) => {
        return acc + data[1].mean;
      }, 0) / sortedStatusArray.length;
    setTotalMean(mean);
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <>
      <Header>
        <HomeBtn>Status</HomeBtn>
      </Header>
      <Title>Username</Title>
      <SubTitle>{`Total Mean : ${totalMean.toFixed(2)}s`}</SubTitle>
      <Contents>
        <View style={styles.statusContentsContainer}>
          <View style={styles.statusContents}>
            <View style={styles.scrollTitleNLine}>
              <View style={styles.scrollTitleContainer}>
                <ThemedText bold style={styles.scrollTitle}>
                  Multiple
                </ThemedText>
                <ThemedText bold style={styles.scrollTitle}>
                  Mean
                </ThemedText>
              </View>
              <ListLine />
            </View>
            <ScrollView style={styles.scrollView}>
              {statusArray.length !== 0 ? (
                statusArray.map((status, i) => (
                  <View key={status[0]} style={styles.scrollContentContainer}>
                    <View style={styles.ScrollContentTextContainer}>
                      <ThemedText style={styles.ScrollContentText}>
                        {status[0]}
                      </ThemedText>
                      <ThemedText style={styles.ScrollContentText}>
                        {`${status[1].mean.toFixed(2)}s`}
                      </ThemedText>
                    </View>
                    {i != statusArray.length - 1 && <ListLine />}
                  </View>
                ))
              ) : (
                <ThemedText style={styles.nullStatus}>
                  No Status. Please play game
                </ThemedText>
              )}
            </ScrollView>
          </View>
        </View>
      </Contents>
    </>
  );
}

const styles = StyleSheet.create({
  statusContentsContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: Sizes.defaultPadding,
  },
  statusContents: {
    flex: 1,
    // height: '100%',
    backgroundColor: Colors.highlight,
    marginBottom: 20,
    borderRadius: 40,
    paddingTop: 30,
    paddingBottom: 20,
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
  nullStatus: {
    color: 'white',
    fontSize: Fonts.default,
    textAlign: 'center',
  },
});
