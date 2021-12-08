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
