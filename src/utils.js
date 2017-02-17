import config from './config'
import path from 'path'
import rl from 'readline'
import fs from 'fs'

const isJs = /\.js$/
const isJsx = /\.jsx$/
const isVue = /\.vue$/

export async function getFile(pluginPaths){

  let files = {
    js:  [],
    jsx: [],
    vue: []
  }

  crawlPaths(pluginPaths, {
    onFile: (file) => {
      if(isJs.test(file)) {
        files.js.push(require(file).default)
      } else if(isJsx.test(file)) {
        files.jsx.push(require(file).default)
      } else if(isVue.test(file)) {
        files.vue.push(require(file).default)
      }
    },
    onDir: (files, _path, depth) => {
      if(!(files.includes(".babelrc")) && !(config.pluginPaths.includes(_path)) && depth < 2) {
        copyFile(path.join(__dirname, '../.babelrc'), `${_path}/.babelrc`)
      }
    },
  })

  return files
}

export function copyFile(src, dist) {
  fs.writeFileSync(dist, fs.readFileSync(src))
}

export function crawlPaths(_paths, options = {}) {
  for (let _path of _paths) {
    crawlPath(_path, options)
  }
}

export function crawlPath (_path, options = {}, depth = 0) {
  try {
    if(isDir(_path)) {
    depth += 1
    const files = fs.readdirSync(_path)
    options.onDir && options.onDir(files, _path, depth)

    if(files) {
      for (let fileName of files) {
        const file = `${_path}/${fileName}`
        
        if(isDir(file)){
          crawlPath(file, options, depth)
        } else if(isFile(file)) {
          options.onFile && options.onFile(file)
        }
      }
    }
  } else if(isFile(path)) {
    options.onFile && options.onFile(file)
  }
  }catch (err) {
    console.log(err)
  }
}

export function isDir(path) {
  return fs.lstatSync(path).isDirectory()
}

export function isFile(path) {
  return fs.lstatSync(path).isFile()
}