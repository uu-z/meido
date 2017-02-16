'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _events = require('events');

var _meidos = require('meidos');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Meido = function () {
  function Meido(options) {
    (0, _classCallCheck3.default)(this, Meido);

    this.Event = new _events.EventEmitter();
    this.Observer = new _meidos.Observer(this.Event);
    this.Queue = new _meidos.Queue(this.Event);
    this.Message = new _meidos.Message(this.Event);

    this.options = options;
    this.state = {};
    this.init();
  }

  (0, _createClass3.default)(Meido, [{
    key: 'init',
    value: function init() {
      var _this = this;

      // inject plugins
      if (this.options.components) {
        this.options.components.forEach(function (component) {
          _this.Queue.run(function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(queue, next) {
              return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.t0 = component.start;

                      if (!_context.t0) {
                        _context.next = 4;
                        break;
                      }

                      _context.next = 4;
                      return component.start(_this);

                    case 4:

                      next();

                    case 5:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, _this);
            }));

            return function (_x, _x2) {
              return _ref.apply(this, arguments);
            };
          }());
        });
      }
    }
  }, {
    key: 'set',
    value: function set(obj) {
      (0, _assign2.default)(this.options, obj);
    }
  }, {
    key: 'on',
    value: function on(name, fn) {
      this.Event.on(name, fn);
      return this;
    }
  }, {
    key: 'emit',
    value: function emit(name) {
      var _Event;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      (_Event = this.Event).emit.apply(_Event, [name].concat(args));
      return this;
    }
  }, {
    key: 'observer',
    value: function observer(name, fn) {
      this.Message.observer(name, fn);
      return this;
    }
  }]);
  return Meido;
}();

exports.default = Meido;