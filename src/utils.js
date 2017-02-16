import config from './config'
import path from 'path'
import fs from 'fs'

export async function getFile(pluginPaths){

  let files = []
  pluginPaths.forEach(pluginPath => {
    if(fs.lstatSync(pluginPath).isDirectory()){
      const dir = fs.readdirSync(pluginPath)

      if(!(dir.includes(".babelrc")) && !(config.pluginPaths.includes(pluginPath))) {
        copyFile(path.join(__dirname, '../.babelrc'), `${pluginPath}/.babelrc`)
      }

      if(dir) {
        dir.forEach(file => {
          const isJs = /\.js/
          if(isJs.test(file)){
            files.push(require(`${pluginPath}/${file}`).default)
          }
        })
      }
    } else if(fs.lstatSync(pluginPath).isFile()) {

      if(!(path.dirname(pluginPath).includes(".babelrc")) ) {
        copyFile(path.join(__dirname, '../.babelrc'), `${path.dirname(pluginPath)}/.babelrc`)
      }

      const isJs = /\.js/
      if(isJs.test(pluginPath)){
        files.push(require(`${pluginPath}`).default)
      }
    }
  })

  return files
}

function copyFile(src, dist) {
  fs.writeFileSync(dist, fs.readFileSync(src));
}