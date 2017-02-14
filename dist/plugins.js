'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'plugins',
  start: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(meido) {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              meido.on('queue:getPlugins', function (plugins) {
                plugins.forEach(function (plugin) {
                  if (!plugin.name) {
                    throw new Error('plugins must have name : ' + plugin + ' ');
                  }

                  meido.pluginLoadList.push(plugin.name);

                  meido.plugins[plugin.name] = plugin;
                });

                meido.state.isPluginMount = true;
              }).on('message:observer', function (name, fn) {
                meido.Message.on(name, fn);

                if (!meido.state[name]) {
                  (0, _defineProperty2.default)(meido.state, name, {
                    get: function get() {
                      return meido.val;
                    },
                    set: function set(val) {
                      meido.val = val;
                      meido.Message.emit(name, val);
                    },
                    enumerable: true,
                    configurable: true
                  });
                }
              }).observer('pluginPaths', function (pluginPaths) {
                meido.Queue.run((0, _utils.getPlugins)(pluginPaths));
              }).observer('isPluginMount', function (isPluginMount) {

                if (isPluginMount === true) {

                  meido.pluginLoadList.forEach(function (pluginName) {
                    var plugin = meido.plugins[pluginName];

                    meido.Queue.run(function () {
                      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(queue, next) {
                        return _regenerator2.default.wrap(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                _context.t0 = plugin.start;

                                if (!_context.t0) {
                                  _context.next = 4;
                                  break;
                                }

                                _context.next = 4;
                                return plugin.start(meido);

                              case 4:

                                plugin.observer && (0, _keys2.default)(plugin.observer).forEach(function (key) {
                                  meido.Message.observer(key, plugin.observer[key]);
                                });

                                next();

                              case 6:
                              case 'end':
                                return _context.stop();
                            }
                          }
                        }, _callee, undefined);
                      }));

                      return function (_x2, _x3) {
                        return _ref2.apply(this, arguments);
                      };
                    }());

                    meido.pluginLoadList = [];
                  });
                }
              });

              meido.Queue.run(function () {
                var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(queue, next) {
                  return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          meido.plugins = {};
                          meido.pluginLoadList = [];
                          meido.state.pluginPaths = _config2.default.pluginPaths;
                          next();

                        case 4:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, undefined);
                }));

                return function (_x4, _x5) {
                  return _ref3.apply(this, arguments);
                };
              }());

            case 2:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    function start(_x) {
      return _ref.apply(this, arguments);
    }

    return start;
  }()
};