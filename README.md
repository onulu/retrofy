# Enhancify: AI 기반 이미지 향상 도구

## 프로젝트 개요

AI 기반 이미지 향상 도구.
사용자가 이미지를 업로드하고 다양한 AI 기반 향상 기술을 적용할 수 있는 웹 기반 애플리케이션입니다.
이 도구는 고급 AI 모델과 반응형 및 직관적인 React 프론트엔드의 통합을 보여주며, AI 기능과 현대적인 웹 개발 실습을 모두 선보입니다.

## 기능

- 이미지 업로드 및 미리보기
- 레트로 옵션:
  - 디더링 (Dithering)
  - 글리치 효과 (VHS Glitch Effect)
  - Halftone / Comic Print Effect
  - Film Grain
- 실시간 향상 미리보기 (전/후 비교 슬라이더)
- 다중 향상 기능 조합 가능
- 향상된 이미지 다운로드

## 기술 스택

- 프론트엔드:
  - React
  - React-Router

- 백엔드:
  - Python
  - FastAPI
  - OpenCV (이미지 처리)

## 프로젝트 구조

```text
image-enhancement-tool/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
├── backend/
│   ├── app.py
│   ├── models/
│   └── requirements.txt
├── README.md
└── docker-compose.yml
```

## 작동 방식

1. 사용자가 드래그 앤 드롭 인터페이스를 통해 이미지 업로드
2. 이미지가 미리보기 영역에 표시됨
3. 사용자가 원하는 필터 옵션 선택
4. 경량 필터의 경우 TensorFlow.js가 클라이언트 측에서 이미지 처리
5. 더 복잡한 필터의 경우 이미지가 백엔드 API로 전송됨
6. 적용된 이미지가 원본과 함께 비교 표시됨
7. 사용자가 옵션을 조정하고 실시간 업데이트 확인 가능
8. 사용자가 향상된 이미지 다운로드 가능

## API 엔드포인트

..

## 향후 개선 사항

- 다중 이미지 일괄 처리 기능 추가
- 특수 향상을 위한 더 고급 AI 모델 통합
- 대형 이미지 처리 성능 최적화
- 모바일 지원 추가로 기기에서 직접 이미지 촬영 및 향상 가능

## 기여

기여는 언제나 환영합니다! Pull Request를 자유롭게 제출해 주세요.
