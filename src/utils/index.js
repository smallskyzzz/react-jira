import { useEffect, useState } from "react";

export const isFalsy = (value) => (value === 0 ? false : !value);

export const cleanObject = (obj) => {
  const result = { ...obj };
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    // 直接用!value时当value为0的时候也会被delete
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

// 自定义hook，不需要再定义[]
export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value值变化后设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次再上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
