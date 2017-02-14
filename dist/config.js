"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const pluginPath = path.join(__dirname, "./plugins")
var pluginPath = _path2.default.join(process.env.HOME, "./.meido/plugins");
console.log(pluginPath);
exports.default = {
  pluginPath: pluginPath
};