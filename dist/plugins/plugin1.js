"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "plugin1",
  version: "0.0.1",

  start: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(meido) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              console.log("start plugin1");

              meido.on('plugin1', function (val) {
                console.log("on: plugin1, " + val + " ");
              }).observer('plugin1', function (val) {
                console.log("observe: plugin1, " + val);
              });

              meido.Queue.run((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        meido.state.plugin1 = 111;
                        meido.emit('plugin1', 222);

                      case 2:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              })));

              setTimeout(function () {
                meido.plugins["plugin2"] && meido.plugins["plugin2"].call(meido);
              }, 1e3);

              setTimeout(function () {
                meido.plugins["plugin2"] && meido.plugins["plugin3"].call(meido);
              }, 1e3);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    function start(_x) {
      return _ref.apply(this, arguments);
    }

    return start;
  }()
};