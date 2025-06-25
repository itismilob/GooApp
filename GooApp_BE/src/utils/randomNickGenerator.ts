import fs from 'fs';
import path from 'path';

/**
 * 랜덤 닉네임을 생성해주는 함수
 * @returns string
 */
export default function randomNickGenerator() {
  // json 파일 불러옴
  const adjectivesPath = path.join(__dirname, 'consts', 'adjectives.json');
  const animalsPath = path.join(__dirname, 'consts', 'animals.json');

  const adjectives: string[] = JSON.parse(
    fs.readFileSync(adjectivesPath, 'utf-8'),
  );
  const animals: string[] = JSON.parse(fs.readFileSync(animalsPath, 'utf-8'));

  const randA = Math.floor(Math.random() * adjectives.length);
  const randB = Math.floor(Math.random() * animals.length);

  const randomNick = adjectives[randA] + animals[randB];

  return randomNick;
}
