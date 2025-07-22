import { adjectives } from '@/consts/adjectives';
import { animals } from '@/consts/animals';

/**
 * 랜덤 닉네임을 생성해주는 함수
 * @returns string
 */
export default function randomNickGenerator() {
  const randA = Math.floor(Math.random() * adjectives.length);
  const randB = Math.floor(Math.random() * animals.length);

  const randomNick = adjectives[randA] + animals[randB];

  return randomNick;
}
