import Contents from '@/components/layouts/Contents';
import HomeBtn from '@/components/navigation/HomeBtn';
import Header from '@/components/layouts/Header';
import ListLine from '@/components/ListLine';
import SubTitle from '@/components/layouts/SubTitle';
import Title from '@/components/layouts/Title';
import { Colors, Fonts } from '@/constants/Styles';
import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import ThemedText from '@/components/theme/ThemedText';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type StatusData = {
  user: string;
  time: Float;
};

export default function Status() {
  const [statusData, setStatusData] = useState<StatusData[]>([
    { user: 'someone', time: 22.22 },
    { user: 'someone', time: 22.22 },
    { user: 'someone', time: 22.22 },
    { user: 'someone', time: 22.22 },
    { user: 'someone', time: 22.22 },
    { user: 'someone', time: 22.22 },
    { user: 'someone', time: 22.22 },
    { user: 'someone', time: 22.22 },
    { user: 'someone', time: 22.22 },
    { user: 'someone', time: 22.22 },
    { user: 'someone', time: 22.22 },
  ]);

  const rankTypeArray = [20, 50, 100];

  return (
    <>
      <Header>
        <HomeBtn>Rank</HomeBtn>
      </Header>
      <View style={styles.rankTypeScrollView}>
        <ScrollView horizontal pagingEnabled>
          {rankTypeArray.map((type, i) => (
            <View key={i} style={styles.rankTypeContainer}>
              <Title>{`x${type}`}</Title>
              <SubTitle>
                <View style={styles.userRank}>
                  <View style={styles.rowCenter}>
                    <ThemedText bold style={styles.userRankText}>
                      43
                    </ThemedText>
                    <ThemedText
                      style={{ ...styles.userRankText, fontSize: 20 }}
                    >
                      UserName
                    </ThemedText>
                  </View>
                  <ThemedText bold style={styles.userRankText}>
                    43.44s
                  </ThemedText>
                </View>
              </SubTitle>
              <Contents>
                <View style={styles.statusContents}>
                  <View style={styles.scrollTitleNLine}>
                    <View style={styles.scrollTitleContainer}>
                      <ThemedText style={styles.scrollTitle} bold>
                        User
                      </ThemedText>
                      <ThemedText style={styles.scrollTitle} bold>
                        Time
                      </ThemedText>
                    </View>
                    <ListLine />
                  </View>
                  <ScrollView style={styles.scrollView}>
                    {statusData.length !== 0 &&
                      statusData.map((status, i) => (
                        <View key={i} style={styles.scrollContentContainer}>
                          <View style={styles.ScrollContentTextContainer}>
                            <View style={styles.rowCenter}>
                              <ThemedText bold style={styles.ScrollContentText}>
                                {`${i + 1}`}
                              </ThemedText>
                              <ThemedText style={styles.ScrollContentText}>
                                {status.user}
                              </ThemedText>
                            </View>
                            <ThemedText bold style={styles.ScrollContentText}>
                              {`${status.time.toFixed(2)}s`}
                            </ThemedText>
                          </View>
                          {i != statusData.length - 1 && <ListLine />}
                        </View>
                      ))}
                  </ScrollView>
                </View>
              </Contents>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  rankTypeScrollView: { flex: 11 },
  rankTypeContainer: { width: SCREEN_WIDTH, paddingHorizontal: 20 },
  userRank: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  userRankText: { color: 'white', fontSize: Fonts.subTitle },
  rowCenter: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  statusContents: {
    flex: 1,
    width: '100%',
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
});
