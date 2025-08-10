# CORS 정책과 웹 보안 기본 개념

## 웹 보안의 기본 걔념 : SOP(Same-Origin Policy)

### 개념

- 웹 브라우저는 기본적으로 SOP라는 보안 정책을 따름
- SOP는 웹 페이지가 자신과 동일한 출처에서만 리소스를 요청할 수 있도록 제한함
- **출처(Origin)**의 구성 요소
  - **프로토콜(Protocol)/스키마(Scheme)** : http:// 또는 https://
  - **호스트 이름(Hostname)** : www.example.com
  - **포트 번호(Port)** : 8080
- 구성 요소 중 하나라도 다르면 다른 출처로 간주됨

### CORS의 필요성

- 현대 웹 애플리케이션은 다양한 API와의 상호작용할 필요가 있는 모든 리소스를 동일한 출처에서 제공하지 않음
- AJAX 같은 비동기 요청에서 다른 출처의 리소스를 사용할 수 있는 방법의 필요성이 대두됨

## CORS(Cross-Origin Resource Sharing)

### 개념

- 웹 브라우저에서 서로 다른 출처(Origin) 간의 리소스 공유를 제어하는 보안 정책
- 웹 애플리케이션이 다른 출처의 리소스를 요청할 때 CORS는 해당 요청이 허용되는지 여부를 결정함

### 동작 방식

- CORS는 웹 서버가 어떤 출처에서 요청을 허용할지 결정하기 위해 HTTP 헤더를 설정함

  - Access-Control-Allow-Origin: 허용된 출처를 지정합니다. 예: https://www.example.com

  - Access-Control-Allow-Methods: 허용된 HTTP 메서드를 지정합니다. 예: GET, POST
  - Access-Control-Allow-Headers: 허용된 요청 헤더를 지정합니다. 예: Content-Type
  - Access-Control-Allow-Credentials: 자격 증명(쿠키, 인증 헤더 등)의 포함 여부를 지정합니다. 예: true

### 요청 방식

#### Simple Request

- 서버 상태를 조회하기 위한 간단한 요청 (GET, HEAD 등 )

#### Preflight Request

- CORS (교차 출처 리소스 공유) 정책을 따르는 브라우저에서, 실제 요청을 보내기 전에 서버의 허용 여부를 확인하기 위해 OPTIONS 메서드를 사용해 보내는 HTTP 요청
- 서버 상태를 변경할 수 있는 요청(POST, PUT 등).
- 브라우저가 서버에 사전 검증(OPTIONS) 요청을 보냄
- Preflight 요청 흐름
  1. 브라우저가 OPTIONS 요청 (Preflight) 전송
  2. 서버가 Preflight 요청 응답
  3. 브라우저가 실제 요청 전송
  4. 서버가 실제 요청 응답

### Express에서의 CORS 설정

```typescript
// CORS 설정 (클라이언트와 서버 간의 크로스 도메인 요청을 허용)
app.use(
  cors({
    origin: process.env.BASE_URL, // Access-Control-Allow-Origin 헤더 설정
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Access-Control-Allow-Methods 헤더 설정
    allowedHeaders: ["Content-Type", "Authorization"], // Access-Control-Allow-Headers 헤더 설정
    credentials: true, // Access-Control-Allow-Credentials: true 설정
  })
);
```

참고 사이트

- [웹 보안을 위한 정책, CORS?](https://fabric0de.tistory.com/31)
- [CORS(교차 출처 리소스 공유)](https://docs.tosspayments.com/resources/glossary/cors)
