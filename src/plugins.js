import config from './config'
import {getFile} from './utils'

export default {
  name: 'plugins',
  start: (meido) => {
    meido
      .on('queue:getFile', plugins => {

        for (let key of Object.keys(plugins)) {

          meido[key] = meido[key] ? meido[key] : {}
          let arr = plugins[key]

          if(arr.length > 0) {
            for(let plugin of arr) {
              if(!plugin.name) {
                throw new Error(`plugins must have name : ${plugin} `)
              }

              meido[key][plugin.name] = plugin
            }
          }

          meido.plugins.add(key)
        }

        // meido.plugins.set(key, meido[key])
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

      // if(!(meido.plugins.has(pluginPaths))){
      //   meido.plugins.add(...pluginPaths)
      // }

      meido.emit('queue:getFile', plugins)
    })
    .observer('isPluginMount', isPluginMount => {

      if(isPluginMount === true) {
        for(let prefix of meido.plugins) {

          let plugins = meido[prefix]

          for(let pluginName of Object.keys(plugins)) {
            const plugin = plugins[pluginName]

            plugin.start && plugin.start(meido)

            Object.keys(plugin).forEach(key => {

              if(key !== "start" && key !== "name") {
                if(typeof plugin[key] === 'function') {
                  meido.options.completions.push(`:${prefix}.${plugin.name}.${key}`)              
                } else if(key === 'completions'){
                  meido.options.completions = meido.options.completions.concat(plugin[key])
                }
                else {
                  meido.options.completions.push(`${prefix}.${plugin.name}.${key}`)
                }
              }
            })
          }
        }
      }
    })

  meido.Queue
    .set({concurrency: 4})
    .run((queue, next) => {
      meido.plugins = new Set()
      meido.state.pluginPaths = config.pluginPaths
      next()
    })
  }
}