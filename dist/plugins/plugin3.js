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
  name: "plugin3",
  version: "0.0.1",

  call: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(meido) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('start plugin3');

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    function call(_x) {
      return _ref.apply(this, arguments);
    }

    return call;
  }()
};