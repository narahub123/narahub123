import { CustomAPIError } from "../errors";

export class BadRequestError extends CustomAPIError {
  constructor(
    message: string,
    code: string = "BAD_REQUEST",
    errorDetails: Record<string, any> = {},
    type: "logic" | "database" = "logic"
  ) {
    super(message, 400, "Bad Request", code, errorDetails, type);
  }
}

export class UnauthorizedError extends CustomAPIError {
  constructor(
    message: string,
    code: string = "UNAUTHORIZED",
    errorDetails: Record<string, any> = {},
    type: "logic" | "database" = "logic"
  ) {
    super(message, 401, "Unauthorized", code, errorDetails, type);
  }
}

export class ForbiddenError extends CustomAPIError {
  constructor(
    message: string,
    code: string = "FORBIDDEN",
    errorDetails: Record<string, any> = {},
    type: "logic" | "database" = "logic"
  ) {
    super(message, 403, "Forbidden", code, errorDetails, type);
  }
}

export class NotFoundError extends CustomAPIError {
  constructor(
    message: string,
    code: string = "NOT_FOUND",
    errorDetails: Record<string, any> = {},
    type: "logic" | "database" = "logic"
  ) {
    super(message, 404, "Not Found", code, errorDetails, type);
  }
}

export class ConflictError extends CustomAPIError {
  constructor(
    message: string,
    code: string = "CONFLICT",
    errorDetails: Record<string, any> = {},
    type: "logic" | "database" = "logic"
  ) {
    super(message, 409, "Conflict", code, errorDetails, type);
  }
}

export class GoneError extends CustomAPIError {
  constructor(
    message: string,
    code: string = "GONE",
    errorDetails: Record<string, any> = {},
    type: "logic" | "database" = "logic"
  ) {
    super(message, 410, "Gone", code, errorDetails, type);
  }
}

export class UnprocessableEntityError extends CustomAPIError {
  constructor(
    message: string,
    code: string = "UNPROCESSABLE_ENTITY",
    errorDetails: Record<string, any> = {},
    type: "logic" | "database" = "logic"
  ) {
    super(message, 422, "Unprocessable Entity", code, errorDetails, type);
  }
}

export class LockedError extends CustomAPIError {
  constructor(
    message: string,
    code: string = "LOCKED",
    errorDetails: Record<string, any> = {},
    type: "logic" | "database" = "logic"
  ) {
    super(message, 423, "Locked", code, errorDetails, type);
  }
}

export class InternalServerError extends CustomAPIError {
  constructor(
    message: string,
    code: string = "INTERNAL_SERVER_ERROR",
    errorDetails: Record<string, any> = {},
    type: "logic" | "database" = "logic"
  ) {
    super(message, 500, "Internal Server Error", code, errorDetails, type);
  }
}

export class ServiceUnavailableError extends CustomAPIError {
  constructor(
    message: string,
    code: string = "SERVICE_UNAVAILABLE",
    errorDetails: Record<string, any> = {},
    type: "logic" | "database" = "logic"
  ) {
    super(message, 503, "Service Unavailable", code, errorDetails, type);
  }
}

export class GatewayTimeoutError extends CustomAPIError {
  constructor(
    message: string,
    code: string = "GATEWAY_TIMEOUT",
    errorDetails: Record<string, any> = {},
    type: "logic" | "database" = "logic"
  ) {
    super(message, 504, "Gateway Time Out", code, errorDetails, type);
  }
}
