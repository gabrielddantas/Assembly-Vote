const defaultStorageName = "ASSEMBLY_VOTE:";

export const keyStorage = {
  associate: "associate",
};

export const setStorageData = (key: string, data: any) => {
  try {
    sessionStorage.setItem(defaultStorageName + key, JSON.stringify(data));
    return true;
  } catch (error) {
    throw new Error("Error setting storage data");
  }
};

export const getStorageData = (key: string) => {
  try {
    const data = sessionStorage.getItem(defaultStorageName + key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    return null;
  }
};

export const clearAllStorageData = () => {
  sessionStorage.clear();
};
