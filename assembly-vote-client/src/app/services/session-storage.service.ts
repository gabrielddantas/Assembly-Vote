const defaultStorageName = "ASSEMBLY_VOTE:";

export const keyStorage = {
  associate: "associate",
};

export const setStorageData = (key: string, data: any) => {
  sessionStorage.setItem(defaultStorageName + key, JSON.stringify(data));
};

export const getStorageData = (key: string) => {
  const data = sessionStorage.getItem(defaultStorageName + key);
  return data ? JSON.parse(data) : null;
};
