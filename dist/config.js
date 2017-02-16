"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pluginPath = _path2.default.join(__dirname, "../plugins");
// const pluginPath = path.join(process.env.HOME, "./.meido/plugins")

exports.default = {
  pluginPath: pluginPath
};