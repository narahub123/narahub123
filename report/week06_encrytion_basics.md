# 📚 자료보호와 암호화 기술의 원리

- 4대 목표 : 기밀성, 무결성, 인증, 부인 방지

## ✅ 해싱(Hashing)

### ✔️ 해싱이란?

- 원본 문자열을 알아볼 수 없는 난해한 문자열로 변환하는 과정
- 입력값을 고정된 길이의 해시값으로 변환하는 단방향 함수
- 복호화가 불가능하며, 데이터가 조금만 바뀌어도 완전히 다른 결과값이 나옴 

![해싱](http://t1.daumcdn.net/brunch/service/user/JqQ/image/j8JjVY40SDOhbixF1lQTsypQWYU.png)

### ✔️ 사용 목적

- 데이터가 변조되지 않았는지 확인하는 **무결성 검증** 목적
- 비밀번호 저장 
- 디지털 서명에 사용 
- 암호화와 해싱의 차이
  - **암호화** : 데이터를 숨기는 목적
  - **해싱** : 변조 여부를 확인하는 목적
    ![해싱 vs 암호화](http://t1.daumcdn.net/brunch/service/user/JqQ/image/8gKd86CpPDcMrVKPnjXLJaXenb4)

### ✔️ 특징

- 동일한 문자열 → 동일한 해시값
- 다른 문자열 → 다른 해시값
- 원본이 조금만 달라도 해시값은 크게 달라짐
- 해시값만으로 원본을 알 수 없음
- **충돌(Collision)** 가능성 존재
  - 서로 다른 입력이 같은 해시값을 가질 가능성
  - 안전한 해시 함수일수록 충돌 발생 가능성은 극히 낮음

### ✔️ 비밀번호 저장에 사용되는 안전한 해시 함수 예시

- `bcrypt`, `PBKDF2`, `scrypt`, `Argon2`
  - 연산을 고의로 느리게 하여 무차별 대입 공격 방어

### ✔️ 대표 해시 알고리즘

- **MD 시리즈** : MD4, MD5, MD6 _(보안상 사용 권장되지 않음)_
- **SHA 시리즈** : SHA-1, SHA-2, SHA-3
- **RIPEMD**, **Whirlpool**

---

## ✅ 암호화란?

- 평문을 추가 정보(키)와 함께 암호화 알고리즘으로 인코딩하는 과정
- 암호화된 데이터(암호문)는 키를 통해 복호화 가능

---

## ✅ 대칭키 암호화 (Symmetric-key Encryption)

![대칭키 암호화](https://velog.velcdn.com/images/octo__/post/09810353-a7c0-4d9a-b02a-2986d568b872/image.png)

### ✔️ 특징

- **하나의 키**로 암호화와 복호화를 모두 수행
- 속도가 빠르고 대용량 데이터에 적합

### ✔️ 단점

- 키 분배가 어렵고 키 관리에 취약
- 보안을 위해 주기적인 키 교체 필요
- 부인방지 기능 없음

### ✔️ 대표적인 암호 방식

- **블록 암호 (Block Cipher)**

  - 고정된 크기의 블록 단위로 암호화
  - 운용 모드(Operation Mode)에 따라 암호화 방법이 달라짐
    - **ECB** (Electronic Codebook) : 동일한 평문 → 동일한 암호문 _(패턴 노출 위험)_
    - **CBC** (Cipher Block Chaining) : 이전 암호문과 XOR 후 암호화 _(보안성 향상)_
    - **CTR**, **GCM** 등

- **스트림 암호 (Stream Cipher)**
  - 평문 비트와 키스트림 비트의 XOR 연산으로 암호화

### ✔️ 대표 알고리즘

- **AES (Advanced Encryption Standard)**
- **DES / 3DES** _(현재는 보안상 사용 권장되지 않음)_
- **ChaCha20**

---

## ✅ 비대칭키 암호화 (Asymmetric-key Encryption)

![비대칭키 암호화](https://velog.velcdn.com/images/octo__/post/f564a411-c5b8-461d-9427-6f16acc3bec9/image.png)

### ✔️ 특징

- 서로 다른 **공개키/개인키**를 사용
- 키 분배와 관리가 용이
- 기밀성, 무결성, 부인방지 기능 제공
- 대칭키에 비해 속도는 느림

### ✔️ 키 사용 방법

- **공개키로 암호화 → 개인키로 복호화** (기밀성)
- **개인키로 서명 → 공개키로 검증** (무결성, 부인방지)

### ✔️ 대표 알고리즘

- **RSA** : 대표적인 공개키 기반 암호화 알고리즘
- **Diffie-Hellman** : 키 교환 알고리즘
- **ECC (Elliptic Curve Cryptosystem)** : 짧은 키로 높은 보안성, 모바일·IoT 환경에 적합

### ✔️ 하이브리드 암호화

- 비대칭키로 대칭키를 안전하게 전달
- 실제 데이터 암호화는 속도가 빠른 대칭키로 처리
- 예시 : **HTTPS / TLS 프로토콜**

---

## ✅ 참고 사이트

- https://brunch.co.kr/@sangjinkang/32
- https://velog.io/@octo__/대칭키와-공개키비대칭키
