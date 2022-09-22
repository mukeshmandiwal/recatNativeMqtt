Object.defineProperty(exports, '__esModule', {value: true});
require('./mqttLib');
const myStorage = {
  setItem: (key, item) => {
    myStorage[key] = item;
  },
  getItem: key => myStorage[key],
  removeItem: key => {
    deletemyStorage[key];
  },
};
function initialize() {
  global.localStorage = myStorage;
}
exports.default = initialize;
