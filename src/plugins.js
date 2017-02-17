import config from './config'
import {getPlugins, getFile} from './utils'

export default {
  name: 'plugins',
  help: `

    Usage: plugins.test.help

  `,
  start: (meido) => {
    meido
      .on('queue:getPlugins', plugins => {
         plugins.forEach(plugin => {
          if(!plugin.name) {
            throw new Error(`plugins must have name : ${plugin} `)
          }
          
          if(!(meido.pluginLoadList.includes(plugins.name))){
            meido.pluginLoadList.push(plugin.name)
          }

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
    .observer('pluginPaths', async pluginPaths => {

      let plugins = await getFile(pluginPaths)

      meido.emit('queue:getPlugins', plugins)
    })
    .observer('isPluginMount', isPluginMount => {

      if(isPluginMount === true) {
        meido.pluginLoadList.forEach(pluginName => {
          const plugin = meido.plugins[pluginName]

          if(plugin.start) {
            
            plugin.start(meido)
          }

          Object.keys(plugin).forEach(key => {
            if(key !== "start" && key !== "name") {
              if(typeof plugin[key] === 'function') {
                meido.options.completions.push(`:plugins.${plugin.name}.${key}`)                
              }else {
                  meido.options.completions.push(`plugins.${plugin.name}.${key}`)
                }
            }
          })

        })

      }
    })

  meido.Queue
    .set({concurrency: 4})
    .run((queue, next) => {
      meido.plugins = {}
      meido.pluginLoadList = []
      meido.state.pluginPaths = config.pluginPaths
      next()
    })
  }
}