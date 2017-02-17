export default {
  name: "helper",
  completions: [':q', 'help', ':load'],

  start: (meido) => {
    meido.log('debug', 'helper start>>>>')

    meido.help = `
      Meido


      Usage:

        help                      'help'
        :command                  'run command'


      Command:
      
        :q                        'quit'
        :load [...args]           'load file/dir'


      Run 'meido.[Command].help' for more information on a command.
    `
    meido.q = () => {
      process.exit(0)
    },
    meido.load = (meido, ...args) => {
      meido.state.pluginPaths = args
    }
  }
}