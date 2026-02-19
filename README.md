<div align="center">
  <img src="https://github.com/user-attachments/assets/e4c80d40-054b-4584-82ad-03cb8fee5294" width="100%" alt="Taskify Banner" />
</div>


## 🚀 Taskify: 스마트 협업 스케줄링 대시보드
**"함께 관리하고, 더 스마트하게 협업하는 스케줄링 대시보드"**

Taskify는 가족, 동료, 친구 등 다양한 커뮤니티가 목표를 공유하고 할 일을 효율적으로 관리할 수 있도록 돕는 대시보드 기반 협업 툴입니다. 
복잡한 일정 관리를 시각적인 카드로 구성하여 누구나 쉽게 워크플로우를 파악할 수 있도록 설계되었습니다.

## ❓선택 이유

복잡한 데이터 관계와 상태 관리가 필요한 고난도 프로젝트를 통해 프론트엔드 개발자로서의 기술적 한계에 도전하고 문제 해결 능력을 증명하고자 합니다. 
실무 수준의 워크플로우를 직접 구현하며 코드의 완성도를 높이는 데 집중하여, 팀원 모두가 기술적 깊이를 보여줄 수 있는 강력한 포트폴리오를 구축하고자 선택했습니다.

## 🛠 테크 스펙 
🔗 **[상세 테크 스펙 확인하기 (Notion)](https://www.notion.so/Teskify-Tech-Spec-3011833f6e7f80828380d92b80ae3820)**

## 🤝 협업 및 이슈 관리
- **Jira**: 스프린트 단위(1~3주차)로 일감을 관리하고 전체 프로젝트 일정 조율
- **Git Workflow**: Jira에서 생성한 이슈 번호를 기반으로 브랜치를 생성하고, 작업 완료 후 PR 연결
- **Code Review**: 팀 내부 PR 템플릿을 활용하여 일관된 형식의 코드 리뷰 진행

<div align="center">
  <img src="https://github.com/user-attachments/assets/69369ba9-dcce-43c9-9891-0360c1b073ec" width="32%" />
  <img src="https://github.com/user-attachments/assets/2075c913-e46f-4b85-a00b-12b30dd37031" width="32%" />
  <img src="https://github.com/user-attachments/assets/5a77c241-5d3a-43c6-9d58-9284da01f9b2" width="32%" />
</div>


## 🛠 기술 스택

### ⚙️ 프레임워크 & 상태 관리
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React Query](https://img.shields.io/badge/React%20Query-FF4154?style=flat-square&logo=reactquery&logoColor=white)

### 🎨 스타일링
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![React Hot Toast](https://img.shields.io/badge/React%20Hot%20Toast-FF4B4B?style=flat-square&logo=react&logoColor=white)
![React Datepicker](https://img.shields.io/badge/React%20Datepicker-217355?style=flat-square&logo=react&logoColor=white)

### 📝 폼 & 유효성 검사
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=white)

### 🚀 배포 & 데이터 통신
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)

### 🤝 협업 & 관리
![Jira](https://img.shields.io/badge/Jira-0052CC?style=flat-square&logo=jira&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=flat-square&logo=notion&logoColor=white)

## 📸 서비스 화면 (Screenshots)
- (추가 예정)

## ⚡ 성능 및 경험 최적화
- **무한 스크롤 적용 (Intersection Observer)** : 대량의 데이터 렌더링 시 성능 저하 방지 및 메모리 사용량 최적화 - (임지환)
- **웹폰트 최적화** : woff2 포맷 활용 및 CSS 변수화를 통한 번들 크기 감소 및 렌더링 일관성 확보 - [#PR-24](https://github.com/Mobee-414/21-Sprint-2Team_Taskify/pull/24) (조아라)
- **이미지 리소스 관리** : Object URL 자원 해제 로직을 통한 브라우저 메모리 누수 방지 및 안정성 강화 - [#PR-16](https://github.com/Mobee-414/21-Sprint-2Team_Taskify/pull/16) (조아라)
- **공통 UI 컴포넌트 설계** : Input, Modal, Toast 등 고도화된 컴포넌트 라이브러리 구축으로 중복 코드 제거 및 번들 크기 최적화 - [#PR-12](https://github.com/Mobee-414/21-Sprint-2Team_Taskify/pull/12) (조아라)

## ✨ 서비스 개선
- **토스트 시스템 구축**: 사용자 행동에 따른 즉각적인 피드백 제공으로 서비스 신뢰도 향상 - [#PR-57](https://github.com/Mobee-414/21-Sprint-2Team_Taskify/pull/57) (조아라)
- **데이터 해시 기반 자동 컬러링**: 태그 텍스트 기반 자동 색상 계산 로직으로 시각적 일관성 확보 및 편의성 증대 - [#PR-16](https://github.com/Mobee-414/21-Sprint-2Team_Taskify/pull/16) (조아라)
- **통합 입력 가이드 (Input Group)**: Input, Label, Error Message 통합으로 명확한 안내 및 접근성 개선 - [#PR-10](https://github.com/Mobee-414/21-Sprint-2Team_Taskify/pull/10) (조아라)
- **확인(Confirm) 모달 시스템**: 중요 동작 전 사용자 확인 절차를 공용화하여 데이터 손실 위험 방지 및 UX 통일 - [#PR-11](https://github.com/Mobee-414/21-Sprint-2Team_Taskify/pull/11) (조아라)
- **SEO 및 공유 최적화**: 오픈그래프(OG Tag) 및 파비콘 설정을 통해 검색 엔진 노출 및 유입률 향상 - [#PR-49](https://github.com/Mobee-414/21-Sprint-2Team_Taskify/pull/49) (조아라)

## 👥 팀원 소개

<table>
<tr>
<td align="center"><img src="https://avatars.githubusercontent.com/u/238636914?v=4" width="150px;" alt="박인규"/><br /><b>박인규</b></td>
<td align="center"><img src="https://avatars.githubusercontent.com/u/205582694?v=4" width="150px;" alt="임지환"/><br /><b>임지환</b></td>
<td align="center"><img src="https://avatars.githubusercontent.com/u/143992699?v=4" width="150px;" alt="조아라"/><br /><b>조아라</b></td>
<td align="center"><img src="https://avatars.githubusercontent.com/u/236540667?v=4" width="150px;" alt="주평안"/><br /><b>주평안</b></td>
</tr>
<tr>
<td>
• 대시보드 메인 페이지<br />
• 칼럼 추가/수정 페이지<br />
• 칼럼 추가/수정 모달<br />
• 공용 베이스 모달 컴포넌트
</td>
<td>
• 메인 랜딩 페이지<br />
• 나의 대시보드 페이지<br />
• 대시보드 생성/수정 페이지<br />
• 대시보드 생성/삭제 모달<br />
• 공용 드롭다운 컴포넌트
</td>
<td>
• 할 일 상세/생성/수정 페이지<br />
• 카드 상세/생성/수정 모달<br />
• 표준 Form 컴포넌트 시스템<br />
• 공용 확인 모달 & 토스트<br />
• 전역 스타일 및 SEO 설정
</td>
<td>
• 로그인, 회원가입 페이지<br />
• 계정 관리 페이지<br />
• 로그아웃, 계정 삭제 모달<br />
• 공용 버튼 컴포넌트
</td>
</tr>
</table>
