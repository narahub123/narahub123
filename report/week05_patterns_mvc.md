# 🧭 프로그래밍 아키텍처 패턴 비교

## MVC, MVP, MVVM 패턴의 구조와 특징

---

### ✅ MVC

- Model + View + Controller를 합친 용어

**구조**

![MVC 패턴 구조](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2F7IE8f%2FbtqBRvw9sFF%2FAAAAAAAAAAAAAAAAAAAAADyozKU_PSiY0oJauHy6zZ2tha--rlkJYVjN88rRwZp7%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1753973999%26allow_ip%3D%26allow_referer%3D%26signature%3DfS0grk7II7jzMZ%252Bezj7YDaGlBX0%253D)

- **Model**: 애플리케이션의 데이터와 비즈니스 로직을 담당
- **View**: 사용자에게 보여지는 UI, Model을 관찰하여 상태 변경을 UI에 반영 (옵저버 패턴 활용)
  - 옵저버 패턴: 하나의 객체 상태(Model 또는 ViewModel)가 변경되면, 이를 구독한 View에 자동으로 알림을 보내 UI를 갱신하는 방식
- **Controller**: 사용자 입력을 받아 Model을 변경하고 View를 선택하는 중재자

**동작 순서**

1. 사용자의 액션이 Controller에 전달됨
2. Controller는 해당 액션에 따라 Model을 변경
3. View는 Model을 관찰하고, 변경이 감지되면 자동으로 갱신

**특징**

- Controller는 여러 View를 선택할 수 있음 (1:N 구조)
- View와 Model 간에 의존성이 존재함

**장점**

- 구조가 단순하여 이해하기 쉬움
- 널리 사용되는 보편적인 아키텍처

**단점**

- View와 Model 간의 결합도가 높아 유지보수가 어려움

---

### ✅ MVP

- Model + View + Presenter를 합친 용어

**구조**

![MVP 패턴의 구조](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FclZlsT%2FbtqBTLzeUCL%2FAAAAAAAAAAAAAAAAAAAAAEj5hgkLq8E0rGqA67oZwK6FBf0KejyGtCATgRsFSud2%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1753973999%26allow_ip%3D%26allow_referer%3D%26signature%3Dbbrw0xvwNpNJ1tThaoR%252FQEL3Uv4%253D)

- **Model**: 데이터 및 비즈니스 로직 담당
- **View**: 사용자에게 보여지는 UI, 인터페이스를 통해 Presenter와 통신
  - View 인터페이스: Presenter가 View를 제어하기 위해 호출하는 함수들의 집합으로, View는 이 인터페이스를 구현하여 Presenter와 느슨하게 결합됨
- **Presenter**: View의 입력을 받아 Model을 조작하고 결과를 다시 View에 전달

**동작 순서**

1. 사용자의 액션이 View에 전달됨
2. View는 Presenter에 해당 요청을 전달
3. Presenter는 Model에 데이터를 요청 또는 갱신
4. Model이 처리된 데이터를 Presenter에 반환
5. Presenter는 View 인터페이스를 통해 데이터를 전달하고 UI를 갱신

**특징**

- Presenter는 View와 Model 인스턴스를 모두 참조
- View는 Presenter의 인터페이스만 의존함 (낮은 결합도)
- Presenter와 View는 1:1 관계

**장점**

- View와 Model 간의 결합도 없음
- 단위 테스트 용이 (View를 인터페이스로 대체 가능)

**단점**

- Presenter가 View 로직을 모두 담당하기 때문에 규모가 커지면 복잡도 증가

---

### ✅ MVVM

- Model + View + ViewModel을 합친 용어

**구조**

![MVVM 패턴의 구조](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FCiXz0%2FbtqBQ1iMiVT%2FAAAAAAAAAAAAAAAAAAAAAMAUo6cTyfFfrEbWesYtP50ZAyZvSGcW9JCqfIxF9Xfr%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1753973999%26allow_ip%3D%26allow_referer%3D%26signature%3DPaGAU8VDhi7%252BbgiwLmdVUizxmP8%253D)

- **Model**: 데이터와 비즈니스 로직 처리
- **View**: 사용자와 직접 상호작용하는 UI
- **ViewModel**: View를 위한 데이터와 로직을 보유. Model로부터 데이터를 받아 변형하고 View와 바인딩

**동작 순서**

1. 사용자의 액션이 View에 발생
2. View는 Command 패턴 등을 통해 ViewModel에 이벤트를 전달
3. ViewModel은 필요한 데이터를 Model에 요청
4. Model은 ViewModel에 데이터를 반환
5. ViewModel은 데이터를 가공하여 자신의 상태에 저장
6. View는 ViewModel과 바인딩되어 자동으로 화면 갱신

**특징**

- Data Binding과 Command 패턴을 활용

  - Data Binding: View와 ViewModel 간 상태를 자동으로 동기화하는 기술 (양방향 또는 단방향)

  - Command 패턴: View에서 발생한 사용자 액션을 ViewModel에 전달하는 구조화된 방식 (이벤트 위임)

- View ↔ ViewModel 간 양방향 바인딩 (프레임워크에 따라 단방향일 수도 있음)
- View와 ViewModel은 서로 명시적 참조 없이 연결됨 (낮은 결합도)
- ViewModel과 View는 1:N 구조

**장점**

- View와 Model의 완전한 분리 가능
- 테스트 용이성 및 모듈화 용이
- View 로직이 ViewModel로 이동하여 코드 재사용 가능

**단점**

- ViewModel의 설계가 복잡하며, 학습 곡선이 존재
- 바인딩 시스템이 없는 환경에서는 구현 난이도 증가

---

## 참고

- [디자인 패턴 MVC, MVP, MVVM 비교](https://beomy.tistory.com/43)
- [MVC-MVP-MVVM 패턴의 특징](https://velog.io/@blucky8649/MVC-MVP-MVVM-%ED%8C%A8%ED%84%B4%EC%9D%98-%ED%8A%B9%EC%A7%95)
