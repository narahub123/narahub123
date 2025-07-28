export const readItemFromStorageP = (key: string) =>
  new Promise<string | null>(async (resolve, reject) => {
    try {
      const value = localStorage.getItem(key);

      resolve(value);
    } catch (error) {
      reject(error);
    }
  });

export const writeItemToStorageP = (key: string, value: string) =>
  new Promise<string>(async (resolve, reject) => {
    try {
      localStorage.setItem(key, value);

      resolve(value);
    } catch (error) {
      reject(error);
    }
  });

export const readStringP = readItemFromStorageP;

export const writeStringP = writeItemToStorageP;
