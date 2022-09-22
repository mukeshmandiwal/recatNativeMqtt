Object.defineProperty(exports, '__esModule', {value: true});

require('./mqttLib');

// Set up an in-memory alternative to global localStorage

const myStorage = {
  setItem: (key, item) => {
    myStorage[key] = item;
  },

  getItem: key => myStorage[key],

  removeItem: key => {
    deletemyStorage[key];
  },
};

function init() {
  global.localStorage = myStorage;
}

exports.default = init;
