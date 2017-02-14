import config from './config'
import {checkPluginDir, getPlugins} from './utils'

export default {
  name: 'plugins',
  start: async (meido) => {
    meido
      .on('queue:getPlugins', plugins => {
         plugins.forEach(plugin => {
          if(!plugin.name) {
            throw new Error(`plugins must have name : ${plugin} `)
          }

          meido.pluginLoadList.push(plugin.name)

          meido.plugins[plugin.name] = plugin
        })

        meido.state.isPluginMount = true
      })
      .on('message:observer', (name, fn) => {
          meido.Message.on(name, fn)
          
          if(!meido.state[name]){
            Object.defineProperty(meido.state, name, {
              get: function() {
                return meido.val
              },
              set: function(val) {
                meido.val = val
                meido.Message.emit(name, val)
              },
              enumerable: true,
              configurable: true
            })
          }
        })
    .observer('pluginPaths', pluginPaths => {
      meido.Queue
        .run(getPlugins(pluginPaths))
    })
    .observer('isPluginMount', isPluginMount => {

      if(isPluginMount === true) {

        meido.pluginLoadList.forEach(pluginName => {
          
          const plugin = meido.plugins[pluginName]

          meido.Queue
            .run(async (queue, next) => {

              plugin.observer && Object.keys(plugin.observer).forEach(key => {
                meido.Message.observer(key, plugin.observer[key])
              })

              plugin.start && plugin.start(meido)
              
            next()
          })

          meido.pluginLoadList = []
        })
      }
    })

  meido.Queue
    .run(async(queue, next) => {
      meido.plugins = {}
      meido.pluginLoadList = []
      meido.state.pluginPaths = config.pluginPaths
      next()
    })
  }
}