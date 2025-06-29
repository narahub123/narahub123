# 📡 HTTP Request/Response 구조 정리

## 🧾 HTTP (HyperText Transfer Protocol)

- 웹에서 클라이언트와 서버가 HTML 문서나 리소스를 주고받기 위해 사용하는 통신 프로토콜
- 네트워크 상에서 데이터를 주고받는 형식과 절차를 정의함

---

## 🔼 HTTP Request 구조

### ✅ 1. Start Line

```json
GET /test.html HTTP/1.1
[Method] [Request Target] [HTTP Version]
```

| 항목               | 설명                                                     |
| ------------------ | -------------------------------------------------------- |
| **HTTP Method**    | 요청의 목적을 나타냄 (`GET`, `POST`, `PUT`, `DELETE` 등) |
| **Request Target** | 요청할 리소스 경로                                       |
| **HTTP Version**   | HTTP 프로토콜 버전 (`HTTP/1.1`, `HTTP/2` 등)             |

---

### ✅ 2. Headers

요청에 대한 부가 정보를 담는 부분

```json
Host: example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Accept: text/html
Authorization: Bearer eyJhbGciOi...
Content-Type: application/json
Connection: keep-alive
Cookie: sessionId=abc123
```

| Header            | 설명                                     |
| ----------------- | ---------------------------------------- |
| **Host**          | 요청할 서버의 호스트 이름과 포트 번호    |
| **User-Agent**    | 클라이언트의 정보 (브라우저 종류 등)     |
| **Accept**        | 클라이언트가 처리할 수 있는 콘텐츠 타입  |
| **Authorization** | 인증 토큰 전송 시 사용 (예: Bearer 토큰) |
| **Content-Type**  | 전송할 본문의 타입 지정                  |
| **Connection**    | 연결 상태 유지 (`keep-alive`, `close`)   |
| **Cookie**        | 클라이언트가 가진 쿠키 값 전송           |

---

### ✅ 3. Body

- 요청 데이터가 담기는 부분
- 주로 `POST`, `PUT` 요청에서 사용

```json
{
  "username": "hong",
  "password": "1234"
}
```

## 🔽 HTTP Response 구조

### ✅ 1. Status Line

```json
HTTP/1.1 200 OK
[HTTP Version] [Status Code] [Status Text]
```

| 항목             | 설명                                |
| ---------------- | ----------------------------------- |
| **HTTP Version** | 응답을 보내는 HTTP 프로토콜 버전    |
| **Status Code**  | 요청 처리 결과를 나타내는 숫자 코드 |
| **Status Text**  | 상태 코드에 대한 간단한 설명        |

#### 📌 주요 Status Code

| 상태 코드                   | 의미         | 설명                                  |
| --------------------------- | ------------ | ------------------------------------- |
| `200 OK`                    | 성공         | 요청이 정상적으로 처리됨              |
| `201 Created`               | 생성됨       | 새로운 리소스가 성공적으로 생성됨     |
| `301 Moved Permanently`     | 영구 이동    | 요청한 리소스가 다른 URL로 이동됨     |
| `400 Bad Request`           | 잘못된 요청  | 클라이언트 요청에 문법적 오류가 있음  |
| `401 Unauthorized`          | 인증 필요    | 인증이 필요한 요청이나 누락됨         |
| `403 Forbidden`             | 금지됨       | 서버가 요청을 거부함 (권한 부족 등)   |
| `404 Not Found`             | 찾을 수 없음 | 요청한 리소스를 서버에서 찾을 수 없음 |
| `500 Internal Server Error` | 서버 오류    | 서버 내부에서 알 수 없는 오류 발생    |

---

### ✅ 2. Headers

응답에 대한 부가 정보를 포함

```json
Content-Type: application/json
Set-Cookie: sessionId=xyz456; HttpOnly
Cache-Control: no-cache
```

| Header            | 설명                                                     |
| ----------------- | -------------------------------------------------------- |
| **Content-Type**  | 응답 데이터의 타입 (예: `application/json`, `text/html`) |
| **Set-Cookie**    | 브라우저에 쿠키를 저장하도록 지시                        |
| **Cache-Control** | 캐시 정책 설정 (`no-cache`, `max-age=3600` 등)           |

---

### ✅ 3. Body

- 서버가 클라이언트에 보내는 **실제 데이터**
- HTML, JSON, 이미지 등 다양한 형태일 수 있음
- `GET` 요청에 주로 포함되며, `204 No Content`와 같이 없는 경우도 있음

#### 📌 예시

```json
{
  "id": 1,
  "name": "홍길동",
  "email": "hong@example.com"
}
```
