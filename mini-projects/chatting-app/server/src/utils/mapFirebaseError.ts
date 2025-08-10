import { FirebaseError } from "firebase-admin/lib/utils/error";
import * as FE from "../errors/firebase-error";
import * as HE from "../errors/http-errors";

export function mapFirebaseError(err: unknown) {
  if (err instanceof FirebaseError) {
    switch (err.code) {
      case "permission-denied":
        return new FE.FirebasePermissionDeniedError();
      case "not-found":
        return new FE.FirebaseNotFoundError();
      case "already-exists":
        return new FE.FirebaseAlreadyExistsError();
      case "unauthenticated":
        return new FE.FirebaseUnauthenticatedError();
      case "invalid-argument":
        return new FE.FirebaseInvalidArgumentError();
      case "failed-precondition":
        return new FE.FirebaseFailedPreconditionError();
      case "aborted":
        return new FE.FirebaseAbortedError();
      case "resource-exhausted":
        return new FE.FirebaseResourceExhaustedError();
      case "unavailable":
        return new FE.FirebaseUnavailableError();
      case "deadline-exceeded":
        return new FE.FirebaseDeadlineExceededError();
      case "cancelled":
        return new FE.FirebaseCancelledError();
      default:
        return new FE.FirebaseUnknownError();
    }
  }

  if (err instanceof Error) {
    switch ((err as any).code) {
      case "ECONNREFUSED":
        return new HE.ServiceUnavailableError(
          "Firestore 연결이 거부되었습니다.",
          "ECONNREFUSED"
        );
      case "ENOTFOUND":
        return new HE.ServiceUnavailableError(
          "Firestore 서버를 찾을 수 없습니다.",
          "ENOTFOUND"
        );
      case "ETIMEDOUT":
        return new HE.GatewayTimeoutError(
          "Firestore 요청 시간이 초과되었습니다.",
          "ETIMEDOUT"
        );
      default:
        return new HE.InternalServerError(
          "알 수 없는 네트워크 오류가 발생했습니다.",
          "UNKNOWN_NETWORK_ERROR"
        );
    }
  }

  return err;
}
