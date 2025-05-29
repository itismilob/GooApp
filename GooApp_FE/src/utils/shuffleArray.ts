// 배열을 랜덤으로 섞어주는 함수 Fisher–Yates Shuffle (피셔–예이츠 셔플) 알고리즘
export default function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // 0 <= j <= i
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]]; // swap
  }
  return newArr;
}
