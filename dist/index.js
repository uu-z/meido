'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _meido = require('./meido');

var _meido2 = _interopRequireDefault(_meido);

var _plugins = require('./plugins');

var _plugins2 = _interopRequireDefault(_plugins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var meido = new _meido2.default({
  components: [_plugins2.default]
});

meido.Queue.set({ concurrency: 4 });

exports.default = meido;