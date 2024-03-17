const map = new Map();

// Redis存储方法类似于 localStorage
const Storage = {
  setItem: (key: any, value: any) => map.set(key, value),
  getItem: (key: any) => map.get(key),
  removeItem: (key: any) => map.delete(key),
  clear: () => map.clear()
};

export default Storage;