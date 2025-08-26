import { GIGA_BYTE, KILO_BYTE, MEGA_BYTE } from "../constants";

export const calculateFileSize = (fileSize: number) => {
  if (fileSize < KILO_BYTE) {
    return fileSize + "bytes";
  } else if (KILO_BYTE <= fileSize && fileSize < MEGA_BYTE) {
    return (fileSize / KILO_BYTE).toFixed(1) + "KB";
  } else if (MEGA_BYTE <= fileSize && fileSize < GIGA_BYTE) {
    return (fileSize / MEGA_BYTE).toFixed(1) + "MB";
  }
};
