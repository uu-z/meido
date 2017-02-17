export default {
  name: "helper",

  start: (meido) => {
    meido.log('debug', 'helper start>>>>')

    meido.help = `
      Meido

      command:


      help                      'help'
      :command                  'run command'


      Run 'meido.[Command].help' for more information on a command.
    `
    meido.q = () => {
      process.exit(0)
    },
    meido.reload = (meido, ...args) => {
      console.log(meido.pluginList)
    }
  }
}