# 3-Tier Architecture

## 개념

플랫폼을 3계층으로 나누어 별도의 논리적/물리적인 장치에 구축 및 운영하는 형태

![3-Tier Architecture](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FROnrw%2Fbtq7FiGVnhw%2FuLvlYyCZWuMCtIdrF1DEWK%2Fimg.png)

### 데이터 계층

- 데이터를 저장하고 있는 계층
- 데이터베이스와 데이터베이스에 접근하여 데이터를 읽거나 쓰는 것을 관리함

### 어플리케이션 계층

- 데이터를 처리하는 계층
- 클라이언트에서 요청되는 정보를 어떠한 규칙을 바탕으로 처리하고 가공하는 것을 담당함 (동적인 데이터 제공)
- 비즈니스 로직 계층, 트랜잭션 계층
- 미들웨어, 백엔드

### 클라이언트(프레젠테이션) 계층

- 데이터를 표현해주는 계층
- 사용자가 직접 마주하게 되는 계층
- 사용자 인터페이스를 지원, 프론트엔드
- 데이터를 처리하는 로직을 포함하지 않음

## 이점

- **빠른 개발**: 각 계층이 서로 다른 팀에서 동시에 개발될 수 있으므로, 기업은 애플리케이션을 보다 빠르게 시장에 출시할 수 있으며 프로그래머는 각 계층에 최신 및 최상의 언어와 툴을 사용할 수 있음
- **개선된 확장성**: 필요에 따라 어느 계층이든 다른 계층과 독립적으로 확장할 수 있음
- **개선된 신뢰성**: 한 계층의 가동 중단은 다른 계층의 가용성 또는 성능에 별로 영향을 미치지 않음
- **개선된 보안**: 프레젠테이션 계층과 데이터 계층이 직접 통신할 수 없으므로, 잘 설계된 애플리케이션 계층은 내부 방화벽의 일종으로 작동하여 SQL 인젝션 및 기타 악의적 공격을 방지할 수 있음

## 참고 사이트

- [https://jaws-coding.tistory.com/9](https://jaws-coding.tistory.com/9)
- [https://sunrise-min.tistory.com/entry/3-Tier-Architecture-%EC%A0%95%EC%9D%98-%EB%B0%8F-%EA%B5%AC%EC%84%B1%EB%B0%A9%EC%8B%9D](https://sunrise-min.tistory.com/entry/3-Tier-Architecture-%EC%A0%95%EC%9D%98-%EB%B0%8F-%EA%B5%AC%EC%84%B1%EB%B0%A9%EC%8B%9D)
- [https://www.ibm.com/kr-ko/topics/three-tier-architecture](https://www.ibm.com/kr-ko/topics/three-tier-architecture)

---

# CRUD 개념과 웹 흐름

## CRUD란?

**CRUD**는 **Create(생성)**, **Read(읽기)**, **Update(수정)**, **Delete(삭제)**의 약자로,  
소프트웨어 애플리케이션에서 **데이터의 기본적인 처리 동작**을 나타내는 개념.

---

## 기능

- **Create (생성)**  
  새로운 데이터를 시스템에 추가하는 작업  
  예: 회원가입, 게시물 작성, 상품 등록 등

- **Read (조회)**  
  저장된 데이터를 검색하거나 확인하는 작업  
  예: 게시글 목록 보기, 사용자 정보 확인 등

- **Update (수정)**  
  기존 데이터를 변경하거나 일부를 갱신하는 작업  
  예: 프로필 수정, 게시글 내용 수정 등

- **Delete (삭제)**  
  기존 데이터를 시스템에서 제거하는 작업  
  예: 게시글 삭제, 계정 삭제 등

---

## 웹 흐름에서의 CRUD

| 기능   | HTTP 메서드     | 설명                              |
| ------ | --------------- | --------------------------------- |
| Create | `POST`          | 새로운 리소스를 서버에 생성       |
| Read   | `GET`           | 서버에서 데이터를 조회            |
| Update | `PUT` / `PATCH` | 기존 리소스를 전체 또는 일부 수정 |
| Delete | `DELETE`        | 서버의 리소스를 삭제              |
