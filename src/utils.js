import bluebird from 'bluebird'
import config from './config'
const fs = bluebird.promisifyAll(require('fs'))

export async function getFile(pluginPath){

  let files = []
  const dir = await fs.readdirAsync(pluginPath)

  if(dir) {
    dir.forEach(async file => {
      const isJs = /\.js/
      if(isJs.test(file)){
        files.push(require(`${pluginPath}/${file}`).default)
      }
    })
  }

  return files
}


export function getPlugins (pluginPath = config.pluginPath) {

  return async (queue, next) => {
    let plugins = await getFile(pluginPath)

    queue.Event.emit('queue:getPlugins', plugins)
    next()
  }
}