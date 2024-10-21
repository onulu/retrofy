# Retrofy: OpenCV-based image filter tool that transforms photos into retro-style images.

## 프로젝트 개요

OpenCV 기반 이미지 효과 웹앱.
이미지에 다양한 레트로 느낌의 AI 기반 향상 기술을 적용할 수 있는 웹 기반 애플리케이션.


## 기능

- 이미지 업로드 및 미리보기
- 레트로 옵션:
  - 디더링 (Dithering)
  - 글리치 효과 (VHS Glitch Effect)
- 실시간 향상 미리보기 (전/후 비교 슬라이더)
- 아웃풋 이미지 설정 및 다운로드:
  - 사이즈
  - 포맷
  - 퀄리티

## 기술 스택

- 프론트엔드:
  - React (Vite)

- 백엔드:
  - Python
  - FastAPI (API)
  - OpenCV (이미지 처리)

## 프로젝트 구조

```text
Repo/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/
│   └── app.py
└── README.md
```

## API 엔드포인트

- `/dithering`: floyd-steinberg 혹은 bayer 디더링 적용
- `/glitch`: glitch 효과 적용
- `/halftone`: halftone 효과 적용 (https://github.com/GravO8/halftone)
