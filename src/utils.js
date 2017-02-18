import config from './config'
import path from 'path'
import rl from 'readline'
import fs from 'fs'

export async function getFile(pluginPaths){

  let files = {
    js:  [],
    jsx: [],
    vue: []
  }

  if(!(Array.isArray(pluginPaths))) {
    crawlPath(pluginPaths, {
      onFile: (file) => {
        files = filterFile(files, file)
      },
      onDir: (files, _path, depth) => {
        const parentDir = path.dirname(_path)
        const parentFiles = fs.readdirSync(parentDir)

        if(!(parentFiles.includes(".babelrc")) && !(files.includes(".babelrc")) && !(config.pluginPaths[_path]) && depth == 1) {
          copyFile(path.join(__dirname, '../.babelrc'), `${_path}/.babelrc`)
        }
      },
    })
  } else {
    crawlPaths(pluginPaths, {
      onFile: (file) => {
        files = filterFile(files, file)
      },
      onDir: (files, _path, depth) => {
        const parentDir = path.dirname(_path)
        const parentFiles = fs.readdirSync(parentDir)

        if(!(parentFiles.includes(".babelrc")) && !(files.includes(".babelrc")) && !(config.pluginPaths[_path]) && depth == 1) {
          copyFile(path.join(__dirname, '../.babelrc'), `${_path}/.babelrc`)
        }
      },
    })
  }

  return files
}

const isJs = /\.js$/
const isJsx = /\.jsx$/
const isVue = /\.vue$/

export function filterFile (files, file) {
  if(isJs.test(file)) {
    files.js.push(require(file).default)
  } else if(isJsx.test(file)) {
    files.jsx.push(require(file).default)
  } else if(isVue.test(file)) {
    files.vue.push(require(file).default)
  }
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
  } else if(isFile(_path)) {
    options.onFile && options.onFile(_path)
  }
}catch (err) {
    console.log(err)
  }
}

export function isDir(_path) {
  return fs.lstatSync(_path).isDirectory()
}

export function isFile(_path) {
  return fs.lstatSync( _path).isFile()
}
