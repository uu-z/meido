import bluebird from 'bluebird'
import config from './config'
import fs from 'fs'
// const fs = bluebird.promisifyAll(require('fs'))

export async function getFile(pluginPaths){
  
  let files = []
  pluginPaths.forEach(pluginPath => {
    const dir = fs.readdirSync(pluginPath)

    if(dir) {
      dir.forEach(file => {
        const isJs = /\.js/
        if(isJs.test(file)){
          files.push(require(`${pluginPath}/${file}`).default)
        }
      })
    }
  })
  
  return files
}