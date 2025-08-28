## GooApp - 구구단을 외워보아요!

> **새롭게** 구구단을 외우거나 **외우는 속도**를 높이고 싶은 사람들을 위한, **쉽고 빠르게 반복적**으로 풀 수 있는 퀴즈와 다른 사용자들 과의 **경쟁**을 통해서 **간편하게** 구구단을 외울 수 있는 서비스입니다.

- 개발 기간 : 2025/3 ~ 2025/8
- 개인 프로젝트
- 목적 : 구구단을 외우기 시작한 초등학교 저학년 학생들이 한글로된 구구단 앱을 사용할 수 있게 하는것, 다른 앱과는 차별화된 빠른 속도와 반복을 하며 다른 사람과도 경쟁해 더 흥미롭게 구구단을 외울 수 있게 하는것이 이 앱을 제작하게된 목적입니다.
- 배포 링크 : [GooApp - Google Play](https://play.google.com/store/apps/details?id=com.gooapp_fe)

### 목표

- 📌 React Native를 사용하여 Android 앱을 만들어 Google Play에 배포하기
- 📌 Express를 사용하여 백앤드 서버를 만들어 AWS EC2를 이용해 배포하기
- 📌 MVP 기능 완성 ([MVP 확인하기 →](https://pollen-mule-b30.notion.site/MVP-1d599c14c73480e68617ee540f7e2bd1))

### 소개 핵심 기능

#### 퍼즐

<img src="./resources/puzzle_record.gif" style="max-width:300px"/>

- 간단한 구구단 퍼즐로 2x2 좌우 버튼을 짝지어 정답을 맞출 수 있습니다.
- 20초의 짧은 제한시간동안 플레이하고 곳바로 반복적으로 플레이 할 수 있어서 간편하게 구구단을 외우도록 했습니다.
- 퍼즐이 끝나면 점수를 보여주고, 사용자 본인의 최고기록과 다른 유저들의 랭킹과 비교하게 만들어 더 높은 점수를 위해 반복하도록 만들었습니다.

#### 랭킹

<img src="./resources/rank_record.gif" style="max-width:300px"/>

- 다른 사용자와 최고점수를 비교햐여 랭킹을 매기도록 했습니다.
- 인터넷이 연결되지 않을 경우 작동하지 않고 알림을 띄우도록 했습니다.

#### 기록

<img src="./resources/record.png" style="max-width:300px"/>

- 사용자 본인의 기록들을 저장하여 언제든 확인할 수 있습니다.
- 최고기록을 바로 확인하여 더 높은 기록을 위해 퍼즐을 플레이 하도록 만들었습니다.

---

### 아키텍쳐

<img src="./resources/GooApp_diagram.png" style="max-width:300px"/>

- Frontend
  - ReactNative로 Android 앱을 개발해 Google Play에 배포한다.
- Backend
  - Express 서버를 PM2를 사용해 멀티프로세스로 실행시킨다.
  - AWS EC2를 통해서 배포하고 Nginx를 통해 리버스 프록시를 했다.
  - GitHub Actions를 통해서 main 브랜치를 자동 배포 했다.
- DB
  - MongoDB Atlas를 사용하여 배포 없이 클라우드로 연결할 수 있게 했다.

### 기술 스택

| 구분       | 기술 스택                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Common     | <img src="https://img.shields.io/badge/Typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/ESLint-4B3263?style=flat&logo=eslint&logoColor=white" /> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=Prettier&logoColor=white" /> <img src="https://img.shields.io/badge/dotenv-ecd53f?style=flat&logo=dotenv&logoColor=white" />                                                                                       |
| FrontEnd   | <img src="https://img.shields.io/badge/ReactNative CLI-%2320232a.svg?style=flat&logo=React&logoColor=%2361DAFB" /> <img src="https://img.shields.io/badge/Nativewind-06B6D4.svg?style=flat&logo=tailwindcss&logoColor=white" /> <img src="https://img.shields.io/badge/Zustand-716257?style=flat&logo=zustand&logoColor=white" /> <img src="https://img.shields.io/badge/MMKV-%2320232a?style=flat" /> <img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&logo=Axios&logoColor=white" /> |
| BackEnd    | <img src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=express&logoColor=white" /> <img src="https://img.shields.io/badge/Express Validator-6b00b1.svg?style=flat&logo=express&logoColor=white" /> <img src="https://img.shields.io/badge/Morgan-000000.svg?style=flat&logoColor=white" /> <img src="https://img.shields.io/badge/PM2-2B037A.svg?style=flat&logo=PM2&logoColor=white" />                                                                                              |
| DB         | <img src="https://img.shields.io/badge/MongoDB Atlas-47A248.svg?style=flat&logo=mongodb&logoColor=white" />                                                                                                                                                                                                                                                                                                                                                                                              |
| Deployment | <img src="https://img.shields.io/badge/AWS EC2-%23FF9900.svg?style=flat&logo=amazon-aws&logoColor=white" /> <img src="https://img.shields.io/badge/NGINX-%23009639.svg?style=flat&logo=nginx&logoColor=white" /> <img src="https://img.shields.io/badge/GitHub%20Actions-%232671E5.svg?style=flat&logo=githubactions&logoColor=white" />                                                                                                                                                                 |
| Others     | <img src="https://img.shields.io/badge/Notion-ffffff.svg?style=flat&logo=notion&logoColor=black" /> <img src="https://img.shields.io/badge/Postman-FF6C37.svg?style=flat&logo=postman&logoColor=white" /> <img src="https://img.shields.io/badge/Figma-black.svg?style=flat&logo=figma&logoColor=white" />                                                                                                                                                                                               |

### terms & conditions

© 2025 Itismilob. All rights reserved.  
This project is intended solely for use in the GooApp application.

[Privacy Policy](https://doc-hosting.flycricket.io/gooapp-privacy-policy/9d3374e1-cfac-450b-9181-96b72e3ec92f/privacy) [Terms of Use](https://doc-hosting.flycricket.io/gooapp-terms-of-use/5ac19f3d-074f-4412-9b99-ea28c2c7314c/terms)
