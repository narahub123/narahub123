import { Timestamp } from "firebase-admin/firestore";

export const convertTimestamps = (obj: any): any => {
  if (!obj) return obj;
  if (obj instanceof Timestamp) return obj.toDate();
  if (Array.isArray(obj)) return obj.map(convertTimestamps);
  if (typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, convertTimestamps(v)])
    );
  }
  return obj;
};
