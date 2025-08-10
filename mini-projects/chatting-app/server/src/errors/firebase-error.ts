import { CustomAPIError } from "../errors";

export class FirebasePermissionDeniedError extends CustomAPIError {
  constructor(
    message: string = "권한이 없습니다.",
    code: string = "PERMISSION_DENIED",
    type: "logic" | "database" = "database"
  ) {
    super(message, 403, code, type);
  }
}

export class FirebaseNotFoundError extends CustomAPIError {
  constructor(
    message: string = "데이터를 찾을 수 없습니다.",
    code: string = "NOT_FOUND",
    type: "logic" | "database" = "database"
  ) {
    super(message, 404, code, type);
  }
}

export class FirebaseAlreadyExistsError extends CustomAPIError {
  constructor(
    message: string = "이미 존재하는 데이터입니다.",
    code: string = "ALREADY_EXISTS",
    type: "logic" | "database" = "database"
  ) {
    super(message, 409, code, type);
  }
}

export class FirebaseUnauthenticatedError extends CustomAPIError {
  constructor(
    message: string = "인증이 필요합니다.",
    code: string = "UNAUTHENTICATED",
    type: "logic" | "database" = "database"
  ) {
    super(message, 401, code, type);
  }
}

export class FirebaseInvalidArgumentError extends CustomAPIError {
  constructor(
    message: string = "잘못된 요청입니다.",
    code: string = "INVALID_ARGUMENT",
    type: "logic" | "database" = "database"
  ) {
    super(message, 400, code, type);
  }
}

export class FirebaseFailedPreconditionError extends CustomAPIError {
  constructor(
    message: string = "사전 조건을 만족하지 않습니다.",
    code: string = "FAILED_PRECONDITION",
    type: "logic" | "database" = "database"
  ) {
    super(message, 422, code, type);
  }
}

export class FirebaseAbortedError extends CustomAPIError {
  constructor(
    message: string = "트랜잭션이 중단되었습니다.",
    code: string = "ABORTED",
    type: "logic" | "database" = "database"
  ) {
    super(message, 409, code, type);
  }
}

export class FirebaseResourceExhaustedError extends CustomAPIError {
  constructor(
    message: string = "리소스가 부족합니다.",
    code: string = "RESOURCE_EXHAUSTED",
    type: "logic" | "database" = "database"
  ) {
    super(message, 423, code, type);
  }
}

export class FirebaseUnavailableError extends CustomAPIError {
  constructor(
    message: string = "Firestore 서비스를 이용할 수 없습니다.",
    code: string = "UNAVAILABLE",
    type: "logic" | "database" = "database"
  ) {
    super(message, 503, code, type);
  }
}

export class FirebaseDeadlineExceededError extends CustomAPIError {
  constructor(
    message: string = "요청 시간이 초과되었습니다.",
    code: string = "DEADLINE_EXCEEDED",
    type: "logic" | "database" = "database"
  ) {
    super(message, 504, code, type);
  }
}

export class FirebaseCancelledError extends CustomAPIError {
  constructor(
    message: string = "요청이 취소되었습니다.",
    code: string = "CANCELLED",
    type: "logic" | "database" = "database"
  ) {
    super(message, 500, code, type);
  }
}

export class FirebaseUnknownError extends CustomAPIError {
  constructor(
    message: string = "알 수 없는 Firestore 오류가 발생했습니다.",
    code: string = "UNKNOWN",
    type: "logic" | "database" = "database"
  ) {
    super(message, 500, code, type);
  }
}
