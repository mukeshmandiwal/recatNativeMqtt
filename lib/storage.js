const storage = {
  setItem: (key, item) => {
    storage[key] = item;
  },
  getItem: key => storage[key],
  removeItem: key => {
    delete storage[key];
  },
};
export default storage;
