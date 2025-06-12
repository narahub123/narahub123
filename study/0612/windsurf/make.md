# 오늘의 영단어 학습 앱

## 프로젝트 개요
영어 단어 학습을 위한 웹 애플리케이션입니다. API를 통해 단어를 가져와 표시하고, 사용자가 단어를 학습하고 관리할 수 있습니다.

## 주요 기능
- 20개의 영단어 무작위 표시
- 단어 클릭 시 상세 정보 팝업
- 단어 발음 듣기 기능
- 학습 완료 체크 기능 (체크 시 취소선 표시)
- API 연결 실패 시 기본 단어 목록 제공

## 기술 스택
- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5.3.0
- Web Speech API

## 실행 방법
1. VS Code Live Server 확장 프로그램을 사용하여 실행
   - VS Code에서 index.html을 열고
   - Live Server 확장 프로그램을 실행

2. 또는 로컬 웹 서버를 사용하여 실행
   - Python 3.x 사용 시:
     ```bash
     python -m http.server 8000
     ```
     브라우저에서 http://localhost:8000 접속

## 브라우저 지원
- Chrome (권장)
- Firefox
- Safari
- Edge

## 참고사항
- Web Speech API는 브라우저 지원이 필요합니다
- 인터넷 연결이 필요합니다 (API 호출)
- API 연결 실패 시에도 기본 단어 목록으로 학습 가능
- 모바일 환경에서도 최적화되어 있습니다
