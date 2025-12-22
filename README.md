이 저장소의 README는 프로젝트 실행 방법과 전체 구조를 빠르게 파악하기 위한 문서입니다.
과제 요구사항을 어떻게 해석했고, 어떤 기준으로 구현했는지에 대한 내용은 **ASSIGNMENT.md**에 정리되어 있습니다.

# 과제 설명

티켓팅 대기열 + 결제 플로우를 만드는 과제입니다. 사용자는 이벤트 티켓을 예매합니다. (24시간 이내 구현)

## 필수 요구사항

티켓 목록 → 티켓 상세 → 대기열 (필요 시) → 좌석 선택 → 완료의 플로우로 구성됩니다.

## 티켓 목록 페이지

- 티켓 목록들을 출력합니다.
- 티켓 항목을 클릭하면 해당 티켓 상세 페이지로 이동합니다.

## 티켓 상세 페이지

- 티켓의 상세 이미지, 상세 설명, 좌석 가격 등을 출력합니다.
- 입장 버튼이 존재하며, 이를 클릭하면
  - 입장 토큰을 발급받습니다.
  - 대기열이 있을 경우 대기열 입장 페이지로 이동합니다. 그렇지 않을 경우 바로 좌석 선택 페이지로 이동합니다.

## 대기열 페이지

- 대기열 진행률(0–100%)을 보여줍니다.
- 대기열이 해소되었을 경우 좌석 선택 페이지로 이동합니다.

## 좌석 선택 페이지

- 만약 발급된 입장 토큰을 조회했을 때, 대기열에 있는 토큰이라면 대기열 입장 페이지로 리다이렉션합니다.
- 대기열 통과 후 제한 시간 1분 내에 내 좌석을 선택하지 않으면 만료 처리합니다.

## 예약 완료 페이지

선택한 좌석, 가격을 출력하고 끝냅니다.

## API

API는 MSW(Mock Service Worker)를 이용하여 모킹되어 있습니다. 아래에 정리된 API 명세를 참고해 기능을 구현해주세요.

정확한 MSW 모킹 동작을 확인할 필요가 있다면, `src/mocks/handlers.ts`를 참고해주세요.

### 티켓 목록

#### GET /api/tickets

- Request: (none)
- Response 200

```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "image": "string",
      "price": 0,
      "totalSeats": 0,
      "availableSeats": 0,
      "eventDate": "YYYY-MM-DD",
      "venue": "string"
    }
  ]
}
```

### 티켓 상세

#### GET /api/tickets/:id

- Request Params: `id: string`
- Response 200

```json
{ "success": true, "data": { /_ Ticket _/ } }
```

- Response 404

```json
{ "success": false, "message": "티켓을 찾을 수 없습니다." }
```

### 토큰 발급

#### POST /api/tickets/:id/enter

- Request Params: `id: string`
- Request Body: (none)
- Response 200

```json
{
  "success": true,
  "data": {
    "tokenId": "string",
    "hasQueue": true,
    "expiresAt": 1730000000000
  }
}
```

- Response 404

```json
{ "success": false, "message": "티켓을 찾을 수 없습니다." }
```

### 대기열 상태 조회

#### GET /api/queue/:tokenId

- Request Params: `tokenId: string`
- Response 200

```json
{
  "success": true,
  "data": {
    "token": {
      "id": "string",
      "ticketId": "string",
      "status": "waiting|ready|expired",
      "position": 0,
      "totalInQueue": 0,
      "expiresAt": 1730000000000,
      "createdAt": 1730000000000
    },
    "queueStatus": {
      "position": 0,
      "totalInQueue": 0,
      "progress": 0,
      "estimatedWaitTime": 0
    }
  }
}
```

- Response 404

```json
{ "success": false, "message": "유효하지 않은 토큰입니다." }
```

- Response 410

```json
{ "success": false, "message": "토큰이 만료되었습니다." }
```

### 좌석 목록

#### GET /api/tickets/:id/seats

- Request Params: `id: string`
- Response 200

```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "row": "A",
      "number": 1,
      "price": 0,
      "isAvailable": true
    }
  ]
}
```

### 좌석 확정 (예약 확정)

#### POST /api/reservations

- Request Body

```json
{ "tokenId": "string", "seatId": "string" }
```

- Response 200

```json
{
  "success": true,
  "data": {
    "id": "string",
    "ticketId": "string",
    "seatId": "string",
    "price": 0,
    "status": "completed",
    "expiresAt": 1730000000000,
    "createdAt": 1730000000000
  }
}
```

- Response 404

```json
{ "success": false, "message": "유효하지 않은 토큰입니다." }
```

// or

```json
{ "success": false, "message": "좌석을 찾을 수 없습니다." }
```

- Response 410 (토큰 만료)

```json
{ "success": false, "message": "토큰이 만료되었습니다." }
```

- Response 400 (대기중/이미 예약됨)

```json
{ "success": false, "message": "아직 대기열에 있습니다." }
```

// or

```json
{ "success": false, "message": "이미 예약된 좌석입니다." }
```

### 예약 상세 (필요한 경우에만 쓰세요)

#### GET /api/reservations/:id

- Request Params: `id: string`
- Response 200

```json
{
  "success": true,
  "data": {
    "reservation": { /_ Reservation _/ },
    "ticket": { /_ Ticket _/ },
    "seat": { /_ Seat _/ }
  }
}
```

- Response 404

```json
{ "success": false, "message": "예약을 찾을 수 없습니다." }
```

## 구현 시 유의사항

- shadcn과 같은 UI 라이브러리를 사용하거나 기본 HTML 태그만을 이용해 개발해주세요.
- 에러 메시지, 버튼 활성화 여부 등은 실시간으로 반응하도록 해주세요.
- 시간 절약을 위해 필요에 따라 자주 사용하던 써드파티 라이브러리를 설치하여 사용하는 것을 권장합니다.
- TypeScript 기반의 프로젝트로, 타입 건전성을 지키는 방향으로 코드를 작성해주세요.
