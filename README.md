# Retrofy

OpenCV-based image filter tool that transforms photos into retro-style images.
OpenCV 기반으로 이미지에 다양한 레트로 느낌의 필터를 적용할 수 있는 웹앱.

## 기능

- 이미지 업로드 및 미리보기
- 레트로 옵션:
  - 디더링 (Dithering)
  - Halftone 
  - 글리치 효과 (VHS Glitch Effect)
  - Pixelate
- 실시간 향상 미리보기
- 아웃풋 이미지 설정 및 다운로드:
  - 사이즈
  - 포맷
  - 퀄리티

## 기술 스택

- 프론트엔드:
  - React (Vite)
  - Tailwind(Shadcn-ui), Zustand

- 백엔드:
  - Python
  - FastAPI (API)
  - OpenCV, Numpy, Scikit Learn (이미지 처리)

## 프로젝트 구조

```text
Repo/
├── frontend/
├── backend/
└── README.md
```
