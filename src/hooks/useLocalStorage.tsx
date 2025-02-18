import { useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, intitialValue: T) {
  const [storeValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : intitialValue;
    } catch (error) {
      console.log(`error in getting local storage value: ${error}`);
      return intitialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storeValue));
    } catch (error) {
      console.log("error in setting local storage value", error);
    }
  }, [key, storeValue]);

  return [storeValue, setStoredValue] as const;
}
