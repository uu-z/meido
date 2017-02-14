'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFile = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getFile = exports.getFile = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(pluginPath) {
    var _this = this;

    var files, dir;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            files = [];
            _context2.next = 3;
            return fs.readdirAsync(pluginPath);

          case 3:
            dir = _context2.sent;


            if (dir) {
              dir.forEach(function () {
                var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(file) {
                  var isJs;
                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          isJs = /\.js/;

                          if (isJs.test(file)) {
                            files.push(require(pluginPath + '/' + file).default);
                          }

                        case 2:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, _this);
                }));

                return function (_x2) {
                  return _ref2.apply(this, arguments);
                };
              }());
            }

            return _context2.abrupt('return', files);

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getFile(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getPlugins = getPlugins;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = _bluebird2.default.promisifyAll(require('fs'));

function getPlugins() {
  var _this2 = this;

  var pluginPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _config2.default.pluginPath;


  return function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(queue, next) {
      var plugins;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return getFile(pluginPath);

            case 2:
              plugins = _context3.sent;


              queue.Event.emit('queue:getPlugins', plugins);
              next();

            case 5:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this2);
    }));

    return function (_x4, _x5) {
      return _ref3.apply(this, arguments);
    };
  }();
}