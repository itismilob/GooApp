import Contents from '@/components/layouts/Contents';
import HomeBtn from '@/components/navigation/HomeBtn';
import Header from '@/components/layouts/Header';
import ListLine from '@/components/ListLine';
import SubTitle from '@/components/layouts/SubTitle';
import Title from '@/components/layouts/Title';
import { Colors, Fonts } from '@/constants/Styles';
import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import ThemedText from '@/components/theme/ThemedText';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/store';

type rankData = {
  rank: number;
  username: string;
  mean: number;
};

type rankDataDict = {
  userData?: rankData;
  topData?: rankData[];
};

type rankByType = {
  [rankType: number]: rankDataDict;
};

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function Rank() {
  const rankTypeArray = [20, 50, 100];
  const userData = useSelector((state: RootState) => state.userData);

  const [rankData, setRankData] = useState<rankByType>({});

  const fetchData = async () => {
    for (let i = 0; i < rankTypeArray.length; i++) {
      // get Top Rank
      await fetch(
        `${SERVER_URL}/rank?gametype=${rankTypeArray[i]}&username=${userData.username}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then((response) => {
          if (response.status === 404) {
            return Promise.resolve(null);
          }
          return response.json();
        })
        .then((data) => {
          if (data === null) {
            console.log('topRank', null);
            return;
          }
          console.log('topRank', data);

          setRankData((prev) => {
            const temp: rankByType = { ...prev };
            if (temp[rankTypeArray[i]]) {
              temp[rankTypeArray[i]].topData = data;
            } else {
              temp[rankTypeArray[i]] = { topData: data };
            }
            return temp;
          });
        })
        .catch((error) => {
          console.error('Get Top Rank Error:', error);
        });

      // get User Rank
      await fetch(
        `${SERVER_URL}/rank/user?gametype=${rankTypeArray[i]}&username=${userData.username}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then((response) => {
          if (response.status === 404) {
            return Promise.resolve(null);
          }
          return response.json();
        }) // 응답을 JSON 형태로 변환
        .then((data) => {
          if (data === null) {
            console.log('userRank', null);
            return;
          }
          console.log('userRank', data);

          setRankData((prev) => {
            const temp: rankByType = { ...prev };
            if (temp[rankTypeArray[i]]) {
              temp[rankTypeArray[i]].userData = data;
            } else {
              temp[rankTypeArray[i]] = { userData: data };
            }
            return temp;
          });
        })
        .catch((error) => {
          console.error('Get User Rank Error:', error);
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const rankView = (type: number, i: number) => {
    const rankDict = rankData[type];
    if (!rankDict) return;

    return (
      <View key={i} style={styles.rankTypeContainer}>
        <Title>{`x${type}`}</Title>
        <SubTitle>
          {rankDict.userData ? (
            <View style={styles.userRank}>
              <View style={styles.rowCenter}>
                <ThemedText bold style={styles.userRankText}>
                  {`${rankDict.userData.rank}`}
                </ThemedText>
                <ThemedText style={{ ...styles.userRankText, fontSize: 20 }}>
                  {`${rankDict.userData.username}`}
                </ThemedText>
              </View>
              <ThemedText bold style={styles.userRankText}>
                {`${rankDict.userData.mean.toFixed(2)}s`}
              </ThemedText>
            </View>
          ) : (
            <ThemedText bold style={styles.userRankText}>
              User Rank Null
            </ThemedText>
          )}
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
              {rankList(rankDict.topData)}
            </ScrollView>
          </View>
        </Contents>
      </View>
    );
  };

  const rankList = (topData: rankData[] | undefined) => {
    if (!topData || topData.length === 0)
      return (
        <View style={styles.ScrollContentTextContainer}>
          <ThemedText bold style={styles.ScrollContentText}>
            Rank Null
          </ThemedText>
        </View>
      );

    return topData.map((data, i) => (
      <View key={i} style={styles.scrollContentContainer}>
        <View style={styles.ScrollContentTextContainer}>
          <View style={styles.rowCenter}>
            <ThemedText bold style={styles.ScrollContentText}>
              {`${data.rank}`}
            </ThemedText>
            <ThemedText style={styles.ScrollContentText}>
              {data.username}
            </ThemedText>
          </View>
          <ThemedText bold style={styles.ScrollContentText}>
            {`${data.mean.toFixed(2)}s`}
          </ThemedText>
        </View>
        {i !== topData.length - 1 && <ListLine />}
      </View>
    ));
  };

  return (
    <>
      <Header>
        <HomeBtn>Rank</HomeBtn>
      </Header>
      <View style={styles.rankTypeScrollView}>
        <ScrollView horizontal pagingEnabled>
          {Object.keys(rankData).map((type, i) => rankView(parseInt(type), i))}
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
