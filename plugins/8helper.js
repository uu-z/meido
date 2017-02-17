import path from 'path'
import fs from 'fs'
import {exec} from 'child_process'
import {isFile} from '../src/utils'
const examplePath = [path.join(__dirname, "../example")]

export default {
  name: "helper",
  completions: [':q', 'help', ':load', ':example', ":ter", ":setPath", ":getPaths", ":removePath"],

  start: (meido) => {
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
        :getPaths                 // list the path of the all
        :removePath [name]       // remove the path 


      Run 'meido.[Command].help' for more information on a command.
    `
    meido.q = () => {
      process.exit(0)
    },
    meido.ter = meido.terminal = (meido, ...args) => {
      const [command] = args

      exec(`open -a /Applications/Utilities/Terminal.app /usr/local/bin/${command}`)
    },
    meido.load = (meido, ...args) => {
      meido.state.pluginPaths = args
    },
    meido.reload = () => {
      meido.ter(meido, 'meido')
    }
    meido.example = () => {
      meido.state.pluginPaths = examplePath
    },
    meido.setPath = (meido, ...args) => {
      const [name, path] = args
      if(!name) {
        return 'error: no name, you shoud input: :setPath [name] [path]'
      } else if(!path) {
        return "error: no path, you shoud input: :setPath [name] [path]"
      }
      
      let configPath = `${meido._rootDir}/config.json`

      let read = JSON.parse(fs.readFileSync(configPath, 'utf8'))
      if(read) {
        read.pluginPaths[name] = path
        fs.writeFileSync(configPath, JSON.stringify(read), 'utf8')
      }
    },
    meido.getPaths = (meido, ...args) => {
      let configPath = `${meido._rootDir}/config.json`

      let read = JSON.parse(fs.readFileSync(configPath, 'utf8'))
      return read
    },
    meido.removePath = (meido, ...args) => {
      let configPath = `${meido._rootDir}/config.json`

      let read = JSON.parse(fs.readFileSync(configPath, 'utf8'))
      if(read) {
        for (let key of args) {
          delete read.pluginPaths[key]
        }
        fs.writeFileSync(configPath, JSON.stringify(read), 'utf8')
      }
    }
  }
}