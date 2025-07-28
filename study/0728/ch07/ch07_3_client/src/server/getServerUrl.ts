export const getServerUrl = (path: string) => {
  const host = process.env.REACT_APP_BASE_URL;

  return [host, path].join("");
};
