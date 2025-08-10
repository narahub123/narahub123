import { CustomAPIError } from "../errors";

export class FirebasePermissionDeniedError extends CustomAPIError {
  constructor(
    message: string = "권한이 없습니다.",
    code: string = "PERMISSION_DENIED",
    errorDetails: Record<string, any> = {},
    type: "logic" | "database" = "database"
  ) {
    super(message, 403, "Forbidden", code, errorDetails, type);
  }
}

export class FirebaseNotFoundError extends CustomAPIError {
  constructor(
    message: string = "데이터를 찾을 수 없습니다.",
    code: string = "NOT_FOUND",
    errorDetails: Record<string, any> = {},
    type: "logic" | "database" = "database"
  ) {
    super(message, 404, "Not Found", code, errorDetails, type);
  }
}

export class FirebaseAlreadyExistsError extends CustomAPIError {
  constructor(
    message: string = "이미 존재하는 데이터입니다.",
    code: string = "ALREADY_EXISTS",
    errorDetails: Record<string, any> = {},
    type: "logic" | "database" = "database"
  ) {
    super(message, 409, "Conflict", code, errorDetails, type);
  }
}

export class FirebaseUnauthenticatedError extends CustomAPIError {
  constructor(
    message: string = "인증이 필요합니다.",
    code: string = "UNAUTHENTICATED",
    errorDetails: Record<string, any> = {},
    type: "logic" | "database" = "database"
  ) {
    super(message, 401, "Unauthorized", code, errorDetails, type);
  }
}

export class FirebaseInvalidArgumentError extends CustomAPIError {
  constructor(
    message: string = "잘못된 요청입니다.",
    code: string = "INVALID_ARGUMENT",
    errorDetails: Record<string, any> = {},
    type: "logic" | "database" = "database"
  ) {
    super(message, 400, "Bad Request", code, errorDetails, type);
  }
}

export class FirebaseFailedPreconditionError extends CustomAPIError {
  constructor(
    message: string = "사전 조건을 만족하지 않습니다.",
    code: string = "FAILED_PRECONDITION",
    errorDetails: Record<string, any> = {},
    type: "logic" | "database" = "database"
  ) {
    super(message, 422, "Unprocessable Entity", code, errorDetails, type);
  }
}

export class FirebaseAbortedError extends CustomAPIError {
  constructor(
    message: string = "트랜잭션이 중단되었습니다.",
    code: string = "ABORTED",
    errorDetails: Record<string, any> = {},
    type: "logic" | "database" = "database"
  ) {
    super(message, 409, "Conflict", code, errorDetails, type);
  }
}

export class FirebaseResourceExhaustedError extends CustomAPIError {
  constructor(
    message: string = "리소스가 부족합니다.",
    code: string = "RESOURCE_EXHAUSTED",
    errorDetails: Record<string, any> = {},
    type: "logic" | "database" = "database"
  ) {
    super(message, 423, "Locked", code, errorDetails, type);
  }
}

export class FirebaseUnavailableError extends CustomAPIError {
  constructor(
    message: string = "Firestore 서비스를 이용할 수 없습니다.",
    code: string = "UNAVAILABLE",
    errorDetails: Record<string, any> = {},
    type: "logic" | "database" = "database"
  ) {
    super(message, 503, "Service Unavailable", code, errorDetails, type);
  }
}

export class FirebaseDeadlineExceededError extends CustomAPIError {
  constructor(
    message: string = "요청 시간이 초과되었습니다.",
    code: string = "DEADLINE_EXCEEDED",
    errorDetails: Record<string, any> = {},
    type: "logic" | "database" = "database"
  ) {
    super(message, 504, "Gateway Timeout", code, errorDetails, type);
  }
}

export class FirebaseCancelledError extends CustomAPIError {
  constructor(
    message: string = "요청이 취소되었습니다.",
    code: string = "CANCELLED",
    errorDetails: Record<string, any> = {},
    type: "logic" | "database" = "database"
  ) {
    super(message, 500, "Internal Server Error", code, errorDetails, type);
  }
}

export class FirebaseUnknownError extends CustomAPIError {
  constructor(
    message: string = "알 수 없는 Firestore 오류가 발생했습니다.",
    code: string = "UNKNOWN",
    errorDetails: Record<string, any> = {},
    type: "logic" | "database" = "database"
  ) {
    super(message, 500, "Internal Server Error", code, errorDetails, type);
  }
}
