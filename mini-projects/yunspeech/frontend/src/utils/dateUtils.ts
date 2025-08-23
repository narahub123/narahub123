export const getDateKey = (date: Date): string => {
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(date)
    .replace(/\. /g, "-") // "2025. 08. 23." → "2025-08-23"
    .replace(/\.$/, "");
};
