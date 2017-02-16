'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'plugins',
  start: function start(meido) {
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

          if (plugin.start) {

            plugin.start(meido);
          }
        });
        meido.pluginLoadList = [];
      }
    });

    meido.Queue.run(function (queue, next) {
      meido.plugins = {};
      meido.pluginLoadList = [];
      meido.state.pluginPaths = _config2.default.pluginPaths;
      next();
    });
  }
};