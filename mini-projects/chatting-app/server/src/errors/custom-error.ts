export class CustomAPIError extends Error {
  statusCode: number;
  statusText: string;
  code: string;
  errorDetails: Record<string, any>;
  type: "database" | "logic";

  constructor(
    message: string,
    statusCode: number = 500,
    statusText: string = "Internal Server Error",
    code: string = "INTERNAL_SERVER_ERROR",
    errorDetails: Record<string, any> = {},
    type: "database" | "logic" = "logic"
  ) {
    super(message);
    this.statusCode = statusCode;
    this.statusText = statusText;
    this.code = code;
    this.errorDetails = errorDetails;
    this.type = type;
  }
}
