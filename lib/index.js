Object.defineProperty(exports, '__esModule', {value: true});
require('./mqttLib');
const storage = require('./storage');
function initialize() {
  global.localStorage = storage;
}
exports.default = initialize;
