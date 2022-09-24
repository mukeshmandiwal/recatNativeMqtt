Object.defineProperty(exports, '__esModule', {value: true});
require('./mqttLib');
const storage = {
  setItem: (key, item) => {
    storage[key] = item;
  },
  getItem: key => storage[key],
  removeItem: key => {
    delete storage[key];
  },
};
function initialize() {
  global.localStorage = storage;
}
exports.default = initialize;
