# RESTful API의 개념과 설계

## RESTful API란?

- **REST(Representational State Transfer)** 아키텍처 스타일을 따르는 웹 API
- 웹의 자원을 HTTP URI로 표현하고, HTTP 메서드를 통해 해당 자원에 대한 작업을 수행하는 방식의 API

## REST(Representational State Transfer)

- **REST(Representational State Transfer)**는 웹 상의 자원을 이름(URI)으로 표현하고, HTTP 표준 메서드를 통해 자원의 상태를 주고받는 아키텍쳐 스타일

### REST의 구성

**자원(Resource) - URI**

- 모든 자원에 고유한 ID가 존재하고, 이 자원은 Server에 존재함
- 자원을 구분하는 ID는 `/orders/order_id/1` 와 같은 HTTP URI 임

**행위(Verb) - HTTP Method**

- HTTP 프로토콜의 Method를 사용함
- `GET`, `POST`, `PUT`, `PATCH`, `DELETE` 등

**표현 (Representation of Resource)**

- Client가 자원의 상태(정보)에 대한 조작을 요청하면 Server는 이에 적절한 응답(Representation)을 보냄
- REST에서 하나의 자원은 JSON, XML, TEXT, RSS등의 여러 형태로 나타낼 수 있음

## REST 원칙 및 HTTP 메서드

### REST 원칙

**클라이언트 - 서버 구조**

- 클라이언트는 유저와 관련된 처리를, 서버는 REST API를 제공함으로써 각각의 역할을 확실하게 구분하고 일괄적인 인터페이스로 분리되어 작동할 수 있게 함
  ⇒ 서로 간의 의존성 축소
- REST Server : API를 제공하고 비즈니스 로직 처리 및 저장을 책임짐
- Client: 사용자 인증이나 Context(세션, 로그인 정보) 등을 직접 관리하고 책임짐

**무상태성(StateLess)**

- HTTP의 특성을 이용하기 때문
- 서버에서 어떤 작업을 하기 위해 상태 정보를 기억할 필요 없고 들어온 요청에 대해 처리만 해주면 되기 때문에 구현이 쉽고 단순함

**캐시 처리 가능(Cacheable)**

- 캐시 사용을 통해 응답 시간이 빨라지고 REST Server 트랜잭션이 발생하지 않기 때문에 전체 응답 시간, 성능, 자원 이용률을 향상 시킬 수 있음

**자체 표현 구조(Self-descriptiveness)**

- JSON을 이용한 메시지 포멧을 이용하여 직관적으로 이해할 수 있고 REST API 메시지만으로 그 요청이 어떤 행위를 하는지 알 수 있음

**계층화(Layered System)**

- 클라이언트와 서버가 분리되어 있기 때문에 중간에 **프록시 서버, 암호화 계층 등 중간매체를 사용**할 수 있어 자유도가 높다

**유니폼 인터페이스(Uniform)**

- Uniform Interface는 Http 표준에만 따른다면 모든 플랫폼에서 사용이 가능하며, URI로 지정한 리소스에 대한 조작을 가능하게 하는 아키텍쳐 스타일을 말한다
- URI로 지정한 Resource에 대한 조작을 통일되고 한정적인 인터페이스로 수행 ⇒ 특정 언어나 기술에 종속되지 않음

### HTTP 메서드

| 메서드 | 설명             | 예시              |
| ------ | ---------------- | ----------------- |
| GET    | 리소스 조회      | `GET /posts`      |
| POST   | 리소스 생성      | `POST /posts`     |
| PUT    | 리소스 전체 수정 | `PUT /posts/1`    |
| PATCH  | 리소스 일부 수정 | `PATCH /posts/1`  |
| DELETE | 리소스 삭제      | `DELETE /posts/1` |

## RESTful 엔드포인트 설계 방법

| 원칙                                   | 예시                                     |
| -------------------------------------- | ---------------------------------------- |
| **명사 사용 (복수형)**                 | `/users`, `/posts`                       |
| **계층 구조 표현**                     | `/posts/{postId}/comments`               |
| **슬래시(`/`)는 계층 표현용**          | `/categories/123/items`                  |
| **소문자 + 하이픈 사용**               | `/product-reviews`, `/user-profile`      |
| **동사 대신 HTTP 메서드로 행위 표현**  | `DELETE /users/1` (❌ `/users/delete/1`) |
| **정렬/필터링/검색은 쿼리스트링**      | `/posts?sort=desc&page=2`                |
| **동작/명령은 명확한 동사형 리소스로** | `/users/1/activate`, `/posts/1/approve`  |

## Express/MongoDB 기반 REST API 예제

```typescript
import { Router } from "express";
import { ObjectId } from "mongodb";
import { MongoDB } from "../mongodb";

const router = Router();

// 글 목록 가져오기
router.get("/", async (req, res) => {
  const posts = await db.collection("posts").find().toArray();

  res.json({ ok: true, body: posts });
});

// 특정 글 가져오기
router.get("/:id", async (req, res) => {
  try {
    const post = await db
      .collection("posts")
      .findOne({ _id: new ObjectId(req.params.id) });

    res.json({ ok: true, body: post });
  } catch (e) {
    if (e instanceof Error) res.json({ ok: false, errorMessage: e.message });
  }
});

// 포스트 생성하기
router.post("/", async (req, res) => {
  try {
    const result = await db.collection("posts").insertOne(req.body);
    res.status(201).json(ok: true, body: { _id: result.insertedId, ...req.body });
  } catch (e) {
    if (e instanceof Error) res.json({ ok: false, errorMessage: e.message });
  }
});

// 포스트 수정하기
router.patch("/:id", async (req, res) => {
  try {
    const result = await db
      .collection("posts")
      .findOneAndUpdate(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body },
        { returnDocument: "after" }
      );

    res.json({ok: true, body: result && result});
  } catch (e) {
    if (e instanceof Error) res.json({ ok: false, errorMessage: e.message });
  }
});

// 포스트 삭제하기
router.delete("/:id", async (req, res) => {
  try {
    const result = await db
      .collection("posts")
      .deleteOne({ _id: new ObjectId(req.params.id) });

    res.json({ok: true, id})
  } catch (e) {
    if (e instanceof Error) res.json({ ok: false, errorMessage: e.message });
  }
});
```

### 참고 사이트

[RESTAPI이란](https://velog.io/@somday/RESTful-API-%EC%9D%B4%EB%9E%80)

[RESTful API endpoints 잘 작성하는 법](https://velog.io/@itissteam/restful-api-endpoints-well-written-guide)
