import path from 'path'
import fs from 'fs'
import {exec} from 'child_process'
import {isFile} from '../src/utils'
const examplePath = [path.join(__dirname, "../example")]

export default {
  name: "helper",
  completions: [':q', 'help', ':load', ':example', ":ter", ":setPath", ":getConfig", ":removePath"],

  start() {

    let meido = this

    meido.log('debug', 'helper start>>>>')

    meido.help = `
      Meido


      Usage:

        help                      'help'
        :command                  'run command'

      Command:


        :q                              // quit
        :load [...paths]                // load dir/file
        :example                     // load example file
        :ter [bin-name]             // open termial
        :setPath [name] [path]     // set the path of the permanent
        :getConfig                 // list the path of the all
        :removeConfig [name]       // remove the path 


      Run 'meido.[Command].help' for more information on a command.
    `
    meido.q = () => {
      process.exit(0)
    },
    meido.ter = meido.terminal = (...args) => {
      const [command] = args

      exec(`open -a /Applications/Utilities/Terminal.app /usr/local/bin/${command}`)
    },
    meido.load = (...args) => {
      args = args.map(_path => path.resolve(_path))
      meido.state.pluginPaths = args
    },
    meido.reload = () => {
      meido.ter(meido, 'meido')
    }
    meido.example = () => {
      meido.state.pluginPaths = examplePath
    },
    meido.setPath = (name, path) => {
      if(!name || !path) {
        return 'error: Parameter error, you shoud input: :setPath [name] [path]'
      }

      return meido.setConfig('pluginPaths', name, path)
    },
    meido.removePath = (name) => {
      if(!name) {
        return 'error: Parameter error, you shoud input: :removePath [name]'
      }

      return meido.removeConfig('pluginPaths', name)
    }
    meido.setConfig = (field, key, value) => {
      if(!field || !key || !value) {
        return 'error: Parameter error, expect: [field], [key], [value]'
      }

      let read = JSON.parse(fs.readFileSync(meido._configPath, 'utf8'))
      if(read) {
        read[field][key] = value
        fs.writeFileSync(meido._configPath, JSON.stringify(read), 'utf8')
        return meido.getConfig()
      }
    },
    meido.getConfig = () => {

      let read = JSON.parse(fs.readFileSync(meido._configPath, 'utf8'))
      return read
    },
    meido.removeConfig = (field, key) => {
      if(!field || !key) {
        return 'error: Parameter error, expect: [field], [key]'
      }

      let read = JSON.parse(fs.readFileSync(meido._configPath, 'utf8'))

      if(read) {
        if(Object.prototype.toString.call(read[field]) == '[object Object]') {
          delete read[field][key]
        }
        fs.writeFileSync(meido._configPath, JSON.stringify(read), 'utf8')
        return meido.getConfig()
      }
    }
  }
}