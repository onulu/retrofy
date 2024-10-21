# Retrofy: backend

이 프로젝트는 rye로 관리되며 별도의 가상환경 activation이 필요하지 않다.

## add a package

```shell
rye add <package>
```

## 설치 후 싱크 맞추기

```shell
rye sync
```

## 웹서버 실행하기

```shell
rye uvicorn main:app --reload
```

## 디버그 모드로 실행하고

```shell
rye run uvicorn app.main:app --reload --log-level debug
```
